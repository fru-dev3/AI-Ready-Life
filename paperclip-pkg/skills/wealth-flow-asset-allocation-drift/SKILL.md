---
type: flow
trigger: called-by-op
description: >
  Compares current portfolio mix to user-configured target allocation. Flags any asset
  class drifted >5% from target (configurable). Supports any allocation strategy:
  three-fund (US/intl/bond), 60/40, target-date glidepath, custom multi-asset. Generates
  rebalance recommendations.
---

# wealth-asset-allocation-drift

**Trigger:** Called by `op-investment-review`, on-demand.
**Produces:** Drift table + rebalance recommendations in investment-review brief.

## What It Does

Reads holdings across all investment accounts and rolls up by asset class. Compares current mix to target. Surfaces any class drifted beyond the threshold.

**Standard asset classes:**
- US stocks (large cap, small cap optional split)
- International stocks (developed, emerging optional split)
- Bonds (total bond, treasury, corporate)
- Real estate (REITs, direct holdings)
- Cash / cash equivalents
- Other (commodities, crypto, alternatives)

User configures target allocation in `config.md`. The flow handles:
- Across-account aggregation (target is portfolio-wide, not per-account)
- Drift threshold (default ±5% absolute)
- Rebalance recommendations: which accounts to buy/sell what (preferring tax-advantaged accounts for taxable transactions to avoid capital-gains realization)

## Steps

1. Read holdings from all investment accounts in `vault/wealth/00_current/`
2. Classify each holding by asset class (using ticker → class lookup; Vanguard/Fidelity fund mappings; manual override per holding in config)
3. Sum by asset class and as percent of total portfolio
4. Read target allocation from config
5. Compute drift per class: current% − target%
6. Flag classes where |drift| > threshold
7. Generate rebalance suggestions: amount to buy/sell per class, account preference (tax-advantaged first)
8. Return findings to calling op

## Configuration

`vault/wealth/config.md`:
- `target_allocation` — class → percent mapping (must sum to 100)
- `drift_threshold_pct` (default 5)
- `holding_class_overrides` — manual ticker → class for funds the lookup misses

## Vault Paths

- Reads: `vault/wealth/00_current/` holdings; ticker-class mapping (built-in + config overrides)
