---
type: flow
trigger: called-by-op
description: >
  Computes daily/weekly study consistency from the study log: current streak,
  longest streak, days-skipped pattern, weekday-vs-weekend split. Behavioral data
  about habits — distinct from pace data about pace. Called by review briefs.
---

# learning-build-streak-summary

**Trigger:** Called by `op-review-brief`, `op-monthly-sync`, on-demand.
**Produces:** Structured streak summary returned to caller; appended to `vault/learning/00_current/streak-status.md`.

## What It Does

Reads `vault/learning/00_current/study-log.md` (one line per study session: date, minutes, topic) and computes consistency metrics. This is behavioral telemetry — was the habit kept? — not pace telemetry — is the course on track?

**Metrics computed:**
- `current_streak_days` — consecutive days with ≥ `min_session_minutes` (default 10).
- `longest_streak_days` (lifetime).
- `days_active_in_window` / `window_size` — e.g. 22/30 for trailing month.
- `weekly_active_days_avg` — across last 12 weeks.
- `weekday_vs_weekend_ratio` — diagnostic for "do I only study on weekdays?".
- `skipped_pattern` — clusters of skipped days (run-length encoding) — if there's a "always Friday" or "always weekend" gap, surface it.
- `target_streak` — from config (e.g. "5 weekdays/week").

**Status flags returned (no writes; caller decides):**
- `on_target` — current pace meets `target_streak`.
- `at_risk` — within 1 skip of breaking target.
- `broken` — target broken; recovery suggestion = today + minimum-session.

## Steps

1. Read `vault/learning/00_current/study-log.md`.
2. Compute metrics above (treat any day with ≥ `min_session_minutes` as active).
3. Compute target adherence per `target_streak` config.
4. Return structured summary to caller; also write `streak-status.md` for inspection.

## Configuration

`vault/learning/config.md`:
- `min_session_minutes` (default 10)
- `target_streak` — e.g. `5_per_week_weekdays`, `7_per_week`, `daily`, or numeric "X days/week".
- `streak_window_days` (default 30)

## Vault Paths

- Reads: `vault/learning/00_current/study-log.md`, `vault/learning/config.md`.
- Writes: `vault/learning/00_current/streak-status.md` (and returns to caller).
