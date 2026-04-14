---
name: arlive-home-op-expense-review
type: op
cadence: monthly
description: >
  Monthly home expense review that tracks utilities, repairs, and supplies vs. budget and flags
  unusual spend. Triggers: "home expenses", "utility review", "repair costs", "home budget".
---

# arlive-home-expense-review

**Cadence:** Monthly (1st of month)
**Produces:** Home expense summary with category totals, budget variance, and flagged overruns

## What it does

This op reviews all home expenses logged in the vault during the previous month and compares them
to the monthly budget by category (utilities, repairs, supplies, services). It calculates YTD totals
per category and flags any category running more than 20% over budget. Utility bills are trended
against the prior month and the same month last year to surface seasonal anomalies or rate changes.
Repair expenses are tracked separately with running totals so you can see when repair costs on a
specific system (HVAC, plumbing, appliances) are approaching replacement thresholds.

## Calls

- **Flows:** `arlive-home-build-expense-summary`
- **Tasks:** `arlive-home-log-expense`, `arlive-home-update-open-loops`

## Apps

None

## Vault Output

`vault/home/01_expenses/`
