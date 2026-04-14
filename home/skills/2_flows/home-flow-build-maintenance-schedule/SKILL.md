---
name: arlive-home-flow-build-maintenance-schedule
type: flow
trigger: called-by-op
description: >
  Generates the seasonal maintenance checklist with task name, frequency, last done date, next due
  date, assigned vendor, and estimated cost.
---

# arlive-home-build-maintenance-schedule

**Trigger:** Called by `arlive-home-seasonal-maintenance`
**Produces:** Structured maintenance schedule table sorted by urgency and due date

## What it does

This flow builds the seasonal maintenance schedule by joining two vault sources: the maintenance
history (when each task was last completed and by whom) and the seasonal task schedule (which tasks
belong to which season and at what frequency). It calculates each task's next due date from the last
completed date and frequency, then filters to tasks due this season or already overdue. The output
is a sortable table with urgency flag, task name, location in home, last-done date, next-due date,
assigned vendor (if any), and estimated cost.

## Steps

1. Read maintenance records from `vault/home/00_maintenance/`
2. Load seasonal task schedule from `vault/home/02_seasonal/`
3. Calculate each task's next due date based on last-done date and frequency
4. Flag anything overdue or due within 30 days with appropriate urgency level

## Apps

None

## Vault Output

`vault/home/00_maintenance/`
