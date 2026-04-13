---
name: arlive-realestate-monthly-sync
type: op
cadence: monthly
description: >
  Full real estate data sync on the 1st of each month. Pulls market data for all
  target markets, updates affordability analysis with current rates, and recalculates
  buy vs. rent models.
  Triggers: "real estate monthly sync", "sync market data", "refresh real estate vault".
---

# arlive-realestate-monthly-sync

**Cadence:** Monthly (1st of month)
**Produces:** Real estate vault refreshed with current market data and updated analysis

## What it does

Full market data sync: pulls latest median prices, mortgage rates, rental comps, cap rates, and vacancy rates for all configured target markets. Recalculates buy vs. rent model for primary residence market at current rates. Updates break-even horizon analysis. Flags any markets where conditions have crossed acquisition thresholds. Ends by triggering Real Estate Review Brief.

## Configuration

Set your target markets and data sources in `vault/real-estate/config.md`. Supports Zillow, Redfin, and Realtor.com data via web research.

## Calls

- **Flows:** `arlive-realestate-pull-market-data`, `arlive-realestate-update-affordability-model`, `arlive-realestate-check-acquisition-thresholds`
- **Then triggers:** `arlive-realestate-review-brief`

## Apps

`brave-search` (market data research), `gdrive` (optional)

## Vault Output

`vault/real-estate/01_market/` (all target markets refreshed)
