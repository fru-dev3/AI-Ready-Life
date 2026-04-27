---
type: op
trigger: user-facing
description: >
  Cross-calendar double-booking and protected-block-violation detector. Scans every calendar
  configured in `config.md` (personal + work + any family/shared/secondary) for time-window
  overlaps, then checks whether any meeting overlaps a configured protected block. Reports
  conflicts with severity tier and proposed resolution. Triggers: "conflict scan", "double bookings",
  "calendar conflicts", "scheduling conflicts".
---

# calendar-conflict-scan

**Cadence:** User-triggered; called by `op-daily-brief` and `op-weekly-agenda`.
**Produces:** Conflict report at `~/Documents/aireadylife/vault/calendar/02_briefs/conflicts-YYYY-MM-DD.md`.

## What It Does

Detects two failure modes the paragon prohibits: (1) any time window overlapping across two or more configured calendars, and (2) any meeting overwriting a protected block (deep work, family, workout, health).

**Scan window:** today + next 14 days by default, configurable.

**Conflict types:**
- **Hard double-booking:** events on two different calendars overlap by ≥1 minute.
- **Protected-block violation:** a meeting overlaps a recurring block flagged in `protected_block_types` (per `flow-protect-recurring-blocks`).
- **Travel-window collision:** a meeting falls within an event marked `travel:true` or within a buffer added by `task-add-travel-buffer`.

**Severity:** HIGH for same-day conflicts and protected-block violations involving deep work or family; MEDIUM for next-7-day conflicts; LOW for 8-14 day horizon.

For each conflict: writes a row with both events' titles, start/end times, source calendars, conflict type, and a proposed resolution (decline, reschedule, shorten, move). Resolutions are suggested only — never auto-applied; any write goes through `task-create-confirmed-event`.

## Steps

1. Read `config.md` for calendar list and `protected_block_types`.
2. Fetch all events from each calendar across the scan window.
3. For each pair of calendars, find overlapping intervals.
4. For each meeting, check overlap with any protected block window.
5. Apply severity tiers; build conflict rows.
6. Write report; route HIGH-severity items to `task-update-open-loops`.

## Configuration

`vault/calendar/config.md`:
- `conflict_scan_horizon_days` (default 14)
- `protected_block_types` — list (e.g., `deep-work`, `family`, `workout`)

## Vault Paths

- Reads: native calendar connectors (or `app-gcalendar` fallback) for every configured calendar; `vault/calendar/config.md`
- Writes: `vault/calendar/02_briefs/conflicts-YYYY-MM-DD.md`, `vault/calendar/open-loops.md`
