---
type: op
trigger: user-facing
description: >
  For users tracking chronic or episodic symptoms (migraines, allergies, GI issues, joint
  pain, mental-health symptoms, dermatological flares, etc.), reviews the symptom log,
  detects temporal patterns (day-of-week, time-of-month, seasonality), and correlates with
  sleep, HRV, stress, exercise, diet markers, and weather when available. Produces a
  pattern brief that can be shared with the user's provider. v2 skill — only useful for
  users who maintain a symptom log; otherwise skipped.
---

# health-symptom-log-review

**Trigger phrases:**
- "review my symptom log"
- "symptom pattern check"
- "what's triggering my [migraines / GI flares / etc.]"
- "symptom review"

**Cadence:** Monthly when symptom log has ≥10 entries; on-demand. Skipped if `symptom_log_enabled: false`.

## What It Does

Symptom data is messy and individual — this op surfaces signals that are hard to see across hand-written entries.

**Inputs:**
- `vault/health/00_current/symptom-log.md` — user-maintained entries with date, symptom name, severity (1–10), duration, triggers (suspected), notes
- `vault/health/00_current/wearable-log.csv` (sleep score, HRV, RHR, steps)
- `vault/health/00_current/mental-health-log.md` (stress, mood)
- Optional: `vault/health/00_current/diet-log.md`, `weather-log.md`

**Pattern checks (deterministic, no clinical claims):**
1. **Temporal:** day-of-week clustering, day-of-month clustering (cycle-related), monthly/seasonal clustering
2. **Lag correlation with wearable signals:** symptom severity vs prior-night sleep score, prior-day stress, prior-day HRV — show correlation only when ≥20 paired points exist
3. **Trigger frequency:** count occurrences of each user-tagged trigger; rank by co-occurrence with high-severity entries
4. **Duration trend:** is average episode length growing, stable, or shrinking over the last 6 months?
5. **Severity trend:** rolling 90-day mean severity vs prior 90 days

**Output:** A markdown pattern brief at `vault/health/02_briefs/YYYY-MM-symptom-pattern.md`. The brief is descriptive only — it does not diagnose, recommend treatment, or interpret clinically. Top of brief includes "discuss with your provider" framing.

## Steps

1. Verify `symptom_log_enabled: true`; otherwise stop
2. Read symptom log; require ≥10 entries to run a meaningful pattern check (otherwise report "insufficient data, log more entries")
3. Run five pattern checks
4. Compose brief; pass through `task-redact-phi-for-brief`
5. Write `02_briefs/YYYY-MM-symptom-pattern.md`
6. If average severity has worsened ≥20% over 90 days, surface to open-loops as MEDIUM ("consider provider follow-up")

## Configuration

`vault/health/config.md`:
- `symptom_log_enabled` (default `false`)
- `symptom_min_entries_for_review` (default 10)
- `symptom_correlation_lag_days` (default 1 — check prior-night signals against today's symptoms)

## Vault Paths

- Reads: `vault/health/00_current/symptom-log.md`, `wearable-log.csv`, `mental-health-log.md`, optional diet/weather logs
- Writes: `vault/health/02_briefs/YYYY-MM-symptom-pattern.md`
- Updates: `vault/health/open-loops.md`
