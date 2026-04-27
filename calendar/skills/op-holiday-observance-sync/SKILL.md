---
type: op
trigger: user-facing
description: >
  Pulls federal + user-configured cultural/religious holidays for the current calendar year
  and writes them as protected all-day events on the configured calendar. Honors per-user
  observance lists (some users observe Christian holidays, some Jewish, Muslim, Hindu, etc.;
  some observe none). Idempotent — re-running for the same year reconciles rather than
  duplicating. Triggers: "sync holidays", "holiday calendar", "add observances".
---

# calendar-holiday-observance-sync

**Cadence:** Annual (January) + on-demand
**Produces:** All-day holiday events on the configured calendar for the target year.

## What It Does

Reads `observances` from `config.md` — a list of which holiday sets the user observes (e.g., `us_federal`, `christian`, `jewish`, `muslim`, `hindu`, `buddhist`, plus any custom dates). For each enabled set, generates the year's dates and proposes them as all-day events on the configured `holidays_calendar`.

**Built-in sets:**
- `us_federal` — 11 federal holidays (New Year's, MLK, Presidents, Memorial, Juneteenth, Independence, Labor, Columbus/Indigenous, Veterans, Thanksgiving, Christmas).
- `christian` — Christmas, Easter, Good Friday (date varies by year).
- `jewish` — Rosh Hashanah, Yom Kippur, Hanukkah, Passover, Shavuot.
- `muslim` — Eid al-Fitr, Eid al-Adha, Ramadan start (lunar — recompute each year).
- `hindu` — Diwali, Holi, Navratri.
- `custom` — user-supplied list of `{name, date, recurring}`.

**Protection:** each holiday is written as `[Holiday] {name}` and may optionally be tagged as protected so `op-conflict-scan` flags meetings scheduled on it. Configurable via `holidays_protect: true|false`.

**Idempotence:** before writing, queries the holidays calendar for an existing `[Holiday] {name}` for that year; updates rather than duplicates.

All writes go through `task-create-confirmed-event` in batch mode so the user can opt out of individual observances.

## Steps

1. Read `observances` and `holidays_calendar` from config.
2. For each enabled set, compute dates for target year.
3. Append `custom` entries.
4. Build event payloads with `[Holiday]` convention.
5. Diff against existing events on the calendar; route adds/updates through `task-create-confirmed-event` (batch).
6. Confirm or skip per-event; write approved entries.

## Configuration

`vault/calendar/config.md`:
- `observances` — list (e.g., `[us_federal, christian]`)
- `custom_observances` — user list of `{name, date, recurring}`
- `holidays_calendar` — calendar id
- `holidays_protect` (default true)

## Vault Paths

- Reads: `vault/calendar/config.md`
- Writes via task: holiday events on configured calendar
