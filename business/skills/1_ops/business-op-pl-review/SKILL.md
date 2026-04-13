---
name: arlive-business-pl-review
type: op
cadence: monthly
description: >
  Monthly P&L review that compares revenue vs expenses, calculates net profit margin, and flags
  variances vs prior month and budget. Triggers: "P&L review", "profit and loss", "business
  financials", "how is my business doing".
---

# arlive-business-pl-review

**Cadence:** Monthly (1st of month)
**Produces:** Monthly P&L brief, variance analysis, overdue invoice flags, updated open-loops entries

## What it does

Reads all invoices for the current month from vault/business/01_invoices/ and all expense records
from vault/business/02_expenses/ to build a complete P&L statement. Calculates gross revenue,
total expenses by category, net profit, and profit margin percentage. Compares each figure to the
prior month to surface MoM variances — both dollar and percentage changes. If the user has set a
monthly budget in vault/business/, compares actuals to budget and flags any category that is
over by more than 10%. Calls the flag-overdue-invoice task to check whether any invoices are
unpaid past 30 days and write urgent flags. Writes a dated P&L brief to vault/business/04_briefs/
and pushes all action items (overdue invoices, expense anomalies, revenue shortfalls) to
vault/business/open-loops.md.

## Configuration

Store invoices in vault/business/01_invoices/ and expense records in vault/business/02_expenses/
using consistent monthly naming. Optionally maintain a budget file in vault/business/ with
monthly revenue and expense targets for variance analysis.

## Calls

- **Flows:** `arlive-business-build-pl-summary`
- **Tasks:** `arlive-business-flag-overdue-invoice`, `arlive-business-update-open-loops`

## Apps

None

## Vault Output

`vault/business/04_briefs/pl-{month}-{year}.md`
