---
name: arlive-estate-check-maintenance-schedule
type: flow
trigger: called-by-op
description: >
  Reviews all open maintenance items and upcoming seasonal tasks against the
  current date, flagging items overdue or due within 30 days across all properties.
---

# arlive-estate-check-maintenance-schedule

**Trigger:** Called by `arlive-estate-maintenance-review`
**Produces:** A maintenance status list with open items, overdue flags, and upcoming seasonal tasks returned to the calling op.

## What it does

Reads all open maintenance items from `vault/estate/02_maintenance/` and checks each against its target completion date, flagging items that are overdue or due within 30 days. Also checks a built-in seasonal maintenance schedule against the current calendar date to identify recurring preventive tasks due this month. The seasonal schedule covers: HVAC filter replacement (every 90 days per property), gutter cleaning (April and October), furnace/boiler annual inspection (September-October), smoke and CO detector battery check (October), exterior inspection post-winter (April), lawn winterization (October-November), and pest control treatments (spring and fall). For each seasonal task, checks if a completion record exists in the vault for the current season before flagging it. For vendor-dependent items (HVAC service, pest control), checks if a vendor appointment is logged. For overdue open items, determines how many days overdue and escalates urgency accordingly (routine → urgent at 14 days overdue, urgent → emergency at 3 days overdue). Returns the full maintenance status list, categorized by property and urgency, to the calling op.

## Steps

1. Read all open maintenance items from `vault/estate/02_maintenance/` for each property
2. Check each item's target completion date and flag overdue (>target date) and due-soon (≤30 days)
3. Evaluate seasonal maintenance schedule against current calendar month
4. Check vault for completion records for each seasonal task in the current season
5. Flag seasonal tasks with no completion record for the current season
6. Escalate urgency for items overdue beyond threshold (14 days → urgent, 3 days → emergency)
7. Return categorized maintenance status list, grouped by property

## Apps

vault file system

## Vault Output

`vault/estate/02_maintenance/`
