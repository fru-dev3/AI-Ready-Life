---
name: aireadylife-tax-flow-review-deductions
type: flow
trigger: called-by-op
description: >
  Scans recent transactions and vault documents for deductible expenses, categorizes
  them, calculates YTD totals per category, and flags categories below prior year pace.
---

# aireadylife-tax-review-deductions

**Trigger:** Called by `aireadylife-tax-deduction-review`
**Produces:** Updated deduction category totals in vault/tax/03_deductions/ with YTD summary and pace flags

## What it does

Reads recent transaction records and uploaded receipts from vault/tax/03_deductions/ and classifies each item against the IRS deduction categories active for the taxpayer: home office (square footage method or actual expenses), vehicle business use (standard mileage or actual cost), business expenses (software, equipment, professional development, meals at 50%), charitable contributions (cash and non-cash with fair market value), and qualified medical expenses exceeding 7.5% of AGI. Each categorized item is checked for documentation completeness — a receipt, invoice, or acknowledgment letter reference must exist. The flow calculates YTD totals per category and compares them to the same-period total from the prior year, flagging any category running more than 20% behind prior year pace as potentially underreported.

## Steps

1. Read recent transaction records and documents from vault/tax/03_deductions/
2. Classify each eligible item by deduction category
3. Verify documentation reference exists for each item
4. Calculate YTD total per category
5. Compare to prior year same-period total and flag categories more than 20% behind pace

## Apps

None

## Vault Output

`vault/tax/03_deductions/`
