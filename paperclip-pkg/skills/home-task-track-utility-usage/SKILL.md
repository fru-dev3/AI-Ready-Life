---
type: task
trigger: user-or-flow
cadence: monthly
description: >
  Logs monthly utility-bill data (electric, gas, water, internet, trash) with usage
  units (kWh, therms, gallons, Mbps) and amount paid. Computes month-over-month and
  year-over-year deltas; flags usage spikes >25% YoY for the same month. Reads from
  Gmail bill emails when Gmail connector is available. Universal — renters and
  homeowners.
---

# home-track-utility-usage

**Trigger:**
- User input: "log utility bill", "utility usage", "track utilities"
- Called by `op-monthly-sync`, `task-log-expense`

## What It Does

Maintains a per-utility monthly time series. Each entry: month, utility, provider,
usage units, amount, due / paid date.

**Spike detection:** if the same calendar month YoY shows usage >25% higher AND no
known explanation (configurable: heat wave, baby, new appliance, etc.), writes to
open-loops with severity MEDIUM and a "investigate before paying" prompt.

**Amount-vs-usage divergence:** if the bill amount jumped >15% but usage didn't,
flag rate-increase / billing error.

## Steps

1. Read input: utility, provider, month, usage units, amount, due date.
2. If Gmail connector available and no manual input: search Gmail for monthly bill
   email from each configured provider; extract usage + amount.
3. Append entry to `vault/home/00_current/utility-log.md`.
4. Compare YoY same month for usage and amount.
5. Flag spikes per rules above.

## Configuration

`vault/home/config.md`:
- `utility_providers` — list of providers per utility (electric, gas, water, internet,
  trash)
- `utility_spike_threshold_pct` (default 25)
- `utility_amount_threshold_pct` (default 15)

## Vault Paths

- Reads: `vault/home/00_current/utility-log.md`, Gmail (via connector)
- Writes: `vault/home/00_current/utility-log.md`, `vault/home/open-loops.md`
