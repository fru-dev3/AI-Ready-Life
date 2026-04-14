---
name: aireadylife-benefits-task-extract-coverage-limit
type: task
description: >
  Reads a specific coverage limit (deductible, OOP max, HSA limit, life insurance face value)
  from vault/benefits/00_plans/ for use by flows. Returns value and plan year.
---

# aireadylife-benefits-extract-coverage-limit

**Trigger:** Called by benefits flows that need a specific limit value during calculations
**Produces:** A single structured value (limit amount + plan year + coverage tier) returned to caller

## What it does

Acts as a precision data-retrieval utility for benefits flows. When a flow needs a specific limit
value — such as the individual deductible for the current plan year, the family OOP maximum, the
IRS HSA contribution limit for self-only coverage, or the life insurance face value — this task
reads vault/benefits/00_plans/ to locate the correct plan document and extracts the requested
field. Returns the value along with the plan year it applies to and the coverage tier (individual
vs family, employee vs employee+spouse vs family), so the calling flow can display and use it with
full context. Supports parameterized lookups: the caller specifies the limit type (e.g.
"deductible", "oop-max", "hsa-limit", "life-face-value", "disability-replacement") and the task
resolves the correct value from the stored plan documents.

## Configuration

Plan documents in vault/benefits/00_plans/ should use consistent naming and contain clearly labeled
limit fields. A structured config.md in vault/benefits/00_plans/ with key limits listed speeds up
lookups and reduces reliance on parsing raw PDFs.

## Apps

None

## Vault Output

`vault/benefits/00_plans/`
