---
name: aireadylife-health-op-medication-review
type: op
cadence: monthly
description: >
  Monthly medication review; checks upcoming refill dates, dosage changes, and
  HSA reimbursement eligibility for all active medications. Triggers: "medication
  review", "check my refills", "monthly med check".
---

# aireadylife-health-medication-review

**Cadence:** Monthly (1st of month)
**Produces:** Refill reminders in vault/health/open-loops.md, updated medication records in vault/health/02_medications/

## What it does

Runs on the first of each month to ensure no prescription lapses between reviews. It reads the active medication list from vault/health/02_medications/ and calls `aireadylife-health-check-refill-dates` to calculate how many days remain until each prescription needs to be refilled. Any medication due within 30 days triggers `aireadylife-health-flag-upcoming-refill`, which logs the medication name, pharmacy, estimated refill date, and approximate cost. The op also checks each medication against the IRS HSA-eligible expense list and flags any that haven't been submitted for reimbursement, ensuring no tax-advantaged spending is left on the table. All flags are consolidated into open-loops.md via `aireadylife-health-update-open-loops`.

## Calls

- **Flows:** `aireadylife-health-check-refill-dates`
- **Tasks:** `aireadylife-health-flag-upcoming-refill`, `aireadylife-health-update-open-loops`

## Apps

None

## Vault Output

`vault/health/02_medications/`
