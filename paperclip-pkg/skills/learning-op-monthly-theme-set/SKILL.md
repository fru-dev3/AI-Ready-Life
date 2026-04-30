---
type: op
trigger: user-facing
description: >
  Monthly (1st of month) theme-setting op. Pulls career skill gaps and any
  user-configured priorities, then outputs one named theme with a chosen resource,
  a planned applied output, a deadline, and weekly milestones. Closes the
  "no monthly intent" gap that was leaving the learning portfolio reactive.
---

# learning-monthly-theme-set

**Trigger phrases:**
- "set learning theme"
- "monthly learning theme"
- "what should I learn this month"
- "plan learning month"
- "kick off learning month"

**Cadence:** Monthly, on the 1st (or first run-day of the month).

## What It Does

Picks one — and only one — focus theme for the month. The discipline is single-threading: one theme produces one applied output by one deadline.

**Inputs read:**
- `vault/career/00_current/skills-gap.md` (if career plugin installed) — the highest-priority unresolved skill gap.
- `vault/learning/config.md` — `learning_priorities` (free-text user list) and `theme_horizon` (12 / 24 months).
- `vault/learning/01_prior/themes/` — last 3 themes (avoid repeats; surface unfinished outputs).
- `vault/vision/00_current/` (if installed) — annual theme / current-year focus.

**Output:**
- `vault/learning/00_current/theme-YYYY-MM.md` containing: theme name, why-now (sourced from inputs above), chosen primary resource (course / book / paper / project), planned applied output (links to `task-log-applied-output`), deadline = last day of month, weekly milestones (4 checkpoints).
- Open-loops entry if any prior-month theme had no applied output logged.

## Steps

1. Read inputs above.
2. Surface up to 5 candidate themes ranked by skill-gap urgency + horizon alignment.
3. User picks one (or accepts the top-ranked).
4. Choose primary resource — one course / book / paper / repo. Multiple resources is an anti-pattern.
5. Define the applied output up front (repo URL, post title, deck name, certification ID).
6. Write `theme-YYYY-MM.md` with weekly milestones.
7. Call `task-update-open-loops` for any unresolved prior themes.

## Configuration

`vault/learning/config.md`:
- `theme_horizon_months` (default 18)
- `learning_priorities` (free-text list)
- `weekly_milestone_count` (default 4)

## Vault Paths

- Reads: `vault/learning/config.md`, `vault/learning/01_prior/themes/`, `vault/career/00_current/skills-gap.md` (optional), `vault/vision/00_current/` (optional)
- Writes: `vault/learning/00_current/theme-YYYY-MM.md`, `vault/learning/open-loops.md`
