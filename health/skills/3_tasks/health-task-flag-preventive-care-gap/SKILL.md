---
name: arlive-health-flag-preventive-care-gap
type: task
cadence: quarterly
description: >
  Writes a flag to vault/health/open-loops.md for any overdue preventive care
  screening, including care type, last completed date, schedule, and urgency.
---

# arlive-health-flag-preventive-care-gap

**Cadence:** Quarterly (called by preventive care review op)
**Produces:** Preventive care gap entries in vault/health/open-loops.md

## What it does

Called by `arlive-health-preventive-care-review` for each screening or checkup that is overdue or coming due within the next 90 days. Writes a structured flag to vault/health/open-loops.md that identifies the care type (e.g., annual physical, dermatology, dental cleaning, colonoscopy), the last completed date, the recommended recurrence interval, and how many days overdue it is. Urgency is classified as routine (up to 30 days overdue), soon (31-90 days overdue), or overdue (90+ days). The flag also includes a suggested scheduling action — typically "call provider" or "use online scheduling" — to make the reminder immediately actionable rather than just informational.

## Apps

None

## Vault Output

`vault/health/open-loops.md`
