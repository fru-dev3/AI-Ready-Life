---
type: task
trigger: user-or-flow
cadence: monthly
description: >
  OWNER-ONLY. Logs monthly mortgage payment, splits principal vs. interest vs. escrow,
  updates outstanding balance and equity, and flags refinance opportunity when current
  rate drops 0.75%+ below loan rate (configurable). Computes recast vs. refi math when
  user has lump sum to apply. Auto-skips if home_type is "rent".
---

# home-track-mortgage

**Owner-only.** If `home_type` in config is "rent", this skill exits with:
"Mortgage tracking applies to homeowners. Skipping — your config shows you rent."

**Trigger:**
- User input: "log mortgage payment", "track mortgage"
- Called by `op-monthly-sync`

## What It Does

Maintains the monthly mortgage time series and surfaces equity build + refi
opportunity.

**Per payment:**
- Date, amount paid, principal, interest, escrow (taxes + insurance), late fee if any.
- New outstanding balance after payment.
- Cumulative interest YTD.

**Equity calculation:**
- Equity = current home value − outstanding balance.
- Tracks home value from `home_current_value` config (manual update or read from
  `op-monthly-sync` Zestimate refresh).

**Refi flag:**
- If `current_market_30y_rate` (manually updated or pulled via configured source) is
  ≥0.75% below loan rate and remaining term >7 years, write a HIGH-severity refi
  opportunity to open-loops with break-even calculation: months to recoup closing
  costs at the rate-difference savings.

**PMI removal flag:**
- If equity ≥20% of original purchase price and PMI is still being paid, surface as
  immediate action.

## Steps

1. Confirm `home_type` is "own"; otherwise exit.
2. Read input: payment date and amount (P&I + escrow split if available).
3. Append entry to `vault/home/00_current/mortgage-log.md`.
4. Recompute outstanding balance + equity.
5. Evaluate refi opportunity and PMI removal eligibility.
6. Flag opportunities to open-loops.

## Configuration

`vault/home/config.md`:
- `home_type` (must be "own")
- `mortgage_loan_amount`, `mortgage_rate`, `mortgage_term_years`, `mortgage_origination_date`
- `home_current_value`
- `pmi_active` (true / false)
- `refi_savings_threshold_pct` (default 0.75)
- `current_market_30y_rate` (manual update)

## Vault Paths

- Reads: `vault/home/config.md`, `vault/home/00_current/mortgage-log.md`
- Writes: `vault/home/00_current/mortgage-log.md`, `vault/home/open-loops.md`
