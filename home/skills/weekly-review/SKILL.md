---
name: arlive-home-weekly-review
type: op
cadence: weekly
description: >
  Weekly home review. Checks open maintenance items for any status changes, surfaces seasonal tasks
  due this week, and flags any urgent home issues.
  Triggers: "weekly home review", "home this week", "maintenance this week".
---

# arlive-home-weekly-review

**Cadence:** Weekly (Monday)
**Produces:** Weekly home snapshot — open items, this week's seasonal tasks, any urgent flags

## What it does

Quick weekly home check: reviews open maintenance items for overdue or urgent status, surfaces seasonal tasks due in the next 7 days, and checks if any landlord or vendor responses are awaited. Only generates a full brief if items need attention — stays silent otherwise.

## Configuration

Uses maintenance and seasonal data from `vault/home/`. In demo mode, reads from `vault-demo/home/state.md`.

## Calls

- **Flows:** `arlive-home-check-urgent-maintenance`, `arlive-home-surface-seasonal-tasks`

## Vault Output

`vault/home/00_current/weekly-snapshot.md` (only when items flagged)
