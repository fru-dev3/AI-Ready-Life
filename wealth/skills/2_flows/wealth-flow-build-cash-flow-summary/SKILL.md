---
name: arlive-wealth-flow-build-cash-flow-summary
type: flow
trigger: called-by-op
description: >
  Summarizes all income and expenses for the month, compares to prior month and
  budget targets, and flags categories over budget.
---

# arlive-wealth-build-cash-flow-summary

**Trigger:** Called by `arlive-wealth-cash-flow-review`
**Produces:** Cash flow summary document in vault/wealth/03_cashflow/ with income, expenses, net, and budget variances

## What it does

Reads income and expense transaction records from vault/wealth/03_cashflow/ for the current month period. Income is aggregated by source: W-2 salary (net of taxes and benefits), rental income, business/freelance income, dividends, and interest. Expenses are grouped into standard budget categories: housing, transportation, food and dining, healthcare, subscriptions, entertainment, clothing, and savings contributions. Net cash flow (income minus total expenses) is calculated, and each expense category is compared to its configured budget target. Categories more than 20% over budget are flagged for `arlive-wealth-flag-budget-variance`. The output includes a simple month-over-month comparison showing which categories increased or decreased.

## Steps

1. Read income records from vault/wealth/03_cashflow/ for the current month
2. Aggregate income by source type
3. Read expense records and group by budget category
4. Calculate net cash flow (total income minus total expenses)
5. Compare each expense category to budget target and flag overages >20%

## Apps

None

## Vault Output

`vault/wealth/03_cashflow/`
