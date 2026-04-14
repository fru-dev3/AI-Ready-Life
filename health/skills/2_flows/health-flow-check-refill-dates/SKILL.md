---
name: aireadylife-health-flow-check-refill-dates
type: flow
trigger: called-by-op
description: >
  Scans the active medication list and compares each refill date to today, flagging
  any prescription due within 30 days with pharmacy and estimated cost.
---

# aireadylife-health-check-refill-dates

**Trigger:** Called by `aireadylife-health-medication-review`
**Produces:** List of medications due for refill within 30 days, passed to `aireadylife-health-flag-upcoming-refill`

## What it does

Reads the active medication list from vault/health/02_medications/ — which stores each prescription's name, dosage, fill date, days supply, pharmacy, and estimated cost — and calculates the projected refill date for each entry. Each refill date is compared to today's date, and any medication whose refill window opens within 30 days is flagged. The flow accounts for 7-day early fill windows common with 90-day supplies, so a medication technically due in 35 days but fillable in 5 days is still surfaced. The output is a structured list consumed by `aireadylife-health-flag-upcoming-refill` to write reminders to open-loops.md.

## Steps

1. Read active medication list from vault/health/02_medications/
2. Calculate projected refill date for each entry (fill date + days supply)
3. Subtract early-fill buffer (7 days for 90-day supplies, 3 days for 30-day supplies)
4. Flag medications whose refill window opens within 30 days
5. Include pharmacy name, estimated cost, and HSA eligibility for each flagged item

## Apps

None

## Vault Output

`vault/health/02_medications/`
