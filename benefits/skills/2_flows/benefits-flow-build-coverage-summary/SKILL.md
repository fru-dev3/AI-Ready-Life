---
name: aireadylife-benefits-flow-build-coverage-summary
type: flow
trigger: called-by-op
description: >
  Compiles a full summary of all active employer benefits: medical plan, deductible progress,
  OOP max, HSA, 401k match, life insurance face value, and disability coverage.
---

# aireadylife-benefits-build-coverage-summary

**Trigger:** Called by `aireadylife-benefits-enrollment-review`, `aireadylife-benefits-coverage-review`, `aireadylife-benefits-review-brief`
**Produces:** Structured coverage table with current values, limits, and YTD progress for all active benefits

## What it does

Reads benefit elections from vault/benefits/00_plans/ to extract plan names, deductible amounts,
out-of-pocket maximums, and coverage tiers for medical, dental, and vision. Pulls YTD deductible
and OOP spend from claim records in vault/benefits/ to show how much of each limit has been used.
Looks up 401k match rate and YTD employee/employer contributions from vault/benefits/01_401k/.
Reads HSA contribution pace and balance from vault/benefits/02_hsa/. Extracts life insurance face
value and disability income replacement percentage from plan documents. Formats the result as a
clean coverage table that calling ops can embed in briefs or use for gap analysis.

## Configuration

Requires current plan documents stored in vault/benefits/00_plans/. YTD claim data and EOBs
should be filed in vault/benefits/ with standardized naming so the flow can locate them.

## Steps

1. Read benefit elections from vault/benefits/00_plans/
2. Pull deductible and OOP YTD totals from vault/benefits/ claim records
3. Check 401k match rate and YTD employee and employer contribution amounts
4. Verify HSA contribution pace vs IRS annual limit and current balance
5. Format all values into a coverage table with remaining room for deductible, OOP, and HSA

## Apps

None

## Vault Output

`vault/benefits/00_plans/`
