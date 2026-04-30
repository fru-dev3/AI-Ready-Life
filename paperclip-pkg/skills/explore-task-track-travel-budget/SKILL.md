---
type: task
trigger: user-or-flow
description: >
  Tracks per-trip budget vs. actual spend across categories (flights, lodging, food, activities,
  ground transport, insurance, other). Cross-domain with wealth — total trip cost feeds
  cash-flow review.
---

# explore-track-travel-budget

**Trigger:**
- User input: "log trip expense", "update travel budget", "how much did {trip} cost?"
- Called by: `flow-build-trip-summary` (read), `op-monthly-sync` (read), `flow-trip-pattern-analysis` (read)

## What It Does

Maintains a budget ledger inside each trip record so the user can see at any time whether a trip is on track financially and, after the trip, what each category actually cost vs. estimate.

**Budget ledger per trip (lives inside the trip file under `## Budget` and `## Expenses`):**
- Estimated row per category (set by `task-log-trip` at creation)
- Actual rows: each expense is `{date, category, amount, currency, vendor, notes}`
- Running totals per category and trip total
- Variance per category: `actual - estimated`, plus % delta
- Flag thresholds: 🟡 when category exceeds estimate by 15%, 🔴 by 30%

**Categories (universal):** flights, lodging, ground_transport, food, activities, travel_insurance, gear, fees_visas, other.

**Currency handling:** Each expense stores its native currency and an FX-converted USD amount captured at expense time. Trip totals are reported in USD by default (configurable).

**Wealth handoff:** When a trip is closed (return date passed and trip is moved to `01_prior/`), this task emits a single summary line that the wealth plugin's `op-cash-flow-review` reads to attribute the spend without double-counting individual transactions.

**Pattern feed:** `flow-trip-pattern-analysis` reads completed-trip ledgers to compute average cost per trip, cost per day, and category split over time.

## Steps

1. Receive expense entry: trip identifier, date, category, amount, currency, vendor
2. Locate trip file in `00_current/` or `01_prior/`
3. Append expense row to `## Expenses`
4. Recompute category and trip totals
5. Check variance thresholds; if breached call `task-update-open-loops`
6. Write updated trip file
7. Return current trip total and remaining budget

## Configuration

`vault/explore/config.md`:
- `default_currency` (default USD)
- `budget_overrun_warn_pct` (default 15)
- `budget_overrun_alert_pct` (default 30)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/explore/00_current/{trip-file}.md`, `~/Documents/aireadylife/vault/explore/01_prior/`
- Writes: trip file, `~/Documents/aireadylife/vault/explore/open-loops.md`
