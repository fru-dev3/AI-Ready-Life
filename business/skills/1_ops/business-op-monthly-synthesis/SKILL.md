---
name: aireadylife-business-op-monthly-synthesis
type: op
cadence: monthly
description: >
  Monthly business synthesis. Aggregates revenue and expenses into a full P&L and checks the compliance calendar.
  Triggers: "monthly P&L", "business synthesis", "revenue and expenses", "net income this month".
---

# aireadylife-business-monthly-synthesis

**Cadence:** Monthly (end of month)
**Produces:** Monthly P&L report with compliance calendar check

## What it does

Aggregates all revenue by stream and all expenses by category for the month. Computes gross revenue, total expenses, and net income. Compares to prior month. Checks compliance calendar for any deadlines in the next 30 days. Flags: estimated tax set-aside adequacy and any overdue compliance items.

## Vault Output

`vault/business/01_revenue/pl-YYYY-MM.md`
