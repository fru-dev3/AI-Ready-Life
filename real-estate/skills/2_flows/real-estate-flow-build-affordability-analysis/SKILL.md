---
name: aireadylife-real-estate-flow-build-affordability-analysis
type: flow
trigger: called-by-op
description: >
  Calculates home affordability based on income, debts, down payment savings, and current
  mortgage rates using 28/36 DTI rules.
---

# aireadylife-real-estate-build-affordability-analysis

**Trigger:** Called by `aireadylife-real-estate-affordability-review`
**Produces:** Affordability worksheet with max purchase price, required down payment, and payment breakdown

## What it does

This flow reads the financial profile from the vault and applies standard mortgage underwriting rules
to determine the maximum supportable home purchase price. It calculates gross monthly income from
all sources, sums all existing monthly debt obligations, and tests both the 28% front-end DTI
(PITI payment / gross income) and 36% back-end DTI (all debts / gross income) constraints, using
whichever produces the lower maximum payment. From that maximum PITI it subtracts estimated property
tax and insurance to get the maximum principal and interest, then solves for the purchase price at
the current 30-year fixed rate and a 20% down payment.

## Steps

1. Read income, debts, and down payment savings from `vault/real-estate/02_analysis/`
2. Apply 28% front-end DTI rule: max PITI = gross monthly income x 0.28
3. Apply 36% back-end DTI rule: max PITI = (gross monthly income x 0.36) - existing monthly debts
4. Use the lower of the two as the maximum monthly payment; back-calculate max purchase price at current 30yr fixed rate

## Apps

None

## Vault Output

`vault/real-estate/02_analysis/`
