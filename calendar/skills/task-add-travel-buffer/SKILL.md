---
type: task
trigger: user-or-flow
description: >
  Adds buffer events around a trip: drive/transit time to airport, arrival buffer at destination,
  and a configurable jet-lag recovery block on return. Reads trip details (origin, destination,
  flight times, mode) and produces 2–4 calendar events routed through `task-create-confirmed-event`.
---

# calendar-add-travel-buffer

**Trigger:**
- User input: "add travel buffer for {trip}"
- Called by: `op-weekly-agenda` when a flight event is detected without surrounding buffers

**Produces:** Buffer events on the configured calendar.

## What It Does

For a given trip (one round-trip flight or transit), generates buffer events in the user's local timezone:

1. **Pre-departure buffer** — drive/transit + airport arrival window. Default: drive_time + 2h (domestic) or 3h (international), configurable.
2. **In-transit block** — covers the flight window, marked `travel:true` so `op-conflict-scan` blocks meetings.
3. **Arrival buffer** — drive/check-in time at destination. Default: 90 min.
4. **Return-day jet-lag block** — only if origin↔destination time-zone delta exceeds `jetlag_threshold_hours` (default 3) or trip duration exceeds `jetlag_min_trip_days` (default 4). Default block: half-day (afternoon) on the return arrival day.

If trip duration or time-zone delta exceeds the configured `recovery_threshold`, the task additionally calls `task-block-after-travel-recovery` (v2) to add a full-day catch-up block.

All events use convention `[Buffer: {direction}] — {trip}` and route through `task-create-confirmed-event` for batched approval.

## Steps

1. Receive trip metadata (origin, destination, depart/return times, mode, drive_time).
2. Compute pre-departure, transit, arrival, and (conditionally) jet-lag buffers in local time.
3. Build event payloads with naming convention.
4. Route batch through `task-create-confirmed-event`.
5. If recovery threshold exceeded, hand off to `task-block-after-travel-recovery`.

## Configuration

`vault/calendar/config.md`:
- `airport_arrival_domestic_minutes` (default 120)
- `airport_arrival_international_minutes` (default 180)
- `jetlag_threshold_hours` (default 3)
- `jetlag_min_trip_days` (default 4)
- `default_drive_time_minutes` (default 30)

## Vault Paths

- Reads: `vault/calendar/config.md`
- Writes via task: buffer events on configured calendar
