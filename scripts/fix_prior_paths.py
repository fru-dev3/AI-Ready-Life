#!/usr/bin/env python3
"""
Fix 1: Add 01_prior/ references to all op and flow SKILL.md files missing them.
Fix 2: Fix doubled vault path in 3 agent files.
Fix 3: Remove stale category references from domain CLAUDE.md files.
"""

import os
import re

BASE = "/Users/frunde/Documents/fru/fd-apps/fd-apps-aireadyu-life"

# ─── Fix 1: SKILL.md files ────────────────────────────────────────────────────


def get_domain(filepath):
    rel = os.path.relpath(filepath, BASE)
    return rel.split("/")[0]


def get_skill_type(content):
    fm_match = re.match(r"^---\n(.+?)\n---", content, re.DOTALL)
    if not fm_match:
        return None
    type_match = re.search(r"^type:\s*(\S+)", fm_match.group(1), re.MULTILINE)
    if not type_match:
        return None
    return type_match.group(1).strip()


def fix_skill_file(filepath):
    with open(filepath) as f:
        content = f.read()

    skill_type = get_skill_type(content)
    if skill_type not in ("op", "flow"):
        return False

    if "01_prior" in content:
        return False

    domain = get_domain(filepath)
    full_prior = f"~/Documents/aireadylife/vault/{domain}/01_prior/"
    short_prior = f"vault/{domain}/01_prior/"
    new_content = content

    # ── Input section: add 01_prior/ bullet after last 00_current bullet ──
    # Find ## Input section
    input_match = re.search(r"(## Input\n\n)((?:- .+\n)*)", new_content)
    if input_match:
        block = input_match.group(2)
        # Determine which path style is used (full ~ or short vault/)
        if f"~/Documents/aireadylife/vault/{domain}/00_current/" in block:
            prior_bullet = (
                f"- `{full_prior}` — prior period records for trend comparison"
            )
        else:
            prior_bullet = (
                f"- `{short_prior}` — prior period records for trend comparison"
            )
        # Insert after last 00_current line in the block
        lines = block.split("\n")
        last_current_idx = -1
        for i, line in enumerate(lines):
            if "00_current" in line:
                last_current_idx = i
        if last_current_idx >= 0:
            lines.insert(last_current_idx + 1, prior_bullet)
            new_block = "\n".join(lines)
            new_content = (
                new_content[: input_match.start(2)]
                + new_block
                + new_content[input_match.end(2) :]
            )
        else:
            # No 00_current in Input — append before config.md line or at end of section
            # Find end of Input block (first empty line after bullets)
            end = input_match.end(2)
            new_content = new_content[:end] + prior_bullet + "\n" + new_content[end:]

    # ── Vault Paths section: add 01_prior/ to reads-from ──
    vp_match = re.search(r"(## Vault Paths\n\n)", new_content)
    if vp_match:
        after = new_content[vp_match.end() :]
        # Determine path style
        if f"~/Documents/aireadylife/vault/{domain}/" in after[:300]:
            prior_path = full_prior
        else:
            prior_path = short_prior
        # Find the first "Reads from:" line position
        reads_match = re.search(r"^(- Reads from:.+)$", after, re.MULTILINE)
        if reads_match:
            insert_pos = vp_match.end() + reads_match.start()
            new_content = (
                new_content[:insert_pos]
                + f"- Reads from: `{prior_path}` — prior period records\n"
                + new_content[insert_pos:]
            )
        else:
            # No Reads from line — add one before Writes to
            writes_match = re.search(r"^(- Writes to:.+)$", after, re.MULTILINE)
            if writes_match:
                insert_pos = vp_match.end() + writes_match.start()
                new_content = (
                    new_content[:insert_pos]
                    + f"- Reads from: `{prior_path}` — prior period records\n"
                    + new_content[insert_pos:]
                )

    if new_content != content:
        with open(filepath, "w") as f:
            f.write(new_content)
        return True
    return False


# ─── Fix 2: Agent files — doubled path ────────────────────────────────────────


def fix_agent_file(filepath):
    with open(filepath) as f:
        content = f.read()
    fixed = content.replace(
        "~/Documents/aireadylife/~/Documents/aireadylife/vault/",
        "~/Documents/aireadylife/vault/",
    )
    if fixed != content:
        with open(filepath, "w") as f:
            f.write(fixed)
        return True
    return False


# ─── Fix 3: Domain CLAUDE.md — stale category references ──────────────────────

OLD_SKILLS_BLOCK = """## Skills

Skills are organized under `domains/{domain}/skills/`:

- `00_ops/` — recurring operations (reviews, syncs, watches)
- `01_flows/` — data flows that build summaries and reports
- `02_tasks/` — atomic write tasks (flag, log, update)
- `apps/` — app integrations"""

NEW_SKILLS_BLOCK = """## Skills

Skills are located under `{domain}/skills/` — each skill has its own folder containing a `SKILL.md` file."""


def fix_claude_md(filepath):
    domain = get_domain(filepath)
    with open(filepath) as f:
        content = f.read()
    old = OLD_SKILLS_BLOCK.replace("{domain}", domain)
    new = NEW_SKILLS_BLOCK.replace("{domain}", domain)
    if old not in content:
        return False
    fixed = content.replace(old, new)
    with open(filepath, "w") as f:
        f.write(fixed)
    return True


# ─── Main ──────────────────────────────────────────────────────────────────────

skill_updated = 0
agent_updated = 0
claude_updated = 0

for root, dirs, files in os.walk(BASE):
    # Skip scripts/ and vault-demo/
    dirs[:] = [
        d
        for d in dirs
        if d not in ("scripts", "vault-demo", ".git", "complete", "core")
    ]
    for fname in files:
        fp = os.path.join(root, fname)
        if fname == "SKILL.md":
            if fix_skill_file(fp):
                skill_updated += 1
                print(f"skill: {os.path.relpath(fp, BASE)}")
        elif fname.endswith(".md") and "/agents/" in fp:
            if fix_agent_file(fp):
                agent_updated += 1
                print(f"agent: {os.path.relpath(fp, BASE)}")
        elif fname == "CLAUDE.md" and os.path.dirname(fp) != BASE:
            # Domain-level CLAUDE.md (not root)
            if fix_claude_md(fp):
                claude_updated += 1
                print(f"claude: {os.path.relpath(fp, BASE)}")

print(f"\nSkills updated: {skill_updated}")
print(f"Agents updated: {agent_updated}")
print(f"CLAUDE.md files updated: {claude_updated}")
