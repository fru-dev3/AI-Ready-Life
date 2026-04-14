---
name: arlive-home-task-flag-maintenance-item
type: task
description: >
  Writes a maintenance flag to vault/home/open-loops.md with item description, location, urgency,
  last serviced date, vendor, estimated cost, and target completion date.
---

# arlive-home-flag-maintenance-item

**Trigger:** Called by home maintenance flows
**Produces:** Maintenance flag entry in `vault/home/open-loops.md`

## What it does

This task writes a structured maintenance flag whenever a task is identified as overdue or due within
the current season. Each flag captures the full context needed to act: the task description and
location in the home (e.g., "HVAC filter replacement - main unit, basement"), urgency level, the date
it was last serviced, the assigned vendor with contact info if one exists, estimated cost to complete,
and a target completion date. Flags remain in open-loops.md until the maintenance record is updated
to reflect the work was done, at which point they are resolved on the next op run.

## Apps

None

## Vault Output

`vault/home/open-loops.md`
