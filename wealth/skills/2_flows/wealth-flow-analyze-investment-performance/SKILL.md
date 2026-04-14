---
name: arlive-wealth-flow-analyze-investment-performance
type: flow
trigger: called-by-op
description: >
  Reviews investment account performance, calculates 30-day and YTD returns,
  checks allocation vs. target, and flags any drift greater than 5%.
---

# arlive-wealth-analyze-investment-performance

**Trigger:** Called by `arlive-wealth-investment-review`
**Produces:** Investment performance summary in vault/wealth/01_investments/ with return figures and rebalancing recommendations

## What it does

Reads all investment account records from vault/wealth/01_investments/, which includes account type (401k, IRA, taxable brokerage, HSA), holdings, current values, and cost basis. For each account, it calculates 30-day return, YTD return, and total return since inception. Actual asset allocation (stocks, bonds, cash, international, real estate) is derived from the holdings and compared to the target allocation stored in vault configuration. Any asset class that has drifted more than 5 percentage points from its target triggers a rebalancing flag with specific trade recommendations — which holdings to trim or add to and the approximate amounts. The flow also checks 401k contribution pace against the annual IRS maximum and flags if the rate needs to increase.

## Steps

1. Read all investment account holdings from vault/wealth/01_investments/
2. Calculate 30-day and YTD returns for each account
3. Derive current asset allocation percentages from holdings
4. Compare actual allocation to target allocation in vault config
5. Flag any asset class drifted more than 5% from target with rebalancing amounts

## Apps

None

## Vault Output

`vault/wealth/01_investments/`
