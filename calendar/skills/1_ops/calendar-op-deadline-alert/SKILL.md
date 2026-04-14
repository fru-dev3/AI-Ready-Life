---
name: arlive-calendar-op-deadline-alert
type: op
cadence: weekly
description: >
  Weekly deadline alert. Flags all obligations due within 30 days across all installed plugins.
  Triggers: "deadline alert", "what's due", "upcoming deadlines", "30-day deadlines".
---

# arlive-calendar-deadline-alert

**Cadence:** Weekly (Monday)
**Produces:** 30-day deadline alert report across all installed plugins

## What it does

Reads the deadline registry in the calendar vault, cross-references with all installed plugin state.md files, and surfaces any obligation due within 30 days. Categorizes by urgency: Urgent (7 days), Soon (8-14 days), Upcoming (15-30 days). Flags any deadline without a confirmed action plan.

## Urgency Tiers

- **Urgent (0-7 days):** requires immediate action
- **Soon (8-14 days):** schedule this week
- **Upcoming (15-30 days):** on radar, plan ahead

## Vault Output

`vault/calendar/02_deadlines/alert-YYYY-MM-DD.md`
