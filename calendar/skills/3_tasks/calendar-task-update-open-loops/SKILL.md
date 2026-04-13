---
name: arlive-calendar-update-open-loops
type: task
description: >
  Writes calendar flags (upcoming deadline clusters, focus time deficits, unscheduled
  high-priority items) to vault/calendar/open-loops.md and resolves completed items.
---

# arlive-calendar-update-open-loops

**Produces:** An updated `vault/calendar/open-loops.md` with current flags added and resolved items marked complete.

## What it does

Maintains the canonical open-loops file for the calendar domain. When called, it appends any new flags generated during the current op run — deadline clusters approaching, weeks with projected focus time deficits, high-priority items without a calendar slot, or unresolved agenda items carried over from a prior week. Each flag includes the item description, urgency level, due date if applicable, and the recommended action. Also scans existing open loop items and marks any as resolved if the underlying condition is no longer true (deadline passed, focus time target met for the week, item was scheduled). Keeps the file clean and actionable rather than accumulating stale entries. The file is read by `arlive-calendar-collect-deadlines` when scanning cross-domain deadlines, so accurate maintenance here directly improves every agenda build.

## Apps

vault file system

## Vault Output

`vault/calendar/open-loops.md`
