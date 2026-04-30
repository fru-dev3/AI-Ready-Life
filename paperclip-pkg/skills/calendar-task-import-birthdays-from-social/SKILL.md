---
type: task
trigger: user-or-flow
description: >
  Reads the social plugin's contacts roster, extracts birthdays, and writes recurring all-day
  birthday events with configurable lead-time reminders. Cross-plugin convenience that turns
  the social vault into calendar surface area. Idempotent — re-running reconciles instead of
  duplicating. Skips silently if social plugin not installed.
---

# calendar-import-birthdays-from-social

**Trigger:**
- User input: "import birthdays", "sync birthdays from social"
- Called by: `op-quarterly-time-design-rebalance`

**Produces:** Recurring all-day birthday events on the configured `birthdays_calendar`.

## What It Does

Looks up `~/Documents/aireadylife/vault/social/00_current/contacts.md` (or the configured social roster path). For each contact with a birthday field, drafts a yearly recurring all-day event using the convention `[Birthday] {name}`.

**Reminders:** for each entry, optionally creates a 7-day-ahead and/or same-day reminder per `birthday_reminder_lead_days`.

**Privacy:** writes only `[Birthday] {name}` to the event title — no DOB year, no contact details — so a shared family/work calendar can include the events without leaking personal data.

**Idempotence:** queries `birthdays_calendar` for existing matching events; only adds the missing ones; updates date if changed in social roster.

**Graceful no-op:** if `vault/social/` is missing or contacts file empty, returns "Social plugin not installed or empty — birthdays skipped" without error.

All writes batch through `task-create-confirmed-event`.

## Steps

1. Locate social roster file; if absent, return no-op message.
2. Parse contacts; extract `name` + `birthday`.
3. Read existing `[Birthday]` events from `birthdays_calendar`.
4. Diff: build add/update list.
5. Build payloads (yearly RRULE, all-day, optional reminder offsets).
6. Route batch through `task-create-confirmed-event`.

## Configuration

`vault/calendar/config.md`:
- `birthdays_calendar` — calendar id
- `birthday_reminder_lead_days` — list (default `[7]`)
- `social_roster_path` (default `~/Documents/aireadylife/vault/social/00_current/contacts.md`)

## Vault Paths

- Reads: `vault/social/00_current/contacts.md`
- Writes via task: birthday events on configured calendar
