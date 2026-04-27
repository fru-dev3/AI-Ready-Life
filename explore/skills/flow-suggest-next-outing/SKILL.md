---
type: flow
trigger: called-by-op
description: >
  Suggests the next outing given pace deficit (vs. activity goal), weather window, season,
  and unvisited wishlist items. Configurable scope: solo, partner, family-friendly, or any
  user-defined companion mode.
---

# explore-suggest-next-outing

**Trigger:** Called by `op-activity-goal-review`, `op-monthly-sync`, `op-review-brief`. User-callable: "suggest an outing", "what should I do this weekend?", "where should we go?"
**Produces:** Ranked list of 3 outing candidates returned to caller.

## What It Does

Picks the most relevant 3 outings from the wishlist given current pace, available weather window, season, and the configured scope (solo, partner, family-friendly, group). The output is short, ranked, and immediately actionable.

**Inputs the flow assembles:**
- `pace_deficit` from `op-activity-goal-review` (positive = behind, negative = ahead)
- `weather_window` for the next 7 days at the user's home region (read from `config.md`)
- `season` — derived from current date
- `scope` — solo / partner / family / group; passed by caller or read from config default
- `wishlist` — `00_current/wishlist.md` entries with status `unvisited`
- `outing_history` — last 90 days of outings to avoid repeats

**Ranking heuristics (in priority order):**
1. Scope-match — if scope=family, filter out wishlist entries tagged `solo-only` or `partner-only`
2. Season-match — exclude clearly out-of-season options (e.g., snow trails in July)
3. Weather-match — prefer options compatible with the next available good-weather day
4. Friction-match — when pace_deficit is high, prefer short / nearby / low-prep outings
5. Novelty — break ties toward unvisited destinations
6. Reflection signal — promote items where past reflections marked `revisit: yes` if the user is ahead of pace

**Output:** 3 candidates with name, distance from home, expected duration, why-this-fits explanation, and prep checklist (gear, reservations, drive time). The user picks one; if they confirm, `task-log-outing` runs after the outing.

## Steps

1. Receive `pace_deficit` and `scope` from caller (default scope = `partner` if unset)
2. Read `wishlist.md`, recent `outings/`, `config.md` (home region), weather feed
3. Filter wishlist by scope tags and season
4. Score remaining candidates by weather + friction + novelty
5. Return top 3 with rationale and prep checklist

## Configuration

`vault/explore/config.md`:
- `home_region` (city / lat-lon for weather)
- `default_scope` (solo / partner / family / group)
- `max_drive_time_minutes` (default 90)
- `friction_threshold_for_short_outings` (default: trigger short-outing bias when pace_deficit > 2)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/explore/config.md`, `~/Documents/aireadylife/vault/explore/00_current/wishlist.md`, `~/Documents/aireadylife/vault/explore/00_current/outings/`
- Writes: none (returns ranked candidates to caller)
