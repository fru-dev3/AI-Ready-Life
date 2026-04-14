---
name: aireadylife-wealth-flow-build-debt-summary
type: flow
trigger: called-by-op
description: >
  Builds a debt table with balance, rate, monthly payment, payoff date, total
  remaining interest cost, and extra-payment impact scenarios.
---

# aireadylife-wealth-build-debt-summary

**Trigger:** Called by `aireadylife-wealth-debt-review`
**Produces:** Debt summary table in vault/wealth/02_debt/ with payoff timelines and extra-payment models

## What it does

Reads all outstanding loan records from vault/wealth/02_debt/, which stores each liability with its original balance, current balance, interest rate, monthly payment, and loan type (mortgage, auto, student, personal, credit card). For each loan, it calculates the remaining payoff timeline at the current payment pace and the total interest dollars that will be paid over that period. The flow then models two extra-payment scenarios — adding $100/month and $500/month to the highest-rate debt — and computes the interest savings and payoff acceleration for each scenario. Results are ranked by interest rate (highest first) to surface which debt deserves priority paydown. The output is a clear table that makes the true cost of each loan visible, not just the monthly payment.

## Steps

1. Read all loan records from vault/wealth/02_debt/
2. Calculate payoff date and total remaining interest for each loan at current payment
3. Model extra-payment scenarios ($100/month and $500/month applied to highest-rate debt)
4. Rank debts by interest rate (highest first)
5. Format summary table with balance, rate, payment, payoff date, and interest cost

## Apps

None

## Vault Output

`vault/wealth/02_debt/`
