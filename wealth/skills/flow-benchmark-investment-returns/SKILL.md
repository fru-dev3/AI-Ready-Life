---
type: flow
trigger: called-by-op
description: >
  Computes each taxable / retirement / other investment account's trailing return (1mo, 3mo,
  YTD, 1y, 3y annualized) and compares against a configured reference benchmark per account
  type (S&P 500, total bond, target-date fund, custom). Produces alpha/delta and flags
  persistent underperformance.
---

# wealth-benchmark-investment-returns

**Trigger:** Called by `op-investment-review`, `op-monthly-synthesis`.
**Produces:** Benchmark comparison section in investment-review brief.

## What It Does

For each investment account (taxable brokerage, 401k, IRA, HSA-invested), computes time-weighted return over multiple periods and compares to its assigned benchmark.

**Default benchmark assignments (configurable):**
- All-stock account → S&P 500 (or VTI, configurable)
- All-bond account → US aggregate bond index
- Target-date fund → matching target-date benchmark
- Mixed/balanced → custom blend per config (e.g., 60% S&P + 40% bond)

**For each account:**
- Returns: 1mo, 3mo, YTD, 1y, 3y annualized
- Benchmark return for same periods
- Alpha (account return − benchmark return)
- Persistent-underperformance flag: trailing 1y alpha < −2% AND trailing 3y alpha < −1%

## Steps

1. Read account holdings + cost basis from `00_current/`
2. Compute time-weighted returns per account
3. Read benchmark assignment per account from config; pull benchmark return data (manual entry or app skill)
4. Compute alpha per period
5. Flag persistent underperformance to calling op

## Configuration

`vault/wealth/config.md`:
- `account_benchmarks` — mapping of account → benchmark ticker/index
- `underperformance_alpha_threshold_1y` (default −2%)
- `underperformance_alpha_threshold_3y` (default −1%)

## Vault Paths

- Reads: `vault/wealth/00_current/` account holdings, benchmark return data (manually entered or fetched)
- Output structure consumed by: `flow-analyze-investment-performance`
