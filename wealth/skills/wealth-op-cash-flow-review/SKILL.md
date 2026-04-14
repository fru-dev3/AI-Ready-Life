---
name: aireadylife-wealth-op-cash-flow-review
type: op
cadence: monthly
description: >
  Monthly income vs expense review; compares actual spending to budget by category,
  flags variances, and projects month-end cash position. Triggers: "cash flow review",
  "check my spending", "am I over budget".
---

# aireadylife-wealth-cash-flow-review

**Cadence:** Monthly (1st of month)
**Produces:** Cash flow summary in vault/wealth/03_cashflow/, budget variance flags in vault/wealth/open-loops.md

## What it does

Aggregates income and expense data for the prior month and compares each expense category to its budget target. It calls `aireadylife-wealth-build-cash-flow-summary` to produce the full income-minus-expenses picture, then passes any category more than 20% over budget to `aireadylife-wealth-flag-budget-variance` for logging. The review includes all income sources — salary, rental income, side income, dividends — and organizes expenses into standard categories (housing, transportation, food, healthcare, entertainment, savings contributions). A month-end projection is included when the review runs mid-month, using average daily spend rates for variable categories. Results feed into the monthly brief.

## Calls

- **Flows:** `aireadylife-wealth-build-cash-flow-summary`
- **Tasks:** `aireadylife-wealth-flag-budget-variance`, `aireadylife-wealth-update-open-loops`

## Apps

None

## Vault Output

`vault/wealth/03_cashflow/`
