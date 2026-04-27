---
type: task
trigger: user-or-flow
description: >
  Scans the contacts file for any warm contact whose last_contact_date is older than 90 days
  and writes a stale-contact flag to open-loops with a suggested next action. Closes the "no
  warm contact older than 90 days" benchmark. Called by op-network-review and runnable on demand.
---

# career-flag-stale-contact

**Trigger phrases:**
- "find stale contacts"
- "who haven't I talked to"
- "check my network freshness"
- "any contacts going stale"

**Cadence:** Called by `op-network-review` monthly; runnable on demand.

## What It Does

Reads `vault/career/00_current/contacts.md` (or per-contact files in a `contacts/` folder) and identifies any contact tagged `warm` or `strong` whose `last_contact_date` is older than the configured staleness threshold (default 90 days). For each stale contact, writes a flag to open-loops with a one-line suggested next action: a low-friction touch (share an article relevant to their domain, congrats on recent role change visible from LinkedIn, ask one specific question, propose a 20-minute coffee).

**Severity:**
- 90-180 days stale: MEDIUM
- >180 days stale: HIGH (relationship has likely cooled to acquaintance)
- >365 days: HIGH and recommend re-warming via a referral introduction rather than a cold ping

Does not draft the message itself — that is `task-draft-outreach-message`. This task only flags. Pairs with `task-draft-outreach-message` when the user wants to act on a flag immediately.

## Steps

1. Read all contact entries from `vault/career/00_current/contacts.md` or `contacts/`.
2. Filter to entries tagged `warm` or `strong`.
3. For each entry: compute days since `last_contact_date`. If > threshold, add to flag list with severity tier.
4. For each flagged contact, generate one-line suggested next action based on their tags (industry / shared context / role).
5. Call `task-update-open-loops` with the flag list.
6. Return summary: N stale contacts found, broken down by severity.

## Configuration

`vault/career/config.md`:
- `contact_stale_threshold_days` (default 90)
- `contact_critical_threshold_days` (default 180)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/career/00_current/contacts.md`, `contacts/`
- Writes via task: `~/Documents/aireadylife/vault/career/open-loops.md`
