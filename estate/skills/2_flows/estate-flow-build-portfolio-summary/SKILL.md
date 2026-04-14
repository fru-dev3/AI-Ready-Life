---
name: arlive-estate-flow-build-portfolio-summary
type: flow
trigger: called-by-op
description: >
  Generates a portfolio snapshot: all properties with address, purchase price,
  current value, equity, monthly cash flow, and cap rate. Called by portfolio
  and tenant review ops.
---

# arlive-estate-build-portfolio-summary

**Trigger:** Called by `arlive-estate-portfolio-review`, `arlive-estate-tenant-review`
**Produces:** A structured portfolio snapshot with per-property financials and a portfolio-level summary returned to the calling op.

## What it does

Reads all property records from `vault/estate/00_properties/` to assemble a complete portfolio snapshot. For each property, extracts: address, purchase date, purchase price, current estimated market value (from most recent appraisal or market comp logged in vault), outstanding mortgage balance, current monthly rent, and occupancy status. Reads tenant data from `vault/estate/01_tenants/` to get current lease terms and payment status per property. Reads the most recent cash flow summary from `vault/estate/03_cashflow/` to get actual (not estimated) net monthly income per property. Calculates equity (current value minus mortgage balance), cap rate (annualized NOI ÷ current value), and cash-on-cash return (annual cash flow ÷ total cash invested) for each property. Builds a summary table with all properties side-by-side for easy comparison, then calculates portfolio-level totals: total equity across all properties, total monthly cash flow, blended cap rate, and total units managed. Returns the full snapshot to the calling op.

## Steps

1. Read all property records from `vault/estate/00_properties/` (address, purchase price, current value, mortgage balance)
2. Read tenant records from `vault/estate/01_tenants/` to get current rent and occupancy per property
3. Read recent cash flow data from `vault/estate/03_cashflow/` for actual net income per property
4. Calculate equity, cap rate, and cash-on-cash return per property
5. Build a side-by-side comparison table for all properties
6. Calculate portfolio-level totals (total equity, monthly cash flow, blended cap rate)

## Apps

vault file system

## Vault Output

`vault/estate/00_properties/`
