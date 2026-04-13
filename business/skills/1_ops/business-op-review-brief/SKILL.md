---
name: arlive-business-review-brief
type: op
cadence: monthly
description: >
  Monthly business brief. Pulls revenue, expenses, P&L, compliance status, and open items.
  Triggers: "business brief", "LLC update", "P&L summary", "business status", "revenue this month".
---

# arlive-business-review-brief

**Cadence:** Monthly (1st of month)
**Produces:** Business brief — revenue, expenses, P&L, compliance status, open items

## What it does

Reads the business vault state, computes current month and YTD P&L, reviews compliance calendar for upcoming deadlines, checks active contract milestones, and surfaces open items. Produces a concise monthly business brief.

## Calls

- **Tasks:** reads vault/business/state.md or vault-demo/business/state.md

## Vault Output

`vault/business/01_revenue/brief-YYYY-MM.md`
