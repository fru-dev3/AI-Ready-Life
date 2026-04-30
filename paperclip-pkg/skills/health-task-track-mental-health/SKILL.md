---
type: task
trigger: user-or-flow
description: >
  Captures mood, stress, and sleep-quality entries on a user-configurable cadence (daily
  or weekly). Stores entries with timestamp and notes. Computes rolling 30-day baseline,
  flags streaks of low mood / high stress, and surfaces correlations with sleep score
  and HRV when wearable data is present. Skipped entirely if user opts out. Distinct from
  symptom logging which is condition-specific.
---

# health-track-mental-health

**Trigger:**
- User input: "log my mood", "stress check-in", "mental health entry"
- Called by: `op-review-brief` (prompts user if last entry is older than configured cadence)

## What It Does

Captures the subjective layer that wearables don't see. Light, fast entries — the goal is sustained logging, not richness.

**Entry fields (one row per check-in):**
- Timestamp (date + time bucket: morning / midday / evening)
- Mood (1–10 or `terrible / low / neutral / good / great`)
- Stress (1–10 or `none / low / moderate / high / overwhelming`)
- Sleep quality last night (1–10 or `restless / poor / okay / good / refreshing`)
- Free-text note (optional, ≤200 chars)
- Tags (optional, multi-select: work, family, health, finances, social, exercise, alcohol, screen time)

**Computed views:**
- Rolling 30-day average mood and stress
- 7-day vs 30-day delta
- Streak detection: 5+ consecutive days of mood ≤4 or stress ≥7 → flag for user review (HIGH if streak ≥10 days)
- Correlation pass with wearable data when present:
  - Mood vs Oura sleep score (prior night)
  - Stress vs HRV (prior night)
  - Stress vs steps (same day)
  - Surface a Pearson-style correlation only when ≥30 paired data points exist

**Privacy-first:** mental-health entries never appear in any brief written to `02_briefs/` unless the user explicitly enables it in config. Default is logged-only-in-vault.

## Steps

1. Receive entry input
2. Append to `vault/health/00_current/mental-health-log.md`
3. Compute rolling averages and streak flag
4. If streak threshold crossed, write to open-loops with appropriate severity
5. If wearable correlation enabled and ≥30 paired points, compute and store correlation values in a separate file (no PHI in briefs unless user opts in)

## Configuration

`vault/health/config.md`:
- `mental_health_tracking_enabled` (default `false` — opt-in only)
- `mental_health_cadence` (`daily` / `weekly`)
- `mental_health_low_mood_threshold` (default 4)
- `mental_health_high_stress_threshold` (default 7)
- `mental_health_streak_days_flag` (default 5)
- `mental_health_include_in_briefs` (default `false`)

## Vault Paths

- Reads/writes: `vault/health/00_current/mental-health-log.md`
- Reads: `vault/health/00_current/wearable-log.csv` (for correlation pass)
- Updates: `vault/health/open-loops.md`
