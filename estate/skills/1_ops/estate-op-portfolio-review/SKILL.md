---
name: arlive-estate-op-portfolio-review
type: op
cadence: quarterly
description: >
  Quarterly portfolio performance review; cap rates, cash-on-cash return, equity
  growth, and hold vs. sell analysis per property. Full financial picture of the
  rental portfolio in one report.
  Triggers: "portfolio review", "property performance", "cap rate", "rental return".
---

# arlive-estate-portfolio-review

**Cadence:** Quarterly (Jan, Apr, Jul, Oct — first week)
**Produces:** A comprehensive portfolio report in `vault/estate/00_properties/` with per-property financials, equity positions, and hold/sell analysis in open loops.

## What it does

Runs every quarter to produce the most complete financial picture of the rental portfolio. For each property, calculates: net operating income (NOI = gross rent minus vacancy loss, insurance, taxes, maintenance), cap rate (NOI ÷ current market value), cash-on-cash return (annual pre-tax cash flow ÷ total cash invested), and equity position (estimated current value minus outstanding mortgage balance). Aggregates across all properties to show total portfolio NOI, blended cap rate, total equity, and total annual cash flow. Runs `arlive-estate-build-portfolio-summary` to gather current property values and tenant data, and `arlive-estate-analyze-cash-flow` for the detailed expense breakdown. For each property, performs a simplified hold vs. sell analysis: if cap rate is below the local market average or equity is high enough to redeploy into a better-performing asset, flags for sell consideration. Also checks for properties where deferred maintenance is materially reducing NOI and models the return on a capital improvement investment. The quarterly review is the strategic read — it tells you whether the portfolio is performing, which properties to keep, and where capital should move next.

## Calls

- **Flows:** `arlive-estate-build-portfolio-summary`, `arlive-estate-analyze-cash-flow`
- **Tasks:** `arlive-estate-update-open-loops`

## Apps

vault file system

## Vault Output

`vault/estate/00_properties/`
