---
type: op
trigger: user-facing
description: >
  10-minute start-of-day briefing across all configured calendars. Surfaces today's events,
  meeting-prep status for >30 min meetings, urgent deadlines (≤7 days), today's protected
  blocks, and the day's first commitment. Daily op designed to replace `op-deadline-alert`'s
  ≤7-day surface as the morning anchor. Triggers: "daily brief", "morning brief", "today's plan",
  "what's today".
---

# calendar-daily-brief

**Cadence:** Daily (morning)
**Produces:** Daily brief at `~/Documents/aireadylife/vault/calendar/02_briefs/daily-YYYY-MM-DD.md`

## What It Does

Reads every calendar listed in `config.md` (personal, work, plus any configured shared/family/secondary calendars) and merges today's events into one timeline. Then layers four views on top:

1. **Today's events** — chronological merge across all calendars; first commitment time highlighted; back-to-back clusters and any cross-calendar conflicts (delegated to `op-conflict-scan` for full detection).
2. **Meeting-prep status** — every event >30 minutes is checked for an agenda/prep note in description; missing prep flagged for `task-add-meeting-prep`.
3. **Urgent deadlines (≤7 days)** — calls `flow-collect-deadlines` filtered to the urgent tier; flags any with no logged preparation.
4. **Today's protected blocks** — verifies recurring protected events (deep work, family, workout, health) from `flow-protect-recurring-blocks` are present; warns if any are missing or have been overwritten.

## Steps

1. Read `vault/calendar/config.md`; build the active calendar list.
2. For each calendar, fetch today's events via native MCP connector (preferred) or `app-gcalendar` (fallback).
3. Merge and sort by start time; tag each event with its source calendar.
4. Call `flow-collect-deadlines` with horizon=7 days; collect urgent items.
5. For events >30 min: check description for agenda; flag missing.
6. Verify configured protected blocks present today; flag missing.
7. Write brief to `02_briefs/daily-YYYY-MM-DD.md`; surface critical flags via `task-update-open-loops`.

## Configuration

`vault/calendar/config.md`:
- `calendars` — list of N calendars (id, label, role: personal/work/family/shared)
- `protected_block_types` — which recurring blocks must be present each day
- `meeting_prep_threshold_minutes` (default 30)

## Vault Paths

- Reads: `vault/calendar/config.md`, native calendar connectors (or `app-gcalendar` fallback), `vault/*/open-loops.md`
- Writes: `vault/calendar/02_briefs/daily-YYYY-MM-DD.md`, `vault/calendar/open-loops.md`
