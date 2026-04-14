---
name: arlive-business-flow-build-pl-summary
type: flow
trigger: called-by-op
description: >
  Builds a monthly P&L summary: revenue by client/source, expense categories, net profit, margin,
  and comparison to prior month.
---

# arlive-business-build-pl-summary

**Trigger:** Called by `arlive-business-pl-review`
**Produces:** Structured P&L table with revenue breakdown, expense categories, net profit, margin, and MoM delta

## What it does

Reads all invoice records for the current month from vault/business/01_invoices/ and groups revenue
by client and service type to produce a revenue breakdown. Reads all expense records for the same
period from vault/business/02_expenses/ and groups by expense category (software, contractors,
marketing, equipment, professional services, other). Sums gross revenue and total expenses to
calculate net profit, then divides to get profit margin percentage. Loads the prior month's P&L
data (either from a prior brief or from the prior month's raw records) to generate MoM comparison
figures — dollar change and percentage change for revenue, expenses, and net profit. Formats the
result as a two-section table (revenue then expenses) with a summary row showing net profit and
margin, plus a delta column throughout. Returns the formatted P&L table to the calling op.

## Configuration

Invoice records in vault/business/01_invoices/ and expense records in vault/business/02_expenses/
should use consistent fields: date, amount, client/vendor, category, status. Prior month files
must use a consistent naming convention so MoM comparison can locate them automatically.

## Steps

1. Read invoices from vault/business/01_invoices/ for current month; group by client and service type
2. Read expenses from vault/business/02_expenses/ for current month; group by expense category
3. Calculate gross revenue, total expenses, net profit, and profit margin
4. Load prior month figures for MoM comparison
5. Format as structured P&L table with revenue section, expense section, summary row, and delta column

## Apps

None

## Vault Output

`vault/business/01_invoices/`, `vault/business/02_expenses/`
