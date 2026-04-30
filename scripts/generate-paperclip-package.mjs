#!/usr/bin/env node
// Generates a Paperclip portable-markdown package at ./paperclip-pkg/
// matching the canonical export format from `paperclipai company export`.
//
// Layout produced:
//   paperclip-pkg/
//     COMPANY.md                     — frontmatter (name, description, slug, schema)
//     .paperclip.yaml                — { schema, agents.<slug>.adapter.type, sidebar.agents }
//     agents/<domain>/AGENTS.md      — copied from <domain>/agents/<domain>-agent.md (the director persona)
//     skills/<domain>-<slug>/SKILL.md — copied from <domain>/skills/<slug>/SKILL.md (prefixed to avoid collisions)
//
// Re-run after any agent or skill changes. Idempotent — wipes paperclip-pkg/ first.

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync, rmSync, copyFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PKG = join(REPO_ROOT, "paperclip-pkg");

function readManifest() {
  return JSON.parse(readFileSync(join(REPO_ROOT, "manifest.json"), "utf8"));
}

function listSkills(domain) {
  const skillsDir = join(REPO_ROOT, domain, "skills");
  if (!existsSync(skillsDir)) return [];
  return readdirSync(skillsDir)
    .filter((name) => statSync(join(skillsDir, name)).isDirectory())
    .filter((name) => existsSync(join(skillsDir, name, "SKILL.md")))
    .sort();
}

function ensureDir(p) {
  mkdirSync(p, { recursive: true });
}

function main() {
  if (existsSync(PKG)) rmSync(PKG, { recursive: true, force: true });
  ensureDir(PKG);

  const manifest = readManifest();
  const domains = manifest.plugins.map((p) => p.id);

  // ---- agents ----
  const agentSlugs = [];
  ensureDir(join(PKG, "agents"));
  for (const domain of domains) {
    const src = join(REPO_ROOT, domain, "agents", `${domain}-agent.md`);
    if (!existsSync(src)) {
      console.warn(`WARN: missing ${src}`);
      continue;
    }
    const destDir = join(PKG, "agents", domain);
    ensureDir(destDir);
    copyFileSync(src, join(destDir, "AGENTS.md"));
    agentSlugs.push(domain);
  }

  // ---- skills (prefix each with domain to avoid cross-domain collisions) ----
  let skillCount = 0;
  ensureDir(join(PKG, "skills"));
  for (const domain of domains) {
    for (const skillName of listSkills(domain)) {
      const src = join(REPO_ROOT, domain, "skills", skillName, "SKILL.md");
      const slug = `${domain}-${skillName}`;
      const destDir = join(PKG, "skills", slug);
      ensureDir(destDir);
      copyFileSync(src, join(destDir, "SKILL.md"));
      skillCount++;
    }
  }

  // ---- .paperclip.yaml ----
  const yamlLines = [];
  yamlLines.push(`schema: "paperclip/v1"`);
  yamlLines.push(`agents:`);
  for (const slug of agentSlugs) {
    yamlLines.push(`  ${slug}:`);
    yamlLines.push(`    adapter:`);
    yamlLines.push(`      type: "claude_local"`);
  }
  yamlLines.push(`sidebar:`);
  yamlLines.push(`  agents:`);
  for (const slug of agentSlugs) yamlLines.push(`    - "${slug}"`);
  yamlLines.push("");
  writeFileSync(join(PKG, ".paperclip.yaml"), yamlLines.join("\n"));

  // ---- COMPANY.md ----
  const companyMd = [
    "---",
    `name: "AI Ready Life"`,
    `description: "Personal AI agents — one per area of your adult life. Health, wealth, taxes, career, calendar, and more. Reads from your local vault. Nothing leaves your machine."`,
    `schema: "agentcompanies/v1"`,
    `slug: "ai-ready-life"`,
    "---",
    "",
    "# AI Ready Life",
    "",
    "Twelve domain agents — one per area of your life — reading your real documents from `~/Documents/aireadylife/vault/` and producing briefs on demand.",
    "",
    "Each agent never invents data. It opens its vault, reads what's actually there, runs its review skills, writes a brief into `02_briefs/`, and flags anything missing in `open-loops.md`.",
    "",
    "## Disclaimer",
    "",
    "AI Ready Life is organizational software, **not professional advice**. Health is not medical advice. Tax is not tax advice. Wealth and insurance are not financial advice. Records and estate flows are not legal advice. Verify anything important against a primary source before acting on it.",
    "",
    "Built by [fru.dev](https://fru.dev) · Site: [aireadyu.dev](https://aireadyu.dev)",
    "",
  ].join("\n");
  writeFileSync(join(PKG, "COMPANY.md"), companyMd);

  console.log(`Wrote paperclip-pkg/`);
  console.log(`  agents: ${agentSlugs.length}`);
  console.log(`  skills: ${skillCount}`);
  console.log(`  COMPANY.md, .paperclip.yaml`);
}

main();
