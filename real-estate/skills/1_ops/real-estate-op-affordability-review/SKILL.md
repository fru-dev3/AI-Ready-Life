---
name: arlive-real-estate-op-affordability-review
type: op
cadence: on-demand
description: >
  On-demand affordability analysis that calculates max purchase price, monthly payment, and 20%
  down required given current income, debts, and interest rates. Triggers: "can I afford",
  "affordability", "how much house can I buy", "buy vs rent".
---

# arlive-real-estate-affordability-review

**Cadence:** On-demand (when evaluating a purchase or rate change)
**Produces:** Affordability analysis with max purchase price, payment breakdown, and buy vs. rent comparison

## What it does

This op calculates home-buying power based on the current financial snapshot in the vault and the
current 30-year fixed mortgage rate. It applies both the 28% front-end DTI rule (housing costs
should not exceed 28% of gross monthly income) and the 36% back-end DTI rule (total debt payments
should not exceed 36%) to determine the maximum supportable monthly payment. From that payment it
back-calculates the maximum purchase price at the current rate, and shows how much the 20% down
payment would be. It also runs the buy vs. rent comparison to show whether buying or renting
makes more financial sense at the current price point.

## Calls

- **Flows:** `arlive-real-estate-build-affordability-analysis`
- **Tasks:** `arlive-real-estate-run-buy-vs-rent`, `arlive-real-estate-update-open-loops`

## Apps

None

## Vault Output

`vault/real-estate/02_analysis/`
