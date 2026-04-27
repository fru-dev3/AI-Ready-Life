---
type: task
trigger: user-or-flow
description: >
  Maintains a list of professional references: who, role at the time of relationship, last
  contact date, willingness-to-vouch status, role-fit notes, and contact info. Surfaces
  references going stale before a job search begins so the first ask isn't from a cold
  reach-out. References are a long-tail discipline — most users wait until they need
  them, which is too late.
---

# career-update-reference-list

**Trigger phrases:**
- "update my references"
- "refresh reference list"
- "add a reference"
- "check my references"
- "are my references current"

**Cadence:** Quarterly review; user-triggered on add/edit; called by `op-skills-gap-review` for staleness scan.

## What It Does

Stores a structured reference list and runs a freshness check. Each entry contains:

- `name`, `current_role`, `current_company`, `relationship` (former-manager / former-peer / former-direct-report / external-collaborator / mentor / advisor)
- `relationship_period` (start-end of when you worked together)
- `role_fit` (which target roles this person is best for — e.g., "engineering management", "technical IC", "product partnership")
- `vouch_strength` (strong / good / situational / unknown — last assessed)
- `last_contact_date`
- `last_explicit_consent_date` (when did they last say "yes, you can list me as a reference")
- `contact_method` (preferred — email, LinkedIn, phone, encrypted)
- `notes` (specific stories they can speak to, prior reference checks they've done)

**Freshness rules:**
- `last_explicit_consent_date` >12 months → flag MEDIUM, recommend a "checking in" message and re-confirm
- `last_explicit_consent_date` >24 months → flag HIGH, treat as not currently a viable reference until refreshed
- `last_contact_date` >180 days → flag LOW, suggest a low-friction touch
- Active job search detected (any pipeline item in `final` or `offer` stage, or `targeting_promotion: true`) AND fewer than 3 references with strong/good vouch strength → flag HIGH

## Steps

1. Collect input: add new reference, update existing, or run freshness scan only.
2. For add/update: validate required fields (name, relationship, vouch strength, contact method).
3. Append or update entry in `vault/career/00_current/references.md`.
4. Run freshness rules across all entries; build flag list.
5. Call `task-update-open-loops` with any new flags.
6. Return summary: total references, count by vouch strength, count flagged.

## Configuration

`vault/career/config.md`:
- `reference_consent_stale_months` (default 12)
- `reference_consent_critical_months` (default 24)
- `min_strong_references` (default 3)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/career/00_current/references.md`, `vault/career/00_current/` for active pipeline check
- Writes: `~/Documents/aireadylife/vault/career/00_current/references.md`, `open-loops.md`
