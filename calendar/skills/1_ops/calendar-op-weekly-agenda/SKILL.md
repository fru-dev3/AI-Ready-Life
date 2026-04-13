---
name: arlive-calendar-weekly-agenda
type: op
cadence: weekly
description: >
  Monday morning weekly agenda builder; collects all cross-domain deadlines and
  priorities for the coming week, then suggests focus time blocks based on urgency
  and effort. Triggers: "weekly agenda", "what's this week", "week ahead", "monday preview".
---

# arlive-calendar-weekly-agenda

**Cadence:** Weekly (Monday morning)
**Produces:** A prioritized week-ahead brief in `vault/calendar/02_agenda/` with deadlines, open loops, and suggested focus block schedule.

## What it does

Runs every Monday to set up the week before anything else competes for attention. Pulls every cross-domain deadline and high-priority open loop due within the next 7 days, then layers on any calendar events already logged in vault. From that raw material it produces a ranked agenda — top deadlines first, then pending decisions, then make-progress items — and proposes 2-3 deep work focus blocks to slot into the calendar. The output is a single dated brief (`YYYY-MM-DD-week-agenda.md`) that acts as the week's operating document. Also runs `arlive-calendar-update-open-loops` to ensure any newly surfaced items are captured before the week starts.

## Calls

- **Flows:** `arlive-calendar-collect-deadlines`, `arlive-calendar-build-agenda`
- **Tasks:** `arlive-calendar-update-open-loops`

## Apps

Google Calendar (read), vault file system

## Vault Output

`vault/calendar/02_agenda/`
