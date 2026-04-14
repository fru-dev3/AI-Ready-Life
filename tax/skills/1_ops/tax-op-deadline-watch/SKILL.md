---
name: arlive-tax-op-deadline-watch
type: op
cadence: monthly
description: >
  Monthly tax deadline monitor. Flags obligations due within 30 days with amounts and
  action steps. Triggers: "check tax deadlines", "upcoming tax dates", "what tax is due".
---

# arlive-tax-deadline-watch

**Cadence:** Monthly (1st of month)
**Produces:** Deadline alert list — all tax obligations due within 30 days

## What it does

Monitors all tax deadlines for federal, state, and entity filings. Flags items due within 30 days with estimated payment amounts and specific action steps.

## Calls

- **Flows:** `arlive-tax-track-deadlines`, `arlive-tax-flag-deadlines`
- **Tasks:** `arlive-tax-collect-deadlines`, `arlive-tax-flag-deadline`, `arlive-tax-update-open-loops`

## Apps

`gcalendar` (optional)

## Vault Output

`vault/tax/00_current/open-loops.md`
