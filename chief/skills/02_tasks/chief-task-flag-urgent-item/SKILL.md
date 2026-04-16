---
name: aireadylife-chief-task-flag-urgent-item
type: task
cadence: as-received
description: >
  Writes a cross-domain urgent flag to vault/chief/00_current/ when an item from any domain is 🔴
  priority. Includes domain, item description, due date, and recommended action.
---

# aireadylife-chief-flag-urgent-item

**Trigger:** Called at the end of every chief op when any 🔴 priority items are found across domains
**Produces:** Dated urgent alert record in ~/Documents/AIReadyLife/vault/chief/00_current/

## What It Does

This task ensures that every 🔴 priority item surfaced during a chief brief cycle is persistently recorded in vault/chief/00_current/ — a cross-domain urgent item tracker that survives beyond any single brief run. Its purpose is to guarantee that critical items never silently disappear: even if a domain's open-loops.md gets edited, cleared, or accidentally overwritten, the chief alert record remains.

The task is called once per 🔴 item after the brief is assembled. It receives the item's source domain, full description, due date (if any), recommended action, and the date it was first surfaced. Before writing, it checks vault/chief/00_current/ for an existing unresolved alert with the same domain + description combination (matched by a normalized slug). If a matching unresolved alert already exists, the task updates the existing file with a "still unresolved as of [date]" note rather than creating a duplicate — this prevents the alerts directory from filling with repeated records of the same item across daily brief runs.

Each new alert file is named: YYYY-MM-DD-{domain}-{slug}.md (date of first surfacing, domain name, URL-safe slug of the item description). The file contains: source domain, item description, due date (or "No hard deadline"), recommended action, date first flagged, date last checked (updated on each brief run), resolution status (open/resolved), and a free-form notes field for any context added during review.

When an item is resolved — meaning it no longer appears as an unresolved item in the source domain's open-loops.md on a subsequent brief run — the task updates the corresponding alert record in vault/chief/00_current/ with `resolution_status: resolved` and the resolution date. Resolved alerts are not deleted; they are preserved as a historical record of what was flagged and when it was closed.

## Steps

1. Receive 🔴 item from calling op: domain, description, due date, action, date raised
2. Generate normalized slug from item description (lowercase, hyphens, max 40 chars)
3. Check vault/chief/00_current/ for existing file matching domain + slug
4. If existing unresolved alert found: append "still unresolved as of [today]" line; do not create new file
5. If no existing alert: create new alert file YYYY-MM-DD-{domain}-{slug}.md with full structured record
6. On each brief run: scan all open alert files; check whether the source domain's item is still unresolved
7. If source item is now resolved: update alert file with resolution_status: resolved and resolution_date

## Input

- 🔴 item data passed by calling op (domain, description, due date, action, date raised)
- ~/Documents/AIReadyLife/vault/chief/00_current/ (for deduplication check)
- ~/Documents/AIReadyLife/vault/*/open-loops.md (for resolution status check on each run)

## Output Format

Alert file: ~/Documents/AIReadyLife/vault/chief/00_current/YYYY-MM-DD-{domain}-{slug}.md

```markdown
---
domain: tax
description: Q1 estimated tax payment overdue
due_date: 2026-04-15
action: Log payment at vault/tax/payments.md and confirm amount paid
date_flagged: 2026-04-13
date_last_checked: 2026-04-14
resolution_status: open
---

## Alert Details

**Source:** tax
**Item:** Q1 estimated tax payment overdue
**Due:** 2026-04-15
**Action:** Log payment at vault/tax/payments.md and confirm amount paid
**First flagged:** 2026-04-13

## Status Log
- 2026-04-13: Flagged — unresolved in tax/open-loops.md
- 2026-04-14: Still unresolved as of daily brief run
```

## Configuration

No configuration required. Alert files auto-populate from calling op data.

## Error Handling

- **01_alerts/ directory missing:** Create the directory on first run before writing.
- **Slug collision (two different items produce same slug):** Append a numeric suffix (-2, -3) to distinguish.
- **Resolution check fails (open-loops.md unreadable):** Leave resolution_status as "open" rather than incorrectly marking resolved.

## Vault Paths

- Reads from: ~/Documents/AIReadyLife/vault/chief/00_current/, ~/Documents/AIReadyLife/vault/*/open-loops.md
- Writes to: ~/Documents/AIReadyLife/vault/chief/00_current/YYYY-MM-DD-{domain}-{slug}.md
