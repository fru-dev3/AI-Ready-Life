---
name: arlive-real-estate-op-market-scan
type: op
cadence: monthly
description: >
  Monthly market scan for target neighborhoods tracking median price, inventory, days on market,
  and price/sqft trends. Triggers: "market scan", "real estate market", "home prices",
  "housing market update".
---

# arlive-real-estate-market-scan

**Cadence:** Monthly (1st of month)
**Produces:** Market trend report for configured target neighborhoods with key metrics and signals

## What it does

This op runs a monthly snapshot of market conditions in each of the user's configured target
neighborhoods. It tracks the four core metrics that signal whether a market is heating up or
cooling: median sale price, active inventory (number of homes for sale), median days on market,
and price per square foot. It compares each metric to the prior month and year-over-year to show
the direction of travel. If inventory is dropping, days-on-market is falling, or prices are
rising faster than baseline, the op flags those signals as potential buy-window indicators and
writes them to open-loops.md.

## Calls

- **Flows:** `arlive-real-estate-scan-market-listings`
- **Tasks:** `arlive-real-estate-update-open-loops`

## Apps

None

## Vault Output

`vault/real-estate/00_markets/`
