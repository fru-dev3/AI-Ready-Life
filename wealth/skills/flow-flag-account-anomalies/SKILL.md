---
type: flow
trigger: called-by-op
description: >
  Detects accounts with month-over-month change >5% (configurable) or transactions >$500
  not previously seen in the account's history. Writes findings to open-loops with
  severity. Distinct from task-flag-budget-variance (which checks category spend against
  budget); this scans account-level balance and transaction streams for unexpected moves.
---

# wealth-flag-account-anomalies

**Trigger:** Called by `op-monthly-synthesis`, `op-net-worth-review`, on-demand.
**Produces:** Anomaly entries in `vault/wealth/open-loops.md`.

## What It Does

Reads each account's current balance and recent transactions from `vault/wealth/00_current/` and compares against the prior period.

**Two checks per account:**
1. **Balance anomaly:** absolute MoM delta exceeds the configured threshold (default 5%) and isn't annotated with an expected-movement note.
2. **Unrecognized transaction:** any transaction >$500 (configurable) from a counterparty/merchant not previously seen in the trailing 12 months for that account.

For each anomaly: writes `[ACCOUNT] [TYPE] [AMOUNT] [DATE] — review` to open-loops with severity HIGH (>10% delta or >$5k unrecognized) or MEDIUM otherwise.

## Steps

1. Read account balance files; compute MoM delta per account
2. Read transaction stream for each account
3. Build counterparty allow-list from prior 12 months of transactions
4. Flag balance deltas exceeding threshold without annotation
5. Flag transactions >$500 from new counterparties
6. Call `task-update-open-loops` with each anomaly entry

## Configuration

`vault/wealth/config.md`:
- `anomaly_balance_threshold_pct` (default 5)
- `anomaly_transaction_threshold` (default 500)
- `expected_movement_notes` per account

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/wealth/00_current/`, prior period files in `01_prior/`
- Writes via task: `~/Documents/aireadylife/vault/wealth/open-loops.md`
