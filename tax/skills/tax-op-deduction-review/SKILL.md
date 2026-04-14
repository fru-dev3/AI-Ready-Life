---
name: aireadylife-tax-op-deduction-review
type: op
cadence: monthly
description: >
  Monthly deduction review; scans recent transactions for deductible expenses across
  home office, business, charitable, and medical categories and verifies documentation.
  Triggers: "deduction review", "log a deductible expense", "what can I deduct".
---

# aireadylife-tax-deduction-review

**Cadence:** Monthly (1st of month)
**Produces:** Updated deductions log in vault/tax/03_deductions/, deduction gap flags in vault/tax/open-loops.md

## What it does

Runs monthly to ensure no deductible expense slips through uncaptured across the month. It calls `aireadylife-tax-review-deductions` to scan transaction records and vault documents for deductible items across the key categories: home office (proportional rent/utilities), business expenses (software, equipment, professional services), charitable contributions (cash and non-cash), and medical expenses (out-of-pocket costs, insurance premiums, HSA-ineligible items). Each deductible item identified is passed to `aireadylife-tax-log-deductible-expense` to record it with supporting documentation references. The op also checks whether the YTD deduction total per category is running below or above the prior year pace and flags any category that appears underreported.

## Calls

- **Flows:** `aireadylife-tax-review-deductions`
- **Tasks:** `aireadylife-tax-log-deductible-expense`, `aireadylife-tax-update-open-loops`

## Apps

None

## Vault Output

`vault/tax/03_deductions/`
