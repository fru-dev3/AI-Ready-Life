---
type: op
cadence: weekly
description: >
  Weekly review of the user's configurable annual activity goal. Reads outing log, computes
  pace vs. target, flags shortfall, and surfaces next-outing candidates from the wishlist.
  Goal type and target are user-configurable (any activity, any count).
---

# explore-activity-goal-review

**Cadence:** Weekly (default Sunday). Also on-demand: "how am I doing on my outing goal?", "activity goal review", "am I on pace?"
**Produces:** Pace report at `~/Documents/aireadylife/vault/explore/02_briefs/{YYYY-Www}-activity-goal.md`

## What It Does

Tells the user whether they are on pace for their configured annual activity goal and, if not, surfaces the easiest next outings to close the gap.

**Pace math:**
- Read `activity_goal_target` from `config.md` (e.g., 60 outings/year)
- Read outing log for the current goal year
- Compute: `expected_to_date = target * (days_elapsed / 365)`
- Compute: `actual_to_date = count(outings_year_to_date)`
- `pace_delta = actual_to_date - expected_to_date`
- `on_pace` if `pace_delta >= -1`, `behind` otherwise, `ahead` if `pace_delta >= 2`

**Shortfall surfacing:** If behind, computes weekly outings needed to recover by year-end and writes a 🟡 entry to `open-loops.md`. If behind by more than 25% of remaining time, escalates to 🔴.

**Next-outing candidates:** Calls `flow-suggest-next-outing` with `pace_deficit` as input so the suggestion is biased toward shorter, lower-friction outings when the user is far behind, and toward bucket-list / wishlist items when they're ahead.

**Universal:** Goal type, target, and counted outing types are all configurable. No hardcoded "52 hikes" or any other count.

## Steps

1. Read `vault/explore/config.md` (goal type, target, year start, counted types)
2. Read `vault/explore/00_current/activity-goal.md` and `outings/`
3. Compute expected, actual, delta, on_pace status
4. If behind: compute recovery cadence; call `task-update-open-loops` with shortfall flag
5. Call `flow-suggest-next-outing` with deficit context
6. Write brief to `02_briefs/{YYYY-Www}-activity-goal.md`
7. Return summary to user

## Configuration

`vault/explore/config.md`:
- `activity_goal_type`, `activity_goal_target`, `activity_goal_year_start`, `outing_types_counted`
- `activity_goal_review_day` (default Sunday)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/explore/config.md`, `~/Documents/aireadylife/vault/explore/00_current/outings/`, `~/Documents/aireadylife/vault/explore/00_current/activity-goal.md`, `~/Documents/aireadylife/vault/explore/00_current/wishlist.md`
- Writes: `~/Documents/aireadylife/vault/explore/02_briefs/{YYYY-Www}-activity-goal.md`, `~/Documents/aireadylife/vault/explore/open-loops.md`
