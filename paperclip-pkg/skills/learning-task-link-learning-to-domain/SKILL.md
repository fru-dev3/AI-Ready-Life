---
type: task
trigger: user-or-flow
description: >
  Tags a learning item with which life domain it serves (career, hobby, parenting,
  finance, health, civic, social, home, vision) and writes a one-line note to that
  domain's `vault/{domain}/` of how the learning will apply. Closes cross-domain
  application. Generic — no specific career field assumed.
---

# learning-link-learning-to-domain

**Trigger:**
- User input: "link learning to domain", "this course is for X domain", "where does this apply"
- Called by: `task-log-completion`, `task-log-applied-output`, `op-monthly-reflection`

## What It Does

Connects a learning item to the life domain it serves so cross-domain agents see the application without the user having to repeat themselves.

**Domains supported (configurable; aligned to AI Ready Life plugins):**
- career, wealth, tax, health, calendar, vision, insurance, explore, home, learning, records, social.
- Plus user-defined custom domains (e.g. "parenting", "civic", "hobby/woodworking", "side-business").

**Per-link record:**
- `learning_item` — title or vault path of the course / book / paper / theme.
- `target_domain` — one of the domains above.
- `application_note` — one line, ≤200 chars, plain language. Example: "Use Series I bond knowledge to rebalance emergency fund tier 2."
- `application_status` — planned / in-progress / done.
- `expected_artifact` — what will exist when this is "done" (links to `task-log-applied-output`).

**Side-effects:**
- Writes a one-line cross-link to `vault/{target_domain}/00_current/from-learning.md` so the target domain's `op-review-brief` surfaces it.
- If `target_domain` plugin is not installed, write to `vault/learning/00_current/cross-domain-pending.md` with no error.

## Steps

1. Read input fields.
2. Validate target_domain (must be in allow-list or user-defined list).
3. Append to `vault/learning/00_current/cross-domain-links.md`.
4. Append one-liner to `vault/{target_domain}/00_current/from-learning.md` (or pending file if domain not installed).
5. If `application_status` is `planned` and >30 days old without artifact, surface to open-loops.

## Configuration

`vault/learning/config.md`:
- `custom_domains` — list of user-added domains.
- `cross_domain_stale_days` (default 30).

## Vault Paths

- Writes: `vault/learning/00_current/cross-domain-links.md`, `vault/{target_domain}/00_current/from-learning.md` (or `vault/learning/00_current/cross-domain-pending.md`), `vault/learning/open-loops.md`.
