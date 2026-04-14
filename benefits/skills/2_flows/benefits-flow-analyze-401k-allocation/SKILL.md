---
name: aireadylife-benefits-flow-analyze-401k-allocation
type: flow
trigger: called-by-op
description: >
  Reviews 401k fund allocation, contribution rate vs company match, and estimated retirement
  projection at current pace.
---

# aireadylife-benefits-analyze-401k-allocation

**Trigger:** Called by `aireadylife-benefits-401k-review`
**Produces:** 401k allocation review with match capture status, fund drift analysis, and retirement projection

## What it does

Reads 401k account data from vault/benefits/01_401k/ including current contribution rate, employer
match formula, fund lineup, and current allocation percentages. Verifies that the contribution rate
is at least high enough to capture the full employer match — flags immediately if the user is
leaving match money on the table. Compares current fund allocation against a target allocation
(stored in vault/benefits/01_401k/target-allocation.md) and calculates any drift that warrants
rebalancing. Runs a simple projected balance calculation using current balance, ongoing contribution
rate, and an assumed average annual return to estimate account value at the user's target retirement
age. Surfaces the results as a structured review the calling op can embed in a dated brief.

## Configuration

Store 401k statements and contribution confirmation emails in vault/benefits/01_401k/. Maintain
a target-allocation.md file with desired fund percentages and retirement age for projection logic.

## Steps

1. Read 401k account data from vault/benefits/01_401k/ (balance, contribution rate, fund holdings)
2. Verify contribution rate captures the full employer match; flag any shortfall
3. Compare current fund allocation percentages to target allocation, flag drift >5% per fund
4. Calculate projected 401k balance at retirement age using current pace and assumed 7% annual return

## Apps

None

## Vault Output

`vault/benefits/01_401k/`
