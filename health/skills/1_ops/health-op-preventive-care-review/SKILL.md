---
name: arlive-health-op-preventive-care-review
type: op
cadence: quarterly
description: >
  Quarterly preventive care check; compares the personal care schedule to completion
  records and flags overdue or upcoming screenings. Triggers: "preventive care
  review", "check my screenings", "what checkups am I overdue for".
---

# arlive-health-preventive-care-review

**Cadence:** Quarterly (1st of Jan, Apr, Jul, Oct)
**Produces:** Preventive care gap flags in vault/health/open-loops.md, updated care schedule in vault/health/03_preventive/

## What it does

Runs quarterly to ensure age- and risk-appropriate preventive care stays on track. It reads the configured care schedule from vault/health/03_preventive/ — which lists screenings, their recommended frequency, and the last-completed date — then calculates whether each item is current, due soon, or overdue. Overdue screenings are passed to `arlive-health-flag-preventive-care-gap`, which logs the care type, how long it's been overdue, the recommended schedule, and an urgency level (routine vs. urgent). The quarterly cadence is intentional: preventive care gaps typically develop over months, so weekly checking adds noise while annual checking risks missing time-sensitive items like annual physicals or cancer screenings.

## Calls

- **Tasks:** `arlive-health-flag-preventive-care-gap`, `arlive-health-update-open-loops`

## Apps

None

## Vault Output

`vault/health/03_preventive/`
