---
name: aireadylife-tax-flow-build-estimate
type: flow
trigger: called-by-op
description: >
  Projects the current quarter estimated tax payment from YTD income, withholding,
  and prior estimated payments using both safe harbor and actual liability methods.
---

# aireadylife-tax-build-estimate

**Trigger:** Called by `aireadylife-tax-quarterly-estimate`
**Produces:** Estimated tax calculation document in vault/tax/01_estimates/ with payment amount and method used

## What it does

Reads YTD income data from vault/tax/ across all income sources — W-2 withholding reports, 1099 income records, rental income summaries, capital gains/loss records, and business profit/loss — and produces a current-quarter estimated tax calculation. The flow runs two parallel calculations: the safe harbor method (prior year total tax liability divided by four, plus 10% if AGI exceeded $150k) and the actual current-year method (estimated full-year tax minus YTD withholding and prior payments). It returns whichever produces the lower required payment, with the other method shown for reference. The output document states the recommended payment amount, the due date, the calculation basis, and the remaining underpayment risk if no payment is made.

## Steps

1. Sum YTD income from all sources in vault/tax/ (W-2, 1099, rental, capital gains, business)
2. Sum YTD federal and state withholding from pay stubs and prior tax documents
3. Apply prior quarterly estimated payments already made this year
4. Calculate safe harbor payment (prior year liability / 4, or 110% rule if high AGI)
5. Calculate actual-liability payment and return the lower of the two with supporting detail

## Apps

None

## Vault Output

`vault/tax/01_estimates/`
