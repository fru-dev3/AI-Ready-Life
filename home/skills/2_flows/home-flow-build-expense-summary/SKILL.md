---
name: arlive-home-flow-build-expense-summary
type: flow
trigger: called-by-op
description: >
  Summarizes monthly home expenses by category vs. prior month and YTD budget, flagging categories
  more than 20% over budget.
---

# arlive-home-build-expense-summary

**Trigger:** Called by `arlive-home-expense-review`
**Produces:** Expense summary table with category totals, MoM variance, and YTD vs. budget

## What it does

This flow reads all expense records from the current month and aggregates them into four categories:
utilities (electric, gas, water, internet), repairs (any contractor or parts expense), supplies
(cleaning, hardware, garden), and services (lawn, pest, cleaning service). It calculates the monthly
total per category, compares to the prior month, and shows YTD spending vs. annual budget. Any
category exceeding 20% over its monthly budget target is flagged for the op to surface as an
open-loop item. The summary also shows total monthly home spend as a single headline number.

## Steps

1. Read all expense records from `vault/home/01_expenses/` for the current month
2. Group expenses by category (utilities, repairs, supplies, services)
3. Calculate monthly totals per category
4. Compare to prior month totals and YTD budget targets
5. Flag any category more than 20% over its monthly budget

## Apps

None

## Vault Output

`vault/home/01_expenses/`
