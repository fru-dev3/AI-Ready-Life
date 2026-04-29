#!/usr/bin/env node
// Generates COMPANY.md and .paperclip.yaml at the marketplace repo root.
// Reads manifest.json + each <domain>/agents/<domain>-agent.md + every
// <domain>/skills/<skill>/SKILL.md and emits Paperclip portability files.

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// Icon enum values valid in Paperclip (from agents.json/INSTALL.md:107-114).
// Map each domain to an appropriate icon.
const DOMAIN_ICONS = {
  health: "sparkles",
  wealth: "gem",
  tax: "cog",
  career: "rocket",
  calendar: "zap",
  insurance: "shield",
  vision: "compass",
  explore: "map",
  home: "home",
  learning: "book",
  records: "folder",
  social: "users",
};

// Title-line per domain shown in the agent card.
const DOMAIN_TITLES = {
  health: "Chief Medical Officer",
  wealth: "Chief Financial Officer",
  tax: "Chief Tax Officer",
  career: "Chief Career Officer",
  calendar: "Chief of Staff — Time",
  insurance: "Chief Risk Officer",
  vision: "Chief Strategy Officer",
  explore: "Chief Travel Officer",
  home: "Chief Household Officer",
  learning: "Chief Learning Officer",
  records: "Chief Records Officer",
  social: "Chief Relationships Officer",
};

function readFrontmatter(path) {
  if (!existsSync(path)) return null;
  const text = readFileSync(path, "utf8");
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const fm = {};
  const body = match[1];
  // Lightweight YAML reader: handles `key: value` and `key: >` block scalars.
  const lines = body.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const m = line.match(/^([a-zA-Z_][a-zA-Z0-9_-]*):\s*(.*)$/);
    if (!m) { i++; continue; }
    const [, key, rest] = m;
    if (rest === ">" || rest === "|" || rest === ">-" || rest === "|-") {
      // Block scalar: collect indented lines until next top-level key
      const block = [];
      i++;
      while (i < lines.length && (lines[i].startsWith("  ") || lines[i] === "")) {
        block.push(lines[i].replace(/^ {2}/, ""));
        i++;
      }
      fm[key] = block.join(" ").replace(/\s+/g, " ").trim();
    } else {
      fm[key] = rest.replace(/^["']|["']$/g, "");
      i++;
    }
  }
  return fm;
}

function listSkills(domain) {
  const skillsDir = join(REPO_ROOT, domain, "skills");
  if (!existsSync(skillsDir)) return [];
  return readdirSync(skillsDir)
    .filter((name) => statSync(join(skillsDir, name)).isDirectory())
    .filter((name) => existsSync(join(skillsDir, name, "SKILL.md")))
    .sort();
}

function yamlEscape(str) {
  if (str == null) return "null";
  // Always double-quote strings to avoid YAML special-character pitfalls
  return `"${String(str).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ")}"`;
}

function indent(text, spaces) {
  const pad = " ".repeat(spaces);
  return text.split("\n").map((l) => (l ? pad + l : l)).join("\n");
}

function main() {
  const manifest = JSON.parse(readFileSync(join(REPO_ROOT, "manifest.json"), "utf8"));
  const domains = manifest.plugins.map((p) => p.id);

  // Collect all agent + skill data first
  const agentEntries = [];
  const skillEntries = [];
  const includeEntries = [];

  for (const domain of domains) {
    const agentPath = join(domain, "agents", `${domain}-agent.md`);
    const agentFm = readFrontmatter(join(REPO_ROOT, agentPath));
    if (!agentFm) {
      console.error(`WARN: missing agent frontmatter for ${domain} at ${agentPath}`);
    }
    const pluginEntry = manifest.plugins.find((p) => p.id === domain);
    const description = (agentFm && agentFm.description) || pluginEntry.description;

    agentEntries.push({
      slug: domain,
      name: domain.charAt(0).toUpperCase() + domain.slice(1),
      title: DOMAIN_TITLES[domain],
      icon: DOMAIN_ICONS[domain] || "sparkles",
      capabilities: description,
      adapterType: "claude_local",
      instructionsFilePath: agentPath,
      skills: listSkills(domain).map((s) => `${domain}-${s}`),
    });

    includeEntries.push({ path: agentPath });

    for (const skillName of listSkills(domain)) {
      const skillPath = join(domain, "skills", skillName, "SKILL.md");
      const skillFm = readFrontmatter(join(REPO_ROOT, skillPath));
      const skillDesc = (skillFm && skillFm.description) || `${domain} ${skillName}`;
      skillEntries.push({
        slug: `${domain}-${skillName}`,
        name: `${pluginEntry.name.replace("AI Ready Life: ", "")}: ${skillName}`,
        path: skillPath,
        description: skillDesc,
      });
      includeEntries.push({ path: skillPath });
    }
  }

  // ---- Build COMPANY.md ----
  const companyMd = [
    "---",
    `name: AI Ready Life`,
    `description: >`,
    `  Personal AI agents — one per area of your adult life. Health, wealth,`,
    `  taxes, career, calendar, and more. Reads from your local vault at`,
    `  ~/Documents/aireadylife/vault/. Nothing leaves your machine.`,
    `brandColor: "#C4A35A"`,
    `requireBoardApprovalForNewAgents: false`,
    `includes:`,
    ...includeEntries.map((e) => `  - path: ${e.path}`),
    "---",
    "",
    "# AI Ready Life",
    "",
    "Twelve domain agents — one per area of your life — reading your real documents from `~/Documents/aireadylife/vault/` and producing briefs on demand.",
    "",
    "Each agent never invents data. It opens its vault, reads what's actually there, runs its review skills, writes a brief into `02_briefs/`, and flags anything missing in `open-loops.md`.",
    "",
    "See [README](README.md) and [ABOUT](ABOUT.md) for the full picture. Built by [fru.dev](https://fru.dev).",
    "",
    "## Disclaimer",
    "",
    "AI Ready Life is organizational software, **not professional advice**. Health is not medical advice. Tax is not tax advice. Wealth and insurance are not financial advice. Records and estate flows are not legal advice. Verify anything important against a primary source before acting on it.",
    "",
  ].join("\n");

  writeFileSync(join(REPO_ROOT, "COMPANY.md"), companyMd);

  // ---- Build .paperclip.yaml ----
  const yamlLines = [];
  yamlLines.push("# AI Ready Life — Paperclip portable extension manifest.");
  yamlLines.push("# Auto-generated by scripts/generate-paperclip-package.mjs.");
  yamlLines.push("schemaVersion: 1");
  yamlLines.push("");
  yamlLines.push("agents:");
  for (const a of agentEntries) {
    yamlLines.push(`  - slug: ${a.slug}`);
    yamlLines.push(`    name: ${yamlEscape(a.name)}`);
    yamlLines.push(`    role: domain`);
    yamlLines.push(`    title: ${yamlEscape(a.title)}`);
    yamlLines.push(`    icon: ${yamlEscape(a.icon)}`);
    yamlLines.push(`    capabilities: ${yamlEscape(a.capabilities)}`);
    yamlLines.push(`    reportsToSlug: null`);
    yamlLines.push(`    adapterType: ${yamlEscape(a.adapterType)}`);
    yamlLines.push(`    adapterConfig:`);
    yamlLines.push(`      model: ${yamlEscape("claude-sonnet-4-6")}`);
    yamlLines.push(`      instructionsFilePath: ${yamlEscape(a.instructionsFilePath)}`);
    yamlLines.push(`    runtimeConfig:`);
    yamlLines.push(`      heartbeat:`);
    yamlLines.push(`        enabled: false`);
    yamlLines.push(`        wakeOnDemand: true`);
    yamlLines.push(`        intervalSec: 14400`);
    yamlLines.push(`        cooldownSec: 10`);
    yamlLines.push(`        maxConcurrentRuns: 1`);
    yamlLines.push(`    permissions:`);
    yamlLines.push(`      canCreateAgents: false`);
    yamlLines.push(`    budgetMonthlyCents: 0`);
    yamlLines.push(`    skills:`);
    for (const s of a.skills) yamlLines.push(`      - ${yamlEscape(s)}`);
  }
  yamlLines.push("");
  yamlLines.push("skills:");
  for (const s of skillEntries) {
    yamlLines.push(`  - slug: ${s.slug}`);
    yamlLines.push(`    name: ${yamlEscape(s.name)}`);
    yamlLines.push(`    path: ${yamlEscape(s.path)}`);
    yamlLines.push(`    sourceType: local`);
    yamlLines.push(`    description: ${yamlEscape(s.description)}`);
  }
  yamlLines.push("");

  writeFileSync(join(REPO_ROOT, ".paperclip.yaml"), yamlLines.join("\n"));

  console.log(`Wrote COMPANY.md (${includeEntries.length} includes)`);
  console.log(`Wrote .paperclip.yaml (${agentEntries.length} agents, ${skillEntries.length} skills)`);
}

main();
