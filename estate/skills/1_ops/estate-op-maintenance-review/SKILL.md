---
name: arlive-estate-maintenance-review
type: op
cadence: monthly
description: >
  Monthly maintenance review across all rental properties; checks open maintenance
  items, upcoming seasonal tasks, vendor follow-ups, and warranty expirations.
  Flags items overdue or due within 30 days.
  Triggers: "maintenance review", "property maintenance", "what needs fixing".
---

# arlive-estate-maintenance-review

**Cadence:** Monthly (1st of month)
**Produces:** A maintenance status report in `vault/estate/02_maintenance/` with open items, upcoming seasonal tasks, and flagged issues in open loops.

## What it does

Reviews the complete maintenance picture across all rental properties on a monthly basis. Reads open maintenance items from `vault/estate/02_maintenance/` and categorizes them by status (new, in-progress, awaiting vendor, completed). Checks the seasonal maintenance calendar against the current date — HVAC filter changes (every 90 days), gutter cleaning (spring/fall), furnace inspection (October), exterior painting windows (spring), winterization tasks (November) — and flags any seasonal item due within the next 30 days. Scans vendor follow-up notes for any pending quotes, scheduled visits, or warranty claims that have been open longer than 14 days without resolution. Checks appliance and HVAC warranty records for any items expiring within 90 days. Calls `arlive-estate-flag-maintenance-item` for any newly discovered issue or overdue item. Produces a per-property maintenance summary so each property's health status is visible at a glance, helping prioritize which properties need the most attention this month.

## Calls

- **Flows:** `arlive-estate-check-maintenance-schedule`
- **Tasks:** `arlive-estate-flag-maintenance-item`, `arlive-estate-update-open-loops`

## Apps

vault file system

## Vault Output

`vault/estate/02_maintenance/`
