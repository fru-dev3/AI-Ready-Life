---
name: arlive-tax-task-log-deductible-expense
type: task
cadence: as-received
description: >
  Records a deductible expense to vault/tax/03_deductions/ with category, amount,
  date, vendor, and supporting document reference.
---

# arlive-tax-log-deductible-expense

**Cadence:** As-received (called by deduction review op or triggered directly)
**Produces:** New deduction entry in vault/tax/03_deductions/ with full documentation metadata

## What it does

Records a single deductible expense to the vault deductions log with all fields needed to support a deduction at filing time. Each entry captures: the expense date, vendor or payee, amount, deduction category (home office, vehicle, business expense, charitable, medical), the IRS basis for deductibility (with a brief citation), a reference to the supporting document file stored in vault/tax/03_deductions/, whether the item requires business-purpose documentation, and the tax year it applies to. The task enforces that a document reference exists before writing the entry — if no receipt or acknowledgment letter reference is provided, it flags the entry as "documentation pending" rather than rejecting it, allowing the expense to be captured immediately and the documentation sourced later. This task can also be called directly when a deductible purchase is made in real time, not just during monthly reviews.

## Apps

None

## Vault Output

`vault/tax/03_deductions/`
