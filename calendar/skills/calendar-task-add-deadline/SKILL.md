---
name: aireadylife-calendar-task-add-deadline
type: task
cadence: as-received
description: >
  Records a new deadline to vault/calendar/00_deadlines/ with item description,
  due date, domain, effort estimate, priority, and linked open loop. Called whenever
  a new deadline is identified during any op run or directly on-demand.
---

# aireadylife-calendar-add-deadline

**Cadence:** As-received (triggered whenever a new deadline is identified)
**Produces:** A new deadline record file in `vault/calendar/00_deadlines/`.

## What it does

Creates a structured deadline record in `vault/calendar/00_deadlines/` for any new time-bound commitment identified across any domain. The record includes: item name, full description of what needs to be done, the exact due date, the source domain, an effort estimate (hours or days of work required), a priority level (P1/P2/P3), and a reference to the corresponding open loop item. The file is named with the due date prefix (`YYYY-MM-DD-{item-slug}.md`) so deadline files sort chronologically in the vault. Once created, the deadline is automatically picked up by `aireadylife-calendar-collect-deadlines` on every subsequent agenda build, ensuring it surfaces in weekly previews, deadline-planning ops, and cross-domain scans without requiring any additional manual tracking. Also appends a corresponding entry to `vault/calendar/open-loops.md` if one does not already exist.

## Apps

vault file system

## Vault Output

`vault/calendar/00_deadlines/`
