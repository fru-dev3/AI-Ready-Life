---
type: op
trigger: user-facing
description: >
  Annual estate-plan freshness check: verifies will / trust documents are current,
  beneficiary designations are up to date on every retirement / insurance / bank account,
  healthcare directive and durable power of attorney exist, and contact info for executor
  / trustee is current. Universal — most adults are out of date here, especially after
  marriage, divorce, kids, or parent death.
---

# wealth-estate-plan-review

**Trigger phrases:**
- "estate plan review"
- "are my beneficiaries up to date"
- "annual estate check"
- "what happens when I die"

**Cadence:** Annual; on-demand after major life events (marriage, divorce, baby, parent death).

## What It Does

Walks the user through the seven core estate-plan components and flags anything missing, stale, or inconsistent.

**Seven components checked:**
1. **Will or living trust** — exists, dated, witnessed, location known. Flag if older than 5 years or if life events have occurred since last update.
2. **Healthcare directive / living will** — exists, signed.
3. **Durable power of attorney (financial)** — exists, signed; agent is current and willing.
4. **HIPAA authorization** — exists for emergency medical info access.
5. **Beneficiary designations on every retirement account** — 401k, IRA, Roth, HSA each have a primary and contingent. Flags any account missing or stale.
6. **Beneficiary designations on every life-insurance policy** — primary + contingent.
7. **Beneficiary designations on bank accounts (POD/TOD)** and brokerage (TOD).

**Per-account beneficiary check:**
- Reads account list from `vault/wealth/00_current/`
- Reads stored beneficiary record (if any) from `vault/records/00_current/beneficiaries.md` (cross-domain)
- For each account: confirms primary + contingent beneficiary recorded; flags if stale (>3 years since updated) or missing

**Plus:** confirms executor/trustee contact info is current; confirms minor children's guardian designation if applicable; surfaces digital-legacy plan if user has one (cross-domain to records plugin).

## Output

Brief at `vault/wealth/02_briefs/YYYY-estate-plan-review.md` with:
- Component checklist with status (CURRENT / STALE / MISSING)
- Per-account beneficiary table
- Flagged actions (e.g., "Update 401k beneficiary — last updated before marriage")
- Recommendation list ordered by urgency

## Steps

1. Read estate-plan documents inventory from `vault/wealth/00_current/estate-plan.md` or `vault/records/00_current/`
2. Read account list + beneficiary records
3. Check each of the seven components
4. Flag missing / stale items with severity
5. Write brief
6. Update `vault/wealth/open-loops.md` with action items

## Configuration

`vault/wealth/config.md`:
- `estate_plan_review_cadence_years` (default 1)
- `has_minor_children` (drives guardian-designation check)
- `has_trust` vs `has_will_only`
- `executor_name`, `trustee_name` (optional)

## Vault Paths

- Reads: `vault/wealth/00_current/estate-plan.md`, `vault/records/00_current/beneficiaries.md`, account list
- Writes: `vault/wealth/02_briefs/YYYY-estate-plan-review.md`, `vault/wealth/open-loops.md`
