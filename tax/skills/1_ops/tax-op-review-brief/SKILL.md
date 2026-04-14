---
name: arlive-tax-op-review-brief
type: op
cadence: monthly
description: >
  Monthly tax review brief. Generates YTD liability, payments made, next deadline,
  and compliance status. Triggers: "tax brief", "tax status", "monthly tax review", "am I behind on taxes".
---

# arlive-tax-review-brief

**Cadence:** Monthly (1st of month)
**Produces:** Tax review brief — YTD liability, payments, deadlines, flags

## What it does

Generates monthly tax review brief: YTD liability estimate, all payments made YTD, next deadline with amount due, entity compliance status, and any open items. Formats as a concise brief with prioritized action items.

## Calls

- **Flows:** `arlive-tax-build-brief`
- **Tasks:** `arlive-tax-update-open-loops`

## Vault Output

`vault/tax/04_briefs/YYYY-MM-tax-brief.md`
