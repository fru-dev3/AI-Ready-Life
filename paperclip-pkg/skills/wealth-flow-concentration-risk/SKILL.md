---
type: flow
trigger: called-by-op
description: >
  Flags any single position >10% (configurable) of total portfolio, with extra surfacing
  for employer-stock concentration (RSUs, ESPP, ISOs, options). Outputs the position's
  share of portfolio + dollar value, plus diversification recommendation.
---

# wealth-concentration-risk

**Trigger:** Called by `op-investment-review`, `op-net-worth-review`.
**Produces:** Concentration warnings in investment-review brief.

## What It Does

Reads all holdings across all investment accounts and identifies any single position whose value exceeds the concentration threshold as a percentage of total portfolio.

**Two checks:**
1. **General concentration:** any ticker / fund / asset whose total value (summed across all accounts) is >10% of portfolio
2. **Employer-stock concentration:** if `vault/career/00_current/` shows RSU vests / ESPP holdings / ISO grants in employer stock, flag if employer-stock total >5% of portfolio (more conservative threshold because employer stock concentrates job + investment risk)

**For each flagged position:**
- Ticker / position name
- Total value (summed across accounts)
- Percent of portfolio
- Type (single stock / fund / employer stock / crypto / other)
- Diversification recommendation: gradual sell-down strategy if taxable; rebalance via new contributions if tax-advantaged

## Steps

1. Aggregate holdings across all investment accounts by ticker/position
2. Compute portfolio total
3. Compute each position's percent of portfolio
4. Check for general concentration (>10%)
5. Cross-reference with `vault/career/00_current/` for employer-stock holdings
6. Apply employer-stock threshold (5%)
7. Generate diversification recommendations
8. Return findings to calling op

## Configuration

`vault/wealth/config.md`:
- `general_concentration_threshold_pct` (default 10)
- `employer_stock_threshold_pct` (default 5)
- `employer_stock_tickers` — list of tickers considered employer stock (for users with RSUs)

## Vault Paths

- Reads: `vault/wealth/00_current/` holdings; `vault/career/00_current/` for employer-stock detection (cross-domain)
