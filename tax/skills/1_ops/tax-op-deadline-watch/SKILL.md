---
name: aireadylife-tax-op-deadline-watch
type: op
cadence: monthly
description: >
  Monthly tax deadline monitor. Flags obligations due within 30 days with amounts and
  action steps. Triggers: "check tax deadlines", "upcoming tax dates", "what tax is due".
---

# aireadylife-tax-deadline-watch

**Cadence:** Monthly (1st of month)
**Produces:** Deadline alert list — all tax obligations due within 30 days

## What it does

Monitors all tax deadlines for federal, state, and entity filings. Flags items due within 30 days with estimated payment amounts and specific action steps.

## Calls

- **Flows:** `aireadylife-tax-track-deadlines`, `aireadylife-tax-flag-deadlines`
- **Tasks:** `aireadylife-tax-collect-deadlines`, `aireadylife-tax-flag-deadline`, `aireadylife-tax-update-open-loops`

## Apps

`gcalendar` (optional)

## Vault Output

`vault/tax/00_current/open-loops.md`
