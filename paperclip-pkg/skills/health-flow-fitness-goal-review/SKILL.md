---
type: flow
trigger: called-by-op
description: >
  Tracks fitness behaviors against user-configured goals: weight target, daily step floor,
  exercise minutes per week, resistance-training session count per week, and any
  user-defined cardio goal. Distinct from sleep/HRV wellness review — this is about the
  physical-activity behavior side. Pulls activity data from app-apple-health and/or
  app-oura-ring.api outputs. Reports progress vs goals with trend deltas.
---

# health-fitness-goal-review

**Trigger:** Called by `op-monthly-sync`, `op-review-brief`, on-demand.
**Produces:** Fitness summary in `vault/health/02_briefs/`, flags in open-loops.

## What It Does

Wearables capture behavior; this flow turns that behavior into a goal-comparison view.

**Goals tracked (each user-configurable, all optional):**
- **Body weight:** current vs target; 30-day trend; deltas via `task-attach-trend-context`
- **Daily steps:** trailing-30-day average vs daily floor (default 7,500); pct of days above floor
- **Exercise minutes per week:** sum of "exercise" minutes (Apple Watch green ring, Oura activity goal, or manual log) vs target (default 150 min/week per general guidance)
- **Resistance training sessions per week:** count of strength workouts logged (workout type = strength_training, weight_lifting, or user-tagged "lifting") vs target (default 2/week per general guidance)
- **Cardio goal:** user-defined (e.g., 3 runs per week, 20 miles cycled per week) → checks workout log

**Output structure:**
- Per-goal row: target | current | delta | direction (improving / stable / worsening) | streak (consecutive weeks at-or-above goal)
- 30-day trend chart spec for any plotted metric
- Worst-performing goal flagged in open-loops if 4+ consecutive weeks below target

**No external benchmarking** — this skill compares the user only to their own goals. The user, not the skill, sets the targets.

## Steps

1. Read goals from `vault/health/config.md`
2. Read activity data from `vault/health/00_current/wearable-log.csv` and `manual-activity-log.md` (if any)
3. For each configured goal, compute current value, prior period value, delta via `task-attach-trend-context`
4. Compute streaks and worst-performing goal
5. Write summary brief at `vault/health/02_briefs/YYYY-MM-fitness-review.md`
6. Surface 4+ week underperformance to open-loops with severity MEDIUM

## Configuration

`vault/health/config.md`:
- `weight_target_lbs`, `weight_unit`
- `daily_step_floor` (default 7500)
- `weekly_exercise_minutes_target` (default 150)
- `weekly_resistance_sessions_target` (default 2)
- `custom_cardio_goal` (free-text + numeric target)

## Vault Paths

- Reads: `vault/health/00_current/wearable-log.csv`, `manual-activity-log.md`, `config.md`
- Writes: `vault/health/02_briefs/YYYY-MM-fitness-review.md`
- Updates: `vault/health/open-loops.md`
