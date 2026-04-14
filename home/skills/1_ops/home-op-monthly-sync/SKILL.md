---
name: aireadylife-home-op-monthly-sync
type: op
cadence: monthly
description: >
  Monthly home sync. Reviews all maintenance statuses, logs monthly home expenses, and checks
  seasonal task completion. Triggers: "home monthly sync", "sync home data", "monthly home review".
---

# aireadylife-home-monthly-sync

**Cadence:** Monthly (1st of month)
**Produces:** Maintenance status update and monthly expense summary

## What it does

Full monthly home sync: updates all open maintenance item statuses, logs the month's home expenses by category, checks off completed seasonal tasks, and flags any upcoming lease renewals or insurance renewals within 90 days. Ends by triggering the Home Review Brief.

## Configuration

Uses maintenance and expense data from `vault/home/`. In demo mode, reads from `vault-demo/home/state.md`.

## Calls

- **Flows:** `aireadylife-home-update-maintenance-status`, `aireadylife-home-log-monthly-expenses`, `aireadylife-home-check-seasonal-tasks`
- **Then triggers:** `aireadylife-home-review-brief`

## Vault Output

`vault/home/00_current/state.md`
`vault/home/02_expenses/YYYY-MM-expenses.md`
