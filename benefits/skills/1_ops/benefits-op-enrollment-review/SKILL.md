---
name: aireadylife-benefits-op-enrollment-review
type: op
cadence: annual
description: >
  Annual open enrollment planner that compares medical, dental, vision, FSA/HSA plan options and models
  total annual cost for each scenario to surface the best election. Triggers: "open enrollment",
  "benefits review", "pick my benefits plan".
---

# aireadylife-benefits-enrollment-review

**Cadence:** Annual (October–November, when open enrollment window opens)
**Produces:** Plan comparison table, cost-modeling output, recommended elections written to vault/benefits/04_briefs/

## What it does

Reads the current plan options from vault/benefits/00_plans/ and models total annual cost for each
medical, dental, vision, and FSA/HSA scenario using the user's historical claims data and family
situation. It calculates premiums + expected out-of-pocket spend for each option, then ranks plans
by total cost and coverage quality. Results are written to a dated brief in vault/benefits/04_briefs/
with a recommended election set and a side-by-side comparison table. Calls the enrollment-window
task immediately to record the deadline and surface it in open-loops.

## Configuration

Store current plan documents as PDFs or text files in vault/benefits/00_plans/. Include prior
year's EOB data in the same folder to enable claims-based cost modeling.

## Calls

- **Flows:** `aireadylife-benefits-build-coverage-summary`
- **Tasks:** `aireadylife-benefits-flag-enrollment-window`, `aireadylife-benefits-update-open-loops`

## Apps

None

## Vault Output

`vault/benefits/04_briefs/enrollment-{year}.md`
