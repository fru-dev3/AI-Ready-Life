---
type: task
trigger: called-by-flow-or-op
description: >
  Single rate-opportunity scanner combining cash drag and rate arbitrage. Detects three
  conditions: (1) liquid balances earning <0.5% APY when 4–5% HYSAs are available
  (cash drag); (2) mortgage rate >0.75% above current market rates (refi opportunity);
  (3) revolving credit-card balances when 0% balance-transfer offers exist. Each finding
  is written as an open-loop entry with quantified annual savings.
---

# wealth-flag-rate-opportunity

**Trigger:** Called by `op-monthly-synthesis`, `op-cash-flow-review`, `op-debt-review`.
**Produces:** Open-loop entries with rate-savings opportunities.

## What It Does

Scans for three rate-related improvement opportunities. Each opportunity is quantified in annual dollar savings so the user can prioritize action.

**1. Cash drag:**
- Reads checking + savings balances and their APYs from `vault/wealth/00_current/`
- For any balance >$1k earning <0.5% APY (configurable): flags with annual opportunity = (balance × (HYSA_target_rate − current_rate))
- Default HYSA target rate is 4.0%, configurable as rate environment shifts

**2. Mortgage refi opportunity:**
- Reads mortgage rate from `vault/wealth/00_current/`
- Compares to configured `current_market_mortgage_rate` (manually updated; ~weekly cadence)
- If current rate > market + 0.75%: flags with annual savings = balance × delta − refi closing costs amortized over expected hold period

**3. Balance-transfer opportunity:**
- For revolving credit-card balances (not paid in full each month) above $1k
- Flags if APR > 15% with annual interest cost as the savings opportunity

**Output:** Each finding goes through `task-update-open-loops` with severity MEDIUM (savings <$500/yr) or HIGH (savings ≥$500/yr).

## Steps

1. Read account balances + APYs + mortgage record + credit card statements from `vault/wealth/00_current/`
2. Apply three checks
3. For each finding: compute annual dollar opportunity, format flag entry
4. Call `task-update-open-loops` with each entry

## Configuration

`vault/wealth/config.md`:
- `cash_drag_apy_threshold` (default 0.005)
- `hysa_target_rate` (default 0.04 — update as rates change)
- `current_market_mortgage_rate` (manual)
- `mortgage_refi_threshold_pct` (default 0.75)
- `cash_drag_min_balance` (default 1000)
- `card_balance_transfer_apr_threshold` (default 0.15)

## Vault Paths

- Reads: `vault/wealth/00_current/` (balances, APYs, mortgage, cards), config
- Writes via task: `vault/wealth/open-loops.md`
