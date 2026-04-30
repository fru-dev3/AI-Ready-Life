---
type: task
trigger: user-or-flow
description: >
  Annual sweep of every insurance policy and financial account that names a beneficiary:
  life policies, disability riders with beneficiary clauses, retirement accounts (401k,
  IRA, Roth), HSAs, brokerage TOD/POD, bank POD, 529s. Surfaces stale designations from
  before marriage, divorce, child birth, or parent death. High-leverage low-effort.
---

# insurance-review-beneficiaries

**Trigger:**
- User input: "review beneficiaries", "beneficiary check", "are my beneficiaries current"
- Called by: `op-coverage-audit` (annual), `op-life-event-coverage-trigger` (after life events)

## What It Does

Beneficiary designations override wills. The single most common estate-planning failure is a stale beneficiary that pays out to an ex-spouse, a deceased parent, or "estate" (which forces probate). This task is a structured sweep, not a legal review.

**What gets reviewed:**
- Every life insurance policy (group, supplemental, individual term, whole/universal): primary and contingent beneficiaries.
- Disability policies with death-benefit or accelerated-benefit riders.
- Retirement accounts in the user's domain vaults: 401(k), 403(b), 457, IRA (Trad / Roth / SEP / SIMPLE), HSA.
- Brokerage TOD (transfer-on-death) and bank POD (pay-on-death) registrations.
- 529 plan account-owner-successor designations.
- Pension survivor benefits (where applicable).

**Per beneficiary line, the task records:**
- Account / policy name
- Primary beneficiary(ies) with percentages
- Contingent beneficiary(ies) with percentages
- Last verified date
- Flag conditions: ex-spouse named, deceased person named, "estate" named (forces probate), no contingent named, percentages don't sum to 100%, child under 18 named directly without trust mechanism.

## Steps

1. Read all policies from `vault/insurance/00_current/policies/`.
2. If `vault/wealth/` exists: read account list from `vault/wealth/00_current/` for retirement, brokerage, bank, HSA, 529.
3. For each item with a beneficiary field: read primary, contingent, last-verified date.
4. Compare to `vault/insurance/config.md` known life events (marriage / divorce / births / deaths / step-children).
5. Apply flag conditions and rate severity (HIGH for ex-spouse-named or deceased-named; MEDIUM for missing contingent or pre-life-event verification).
6. Write the consolidated table to `vault/insurance/00_current/beneficiary-review-{YYYY-MM}.md`.
7. Call `task-update-open-loops` for each flag.

## Configuration

`vault/insurance/config.md`:
- `marital_status`, `prior_spouses` (list, optional), `dependents` (list with DOB), `deceased_relatives_to_remove` (optional list)

## Error Handling

- **Beneficiary field missing in vault record:** Flag as MEDIUM with action "verify on carrier portal."
- **No life events configured:** Run baseline check anyway; note that life-event-driven flags require config.

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/insurance/00_current/policies/`, optional `~/Documents/aireadylife/vault/wealth/00_current/`, `~/Documents/aireadylife/vault/insurance/config.md`
- Writes: `~/Documents/aireadylife/vault/insurance/00_current/beneficiary-review-{YYYY-MM}.md`, `~/Documents/aireadylife/vault/insurance/open-loops.md`
