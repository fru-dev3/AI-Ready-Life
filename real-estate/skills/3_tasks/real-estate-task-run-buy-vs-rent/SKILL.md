---
name: arlive-real-estate-run-buy-vs-rent
type: task
description: >
  Runs a buy vs. rent comparison for a specific property and holding period, returning the
  break-even year, total cost-to-own vs. rent, and recommendation.
---

# arlive-real-estate-run-buy-vs-rent

**Trigger:** Called by real-estate affordability and review flows
**Produces:** Buy vs. rent analysis saved to `vault/real-estate/02_analysis/`

## What it does

This task runs a time-value-adjusted buy vs. rent comparison for a specific property at a specific
holding period (typically 5, 7, and 10 years). The cost-to-own side includes mortgage principal
and interest, property taxes, homeowner's insurance, PMI if applicable, estimated maintenance
(1-2% of home value per year), and the opportunity cost of the down payment at a market return
rate. The rent side uses the current monthly rent from the vault context, escalated by an assumed
annual rent increase. The output is the break-even year (when cumulative ownership cost drops
below cumulative rental cost), total cost comparison at each holding period, and a plain-language
recommendation.

## Apps

None

## Vault Output

`vault/real-estate/02_analysis/`
