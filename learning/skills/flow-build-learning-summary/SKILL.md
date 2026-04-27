---
type: flow
trigger: called-by-op
description: >
  Single learning summary flow. Replaces the previous split between
  `flow-build-progress-summary` (courses / certs) and `flow-build-reading-summary`
  (books). Reading is just one item type; pace math is identical across types.
  Reads all active learning items, computes pace, and returns one urgency-ranked
  table plus a per-type rollup.
---

# learning-build-learning-summary

**Trigger:** Called by `op-monthly-sync`, `op-review-brief`, `op-monthly-reflection`.
**Produces:** Structured summary returned to caller; written to `vault/learning/02_briefs/learning-summary-YYYY-MM.md`.

## What It Does

Unified pace + completion summary across every item type. One pass, one table, one set of rules.

**Item types covered (single-table, not separate flows):**
- course (Coursera, Udemy, LinkedIn Learning, edX, Pluralsight, etc.).
- certification (with exam date).
- book (physical / Kindle / audio).
- paper / long-read (with target completion date).
- project / learn-by-building.

**Pace calculation (uniform across all types):**
1. `completion_pct = completed_units ÷ total_units`. Units are whatever's natural for the type (modules / hours / pages / chapters).
2. `time_elapsed_pct = (today − start_date) ÷ (target_date − start_date)`.
3. `pace_delta = completion_pct − time_elapsed_pct`.
4. Status: ahead (>+15 pts), on-pace (±15), behind (<−15).
5. For behind items: `required_daily_pace = remaining_units ÷ days_remaining` formatted with the item's natural unit.

**Per-type rollups (replaces what the two old flows produced separately):**
- Courses: count by status; fastest-finishing course this month.
- Certifications: exam-ready count; at-risk certs with required daily hours.
- Books: completed YTD; current pace books/month; projected year-end vs `annual_book_goal`; current book + projected completion date; next 3 from `task-update-reading-list`.
- Papers / projects: counted but not paced if they have no target date (note that fact).

**Behavioral overlay:**
- Calls `flow-build-streak-summary` and includes streak status in the output.

## Steps

1. Read all active items from `vault/learning/00_current/`.
2. For each: calculate completion_pct, time_elapsed_pct, pace_delta. Classify.
3. For behind items: compute required daily pace.
4. Sort by urgency (most behind first; within tied, soonest target_date first).
5. Group rollups by type.
6. Call `flow-build-streak-summary`; merge result.
7. Read `annual_book_goal` and `monthly_completion_target` from config; project YE totals.
8. Write `learning-summary-YYYY-MM.md`; return structured data to caller.

## Configuration

Each active item must have: `title`, `type`, `total_units`, `completed_units`, `unit_type`, `start_date`, `target_completion_date`, `status`.

`vault/learning/config.md`:
- `annual_book_goal`, `monthly_completion_target`, `pace_delta_threshold` (default 15).

## Vault Paths

- Reads: `vault/learning/00_current/`, `vault/learning/01_prior/`, `vault/learning/config.md`.
- Writes: `vault/learning/02_briefs/learning-summary-YYYY-MM.md` (and returns to caller).
