---
type: task
trigger: user-or-flow
description: >
  v2. Auto-blocks the day (or half-day) after long-haul flights or back-to-back travel weeks
  for catch-up. Frequent travelers only. Called by `task-add-travel-buffer` when the trip
  exceeds the configured recovery threshold; can also be user-triggered for a specific date.
---

# calendar-block-after-travel-recovery

**Trigger:**
- Called by: `task-add-travel-buffer` when trip duration or time-zone delta exceeds threshold
- User input: "add recovery day for {trip}"

**Produces:** Recovery block on the configured calendar.

## What It Does

Creates a configurable recovery block following a qualifying trip. Block size scales with trip impact:

- **Light recovery** (half-day, afternoon) — domestic trip ≥4 days OR 1–3 hr time-zone delta.
- **Full recovery** (full day) — international trip OR ≥4 hr time-zone delta OR ≥7 day trip.
- **Extended recovery** (2 days) — ≥8 hr time-zone delta AND ≥7 day trip.

Block uses convention `[Recovery] — {trip}` so `op-conflict-scan` will flag any meeting attempt to overwrite it. Recovery blocks are placed on the work calendar by default (since the goal is to push back work-side scheduling), configurable via `recovery_calendar`.

**Approval:** routes through `task-create-confirmed-event` so the user sees the recovery block before write — useful when the assumption ("you'll need a full day") might be wrong for that traveler.

## Steps

1. Receive trip metadata (duration days, tz delta, return arrival time).
2. Compute recovery size from the size matrix.
3. Build event payload with `[Recovery]` convention placed on `recovery_calendar`.
4. Route through `task-create-confirmed-event`.

## Configuration

`vault/calendar/config.md`:
- `recovery_calendar` — calendar id (default work calendar)
- `recovery_size_matrix` — overridable mapping (defaults above)
- `recovery_default_window` (default `09:00-17:00` on the recovery day)

## Vault Paths

- Reads: `vault/calendar/config.md`
- Writes via task: recovery event on configured calendar
