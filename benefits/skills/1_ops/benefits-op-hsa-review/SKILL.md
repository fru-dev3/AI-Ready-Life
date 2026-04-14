---
name: arlive-benefits-op-hsa-review
type: op
cadence: monthly
description: >
  Monthly HSA review that tracks account balance, YTD contribution pace vs IRS limit, pending
  qualified expense reimbursements, and investment threshold status. Triggers: "HSA review",
  "HSA balance", "HSA contributions".
---

# arlive-benefits-hsa-review

**Cadence:** Monthly (1st of month)
**Produces:** HSA status summary, reimbursement action list, updated open-loops entries

## What it does

Reads HSA account data from vault/benefits/02_hsa/ to produce a monthly snapshot of the account's
health. Calculates YTD contributions against the current IRS annual limit (individual and family
tiers), projects whether the user will hit the limit by year-end at the current pace, and flags
if the contribution rate needs adjustment. Checks whether the balance has crossed the investment
threshold (the point at which uninvested cash should be moved to the investment sleeve) and flags
pending qualified medical expenses that haven't yet been reimbursed. Writes action items — such as
increasing payroll contributions or submitting pending receipts — to vault/benefits/open-loops.md
via the update-open-loops task.

## Configuration

Store HSA statements and contribution history in vault/benefits/02_hsa/. Record the investment
threshold dollar amount in vault/benefits/02_hsa/config.md for the investment-threshold check.

## Calls

- **Flows:** `arlive-benefits-check-hsa-balance`
- **Tasks:** `arlive-benefits-update-open-loops`

## Apps

None

## Vault Output

`vault/benefits/02_hsa/`
