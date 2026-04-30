---
type: task
trigger: user-or-flow
description: >
  Annual retention sweep. Moves expired or aged-out documents from 00_current/ to 01_prior/
  (or flags for purge) according to category-specific retention rules: tax >7 years, expired
  insurance >3 years, pay stubs >3 years, expired identity docs >1 year after replacement, etc.
---

# records-apply-retention-policy

**Cadence:** Annual (December or January) and on-demand.
**Produces:** Retention plan at `00_current/retention-plan-YYYY.md`; executes archival on user approval.

## What It Does

Vault hygiene requires actively retiring documents that are no longer current. Without a retention sweep, `00_current/` accumulates years of expired insurance declarations, prior-employer pay stubs, and superseded IDs — making the folder slow to scan and the briefs noisier than they need to be.

Default retention (configurable per category):
- **Tax documents** — keep 7 full tax years in `00_current/`; older years move to `01_prior/YYYY/` and are flagged for purge after 10 years if local-law allows.
- **Insurance policies** — keep current term + 1 prior term; older expired policies move to `01_prior/`. Claim-related policies are retained until the claim's statute of limitations.
- **Pay stubs** — keep trailing 3 years in `00_current/`; older move to `01_prior/`.
- **Identity documents (expired)** — keep replaced ID for 1 year after the new ID is issued (immigration / verification edge cases), then move to `01_prior/`.
- **Legal documents (will, POA, healthcare directive)** — never auto-archive; superseded versions move to `01_prior/superseded/` only when the user logs the replacement.
- **Medical EOBs / receipts** — keep 7 years for HSA / FSA reimbursement defensibility, then archive.
- **Vehicle records** — keep for the duration of ownership + 3 years.

The task never deletes. It moves to `01_prior/` and emits a purge-eligible list separately for the user to review.

## Steps

1. Read retention rules from config (defaults applied where not overridden).
2. Enumerate documents in `00_current/`; classify by category and age.
3. For each document, determine: keep / move-to-prior / purge-eligible.
4. Write `00_current/retention-plan-YYYY.md` listing every action.
5. On user approval, execute moves; never delete.
6. Refresh `INDEX.md` via `task-build-vault-index`.

## Configuration

`~/Documents/aireadylife/vault/records/config.md`:
- `retention_overrides` — per-category overrides
- `retention_purge_lookback_years` (default 10)

## Vault Paths

- Reads / writes: `~/Documents/aireadylife/vault/records/00_current/`, `~/Documents/aireadylife/vault/records/01_prior/`
- Writes: `~/Documents/aireadylife/vault/records/00_current/retention-plan-YYYY.md`
