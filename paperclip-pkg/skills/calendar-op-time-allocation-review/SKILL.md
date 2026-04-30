---
type: op
trigger: user-facing
description: >
  Monthly retrospective. Sums hours actually allocated across configured life domains
  (health, family, creative, business, admin, etc.) from completed events on every configured
  calendar, then compares against paragon balance targets. Flags imbalances and feeds the
  next month's `flow-protect-recurring-blocks` cycle. Triggers: "time allocation",
  "where did my time go", "monthly time review".
---

# calendar-time-allocation-review

**Cadence:** Monthly (first week of new month, reviewing prior month)
**Produces:** `vault/calendar/02_briefs/YYYY-MM-time-allocation.md`

## What It Does

Reads completed events across every configured calendar for the prior month, classifies each into a life-domain bucket (using event title, calendar source, and naming-convention tags from `task-create-confirmed-event`), and sums hours per bucket.

**Buckets** (configurable in `time_buckets`):
- Deep work / creative
- Meetings / collaboration
- Health (workouts, appointments)
- Family / partner
- Admin (email, planning, errands)
- Learning
- Rest / personal

**Comparison:** Each bucket has a target hours/week from `time_allocation_targets`. The op shows actual vs. target, percent variance, and the three biggest gaps (positive and negative). Distinguishes "scheduled but not protected" hours (regular events) from "protected" hours (`[Protected: ...]` blocks) so the user can see whether the system is honoring its own design.

**Trend:** compares against the prior month and the rolling 3-month average; flags trajectory shifts >15%.

Findings feed `op-quarterly-time-design-rebalance` (which redesigns blocks every 3 months).

## Steps

1. Read all events from configured calendars for prior calendar month.
2. Classify each event into a bucket via title pattern, calendar source, and protected-block tag.
3. Sum hours per bucket; compute weekly average.
4. Compare to `time_allocation_targets`; compute variance and trend vs. prior month.
5. Build table with biggest gaps first; write brief.
6. Surface significant gaps (≥25% variance) via `task-update-open-loops`.

## Configuration

`vault/calendar/config.md`:
- `time_buckets` — list of bucket names + classification rules
- `time_allocation_targets` — target hours/week per bucket
- `time_review_variance_threshold_pct` (default 25)

## Vault Paths

- Reads: native calendar connectors (or `app-gcalendar` fallback) for every configured calendar; `vault/calendar/config.md`
- Writes: `vault/calendar/02_briefs/YYYY-MM-time-allocation.md`, `vault/calendar/open-loops.md`
