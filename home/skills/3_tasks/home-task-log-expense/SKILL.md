---
name: arlive-home-log-expense
type: task
cadence: as-received
description: >
  Records a home expense to vault/home/01_expenses/ with date, category, vendor, amount, notes,
  and receipt reference.
---

# arlive-home-log-expense

**Cadence:** As-received (when a bill is paid or repair is completed)
**Produces:** New expense record in `vault/home/01_expenses/`

## What it does

This task creates a structured expense record each time a home-related payment is made or a bill
arrives. It captures the date, expense category (utility, repair, supplies, service), vendor name,
amount paid, any relevant notes (e.g., "replaced garbage disposal motor"), and a reference to the
receipt or invoice. Keeping expenses logged as they happen ensures the monthly expense review has
complete data and prevents end-of-month scrambling to reconstruct what was spent. The category
tagging feeds directly into the budget variance calculations run by `arlive-home-build-expense-summary`.

## Apps

None

## Vault Output

`vault/home/01_expenses/`
