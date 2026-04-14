---
name: arlive-estate-flow-analyze-cash-flow
type: flow
trigger: called-by-op
description: >
  Detailed cash flow analysis per property: rent income vs. mortgage, insurance,
  taxes, and maintenance expenses. Calculates net monthly cash flow, NOI, and
  flags properties with negative or declining cash flow.
---

# arlive-estate-analyze-cash-flow

**Trigger:** Called by `arlive-estate-cash-flow-review`, `arlive-estate-portfolio-review`
**Produces:** A per-property and portfolio-level cash flow breakdown with NOI, expense ratios, and anomaly flags returned to the calling op.

## What it does

Produces the detailed income statement for each rental property by reading all income and expense data from `vault/estate/03_cashflow/`. Income side: reads monthly rent collected, late fees collected, and any other income (laundry, parking, storage). Flags months where collected rent was less than scheduled rent (indicating late payment, vacancy, or partial payment). Expense side: reads fixed monthly expenses (mortgage P&I, property insurance premium, property taxes prorated monthly, HOA fees if applicable) and variable expenses (maintenance and repair costs, property management fees, landscaping, pest control, utilities paid by owner). Calculates gross rent, effective gross income (after vacancy loss), total operating expenses, net operating income (NOI), debt service coverage ratio (NOI ÷ annual debt service), and net cash flow after debt service. Flags properties where net cash flow is negative or has declined more than 15% quarter-over-quarter. Also calculates expense ratio (total expenses ÷ gross rent) as a health indicator — ratios above 50% warrant investigation. Returns the full analysis to the calling op.

## Steps

1. Read rent income records (collected vs. scheduled) from `vault/estate/03_cashflow/`
2. Read fixed expense records (mortgage, insurance, taxes, HOA) per property
3. Read variable expense records (maintenance, management, landscaping) per property
4. Calculate gross rent, effective gross income, and total operating expenses per property
5. Calculate NOI, debt service coverage ratio, and net cash flow per property
6. Flag properties with negative cash flow or >15% QoQ cash flow decline
7. Calculate expense ratios and flag any property above 50%

## Apps

vault file system

## Vault Output

`vault/estate/03_cashflow/`
