---
name: aireadylife-estate-op-cash-flow-review
type: op
cadence: monthly
description: >
  Monthly cash flow review. Computes NOI and net cash flow per property after debt service.
  Triggers: "cash flow review", "rental income", "NOI", "property cash flow".
---

# aireadylife-estate-cash-flow-review

**Cadence:** Monthly (after rent collection — 5th of month)
**Produces:** Cash flow report — gross rent, expenses, NOI, net cash flow per property

## What it does

Calculates monthly cash flow for each property: gross rent collected, operating expenses (maintenance, management fees, insurance, property tax accrual), net operating income (NOI), debt service (PITI), and net cash flow after debt service. Flags any properties with negative cash flow. Updates the portfolio cash flow tracker.

## Configuration

Uses rent and expense data from `vault/estate/cashflow/`. Mortgage PITI pulled from `vault/estate/properties/`. In demo mode, reads from `vault-demo/estate/state.md`.

## Calls

- **Flows:** `aireadylife-estate-compute-noi`, `aireadylife-estate-update-cashflow-tracker`

## Vault Output

`vault/estate/01_cashflow/YYYY-MM-cashflow.md`
