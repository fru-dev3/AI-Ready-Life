---
type: task
trigger: user-or-flow
description: >
  Records an outdoor activity or local adventure (hike, run, bike ride, walk, visit, paddle,
  ski, climb, anything) to vault/explore/00_current/outings/{YYYY-MM-DD-slug}.md with type,
  date, location, distance/duration, conditions, companions, notes, and reflection. One log
  schema handles all outing types — type is set per entry.
---

# explore-log-outing

**Trigger:**
- User input: "log outing", "log hike", "log my run", "I went to {place}"
- Called by: `flow-suggest-next-outing` (after the user confirms an outing happened), `op-activity-goal-review`

## What It Does

Captures a single outdoor or local-exploration outing as a structured record so the user's annual activity goal, trip-pattern analysis, and next-outing suggestions all read from the same source.

**Outing schema (universal across all activity types):**
- `date` — YYYY-MM-DD
- `type` — user-defined string (hike / run / bike / walk / paddle / ski / climb / city-visit / museum / restaurant / other)
- `location` — name + region (e.g., "Griffith Park, Los Angeles CA")
- `distance` — number + unit, optional (miles, km, laps)
- `duration` — minutes, optional
- `elevation_gain` — feet/meters, optional
- `conditions` — weather, trail/water/route notes
- `companions` — solo / partner / family / friend names; matches the configurable scope set in `config.md`
- `cost` — optional, for paid outings
- `notes` — freeform
- `reflection` — short post-outing note (delegates to `task-log-experience-reflection` if user wants the longer form)

**Goal increment:** After writing, the task increments the user's configured activity counter for the current goal year. Goal type, target count, and which outing types count toward it are read from `config.md` (e.g., "60 outdoor outings/year" or "20 city visits/year" or "100 runs/year").

## Steps

1. Receive outing details from user (or upstream flow)
2. Generate slug: `{YYYY-MM-DD}-{type}-{location-slug}.md`
3. Write outing record to `vault/explore/00_current/outings/{slug}.md`
4. If `reflection` is non-trivial, call `task-log-experience-reflection`
5. Update running counter in `vault/explore/00_current/activity-goal.md`
6. Return confirmation with current pace vs. annual goal

## Configuration

`vault/explore/config.md`:
- `activity_goal_type` (e.g., "outdoor outings", "runs", "hikes", "city visits")
- `activity_goal_target` (integer per year; default 0 = goal disabled)
- `activity_goal_year_start` (default Jan 1)
- `outing_types_counted` (list of types that increment the counter)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/explore/config.md`, `~/Documents/aireadylife/vault/explore/00_current/activity-goal.md`
- Writes: `~/Documents/aireadylife/vault/explore/00_current/outings/{slug}.md`, `~/Documents/aireadylife/vault/explore/00_current/activity-goal.md`
