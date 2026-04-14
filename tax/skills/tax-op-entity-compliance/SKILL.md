---
name: aireadylife-tax-op-entity-compliance
type: op
cadence: quarterly
description: >
  Quarterly entity compliance check; reviews LLC and S-Corp filing requirements,
  state deadlines, and registered agent status for all active business entities.
  Triggers: "entity compliance check", "LLC filing due", "state tax deadlines".
---

# aireadylife-tax-entity-compliance

**Cadence:** Quarterly (1st of Jan, Apr, Jul, Oct)
**Produces:** Compliance checklist status in vault/tax/02_deadlines/, entity flags in vault/tax/open-loops.md

## What it does

Runs quarterly to ensure all active business entities remain in good standing without surprises at filing time. It calls `aireadylife-tax-document-completeness` to verify that all entity-level tax obligations are tracked: annual report filings with the state, franchise tax payments, registered agent renewal dates, S-Corp election maintenance (reasonable salary, payroll tax deposits), and any state-specific LLC taxes. Each entity is checked against its jurisdiction's upcoming deadlines for the next 90 days. Missing filings, approaching deadlines, or documentation gaps are flagged via `aireadylife-tax-update-open-loops`. The quarterly cadence catches issues that appear only a few times per year — like annual report windows — before they become late fees or administrative dissolution risks.

## Calls

- **Flows:** `aireadylife-tax-document-completeness`
- **Tasks:** `aireadylife-tax-update-open-loops`

## Apps

None

## Vault Output

`vault/tax/02_deadlines/`
