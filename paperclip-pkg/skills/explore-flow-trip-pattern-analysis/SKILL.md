---
type: flow
cadence: annual
trigger: called-by-op
description: >
  Annual: reads logged trips and outings, surfaces patterns (preferred trip types, average
  trip length, time-of-year preferences, partner/solo split, cost per trip). Informs next
  year's planning.
---

# explore-trip-pattern-analysis

**Trigger:** Called by `op-monthly-sync` (annual rollup in December), `op-review-brief` (on-demand). User-callable: "trip pattern analysis", "year in travel".
**Produces:** `~/Documents/aireadylife/vault/explore/02_briefs/{YYYY}-trip-patterns.md`

## What It Does

Once a year (or on demand), looks across the user's logged trips, outings, reflections, and budget ledgers to surface patterns the user can use for next year's planning. The output is descriptive, not prescriptive — the user decides what to do with it.

**Patterns surfaced:**
- `trip_count` — total trips and outings; split by international / domestic / local-day
- `total_days_traveled` — and what % of the year that was
- `avg_trip_length` — and distribution (3-day weekends vs 10-day vacations)
- `monthly_distribution` — which months saw the most travel; which had none
- `repeat_destinations` vs `new_destinations`
- `companion_split` — solo / partner / family / group breakdown
- `purpose_mix` — leisure / family / business / adventure
- `cost_metrics` — total spend, avg per trip, avg per day, by category
- `top_rated_experiences` — pulled from reflection ratings ≥ 4
- `revisit_signals` — outings/trips with `revisit: yes` from reflections
- `differently_themes` — recurring "differently" items (e.g., "overpacked" appearing 5+ times)
- `wishlist_progress` — items that moved from `unvisited → visited` this year, and the unvisited count remaining

**Year-over-year comparison:** If a prior year's pattern brief exists in `01_prior/`, computes deltas (more days, fewer trips, shifted toward family, etc.).

**Suggested next-year defaults (informational only):**
- If avg_trip_length trending shorter and pace_deficit was positive → suggest increasing activity_goal_target
- If 2+ months had zero travel → flag as planning gaps for next year
- If `differently_themes` shows a pattern → surface as a planning principle

## Steps

1. Read all trip files in `01_prior/{YYYY}/` and `00_current/` for the analysis year
2. Read all `outings/` for the year
3. Read all `reflections/` and budget ledgers
4. Read prior-year brief from `01_prior/{YYYY-1}/`
5. Compute every pattern metric; assemble brief
6. Write to `02_briefs/{YYYY}-trip-patterns.md`
7. Return summary to caller

## Configuration

`vault/explore/config.md`:
- `pattern_analysis_year` (default = current year)
- `top_rated_threshold` (default 4 of 5)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/explore/00_current/`, `~/Documents/aireadylife/vault/explore/01_prior/`, `~/Documents/aireadylife/vault/explore/00_current/wishlist.md`
- Writes: `~/Documents/aireadylife/vault/explore/02_briefs/{YYYY}-trip-patterns.md`
