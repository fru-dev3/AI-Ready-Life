---
name: arlive-wealth-task-flag-budget-variance
type: task
cadence: monthly
description: >
  Writes a flag to vault/wealth/open-loops.md when an expense category is more than
  20% over budget. Includes category, actual amount, budget, and overage.
---

# arlive-wealth-flag-budget-variance

**Cadence:** Monthly (called by cash flow review op)
**Produces:** Budget variance entries in vault/wealth/open-loops.md

## What it does

Called by `arlive-wealth-build-cash-flow-summary` for each expense category that exceeded its monthly budget by more than 20%. Writes a structured flag to vault/wealth/open-loops.md that includes the category name, actual amount spent, budget target, dollar overage, and percentage overage. Severity is tiered: medium for 20-50% over budget, high for 51-100% over, and critical for more than 100% over budget. Each flag also includes a brief context note when the overage has a likely one-time explanation (e.g., "Healthcare: annual deductible reset in January"). Recurring overages — the same category flagged three or more months in a row — are automatically escalated to high severity to indicate a budget target that needs adjustment.

## Apps

None

## Vault Output

`vault/wealth/open-loops.md`
