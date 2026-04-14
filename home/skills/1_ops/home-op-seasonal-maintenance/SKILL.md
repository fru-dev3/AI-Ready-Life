---
name: arlive-home-op-seasonal-maintenance
type: op
cadence: quarterly
description: >
  Quarterly seasonal maintenance planner that generates a checklist of seasonal tasks (spring HVAC,
  fall gutter, winter weatherizing) with vendors and estimated costs. Triggers: "seasonal maintenance",
  "home maintenance", "maintenance checklist", "spring maintenance".
---

# arlive-home-seasonal-maintenance

**Cadence:** Quarterly (Mar, Jun, Sep, Dec)
**Produces:** Seasonal maintenance checklist with due dates, vendors, and estimated costs

## What it does

This op runs at the start of each season to generate a prioritized maintenance checklist tailored to
the current season and the home's specific maintenance history. It reads past service records to
calculate what's overdue, what's coming due this season, and what vendors have been used for each
task. The checklist includes estimated costs so you can budget ahead of scheduling. Any task that is
already overdue is flagged with elevated urgency and written to open-loops.md so it stays visible
until completed.

## Calls

- **Flows:** `arlive-home-build-maintenance-schedule`
- **Tasks:** `arlive-home-flag-maintenance-item`, `arlive-home-update-open-loops`

## Apps

None

## Vault Output

`vault/home/00_maintenance/`
