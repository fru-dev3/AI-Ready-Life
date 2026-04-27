---
type: flow
trigger: called-by-op
description: >
  Categorizes inflows from cash-flow data into distinct streams (W-2, self-employment,
  rental, dividends/interest, other) with totals and volatility per stream. Each stream
  is reported separately because they have different tax character, reliability, and
  cash-flow planning implications.
---

# wealth-separate-income-streams

**Trigger:** Called by `op-cash-flow-review`, `op-monthly-synthesis`.
**Produces:** Income-streams section in cash-flow summary at `vault/wealth/02_briefs/YYYY-MM-cash-flow.md`.

## What It Does

Reads inflow records from cash-flow data and categorizes each by stream type (configurable):
- **W-2 wages** — paychecks from employer (after withholding)
- **Self-employment / 1099** — freelance, contractor, side-business income
- **Rental income** — Schedule E rental property income
- **Investment income** — dividends, interest, capital gains distributions
- **Other** — gifts, refunds, reimbursements, transfers

For each stream:
- Current month total
- Trailing 3-month total
- Trailing 12-month total
- Volatility flag (CV >0.4 over trailing 6 months → "variable")

Streams are kept distinct in output. Commingled totals are not produced — total income exists but is presented after the per-stream breakdown.

## Steps

1. Read all transactions tagged as inflows from `vault/wealth/00_current/` cash-flow records
2. Categorize each by stream type using configured rules (counterparty matching, tags)
3. Compute monthly / 3-month / 12-month totals per stream
4. Compute coefficient of variation per stream over trailing 6 months
5. Format output with one row per stream
6. Return structured data to calling op

## Configuration

`vault/wealth/config.md`:
- `income_stream_rules` — counterparty patterns mapped to stream type
- `volatility_cv_threshold` (default 0.4)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/wealth/00_current/`
- Output structure consumed by: `flow-build-cash-flow-summary`
