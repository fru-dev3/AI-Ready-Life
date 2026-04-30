---
type: op
trigger: user-facing
description: >
  Quarterly recurring-event hygiene audit. Identifies "zombie" recurring events — meetings
  no one attends, recurring blocks that are stale, or series that have outgrown their purpose.
  Recurring events compound forever without periodic pruning. Triggers: "recurring event audit",
  "calendar hygiene", "zombie meetings".
---

# calendar-recurring-event-audit

**Cadence:** Quarterly
**Produces:** `vault/calendar/02_briefs/YYYY-QN-recurring-audit.md`

## What It Does

Pulls every recurring series across configured calendars, then computes three signals per series to identify candidates for retire/redesign:

1. **Attendance rate** (for meetings with attendees): how often the user has accepted/attended in the past 90 days. <50% → flag.
2. **Modification rate**: how often the series instance has been moved, shortened, or skipped. >30% → flag (signals friction).
3. **Age vs. purpose freshness**: series older than 1 year with no description or no recent prep notes → ask user whether the original purpose still applies.

**Bucketed output:**
- **Retire candidates** — strong signals to cancel.
- **Redesign candidates** — keep but change cadence/duration/attendees.
- **Healthy** — high attendance, low friction, fresh purpose; no action.

Each retire/redesign suggestion includes the series title, attendees, recurrence pattern, key signal that triggered the flag, and a one-line rationale. User confirms changes; any series modification is routed through `task-create-confirmed-event`.

Cross-checks `[Protected: ...]` blocks against `recurring_blocks` config — surplus or stale protected blocks are flagged to feed `flow-protect-recurring-blocks`.

## Steps

1. Read all recurring series from configured calendars.
2. For each series: fetch past 90 days of instances + RSVP/attendance signal.
3. Compute attendance, modification, and age signals.
4. Bucket into retire / redesign / healthy.
5. Write audit brief with rationales.
6. Surface high-confidence retire candidates via `task-update-open-loops` for user decision.

## Configuration

`vault/calendar/config.md`:
- `audit_attendance_threshold_pct` (default 50)
- `audit_modification_threshold_pct` (default 30)
- `audit_age_threshold_days` (default 365)

## Vault Paths

- Reads: native calendar connectors (or `app-gcalendar` fallback) for every configured calendar; `vault/calendar/config.md`
- Writes: `vault/calendar/02_briefs/YYYY-QN-recurring-audit.md`, `vault/calendar/open-loops.md`
