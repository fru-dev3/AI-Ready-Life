---
type: flow
trigger: called-by-op
description: >
  Divides current liquid balance (checking + savings + HYSA + money market) by trailing
  3-month average expense burn from cash-flow data. Reports runway in months and compares
  against the configured emergency-fund floor (default 6 months). Flags shortfall.
---

# wealth-calculate-emergency-fund-runway

**Trigger:** Called by `op-cash-flow-review`, `op-monthly-synthesis`, on-demand.
**Produces:** Runway figure in monthly synthesis brief; flag in open-loops if below floor.

## What It Does

Reads liquid-asset balances and trailing 3-month total expenses from cash-flow records to compute how many months of expenses the user could cover from cash without selling investments or taking on debt.

**Calculation:**
- Liquid assets = sum of checking, savings, HYSA, money market account balances
- Average monthly burn = trailing 3-month total expenses ÷ 3
- Runway = liquid assets ÷ average monthly burn

Compares to configured `emergency_fund_floor_months` (default 6). Below floor → flag with shortfall amount needed to reach the floor.

## Steps

1. Sum liquid-asset balances from `vault/wealth/00_current/`
2. Read trailing 3 months of expense totals from cash-flow summaries in `02_briefs/`
3. Compute average monthly burn
4. Compute runway in months
5. Compare to configured floor
6. If below: call `task-update-open-loops` with severity MEDIUM and dollar shortfall
7. Return runway months figure to calling op

## Configuration

`vault/wealth/config.md`:
- `emergency_fund_floor_months` (default 6)
- `liquid_account_types` (default: checking, savings, HYSA, money_market)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/wealth/00_current/` (account balances), `02_briefs/` (prior cash-flow summaries)
