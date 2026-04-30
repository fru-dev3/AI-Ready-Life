---
type: task
trigger: called-by-task
description: >
  Lightweight post-experience reflection (highlight, what to remember, what to do differently).
  Single canonical schema used by both task-log-outing and the post-trip path of task-log-trip.
---

# explore-log-experience-reflection

**Trigger:** Called by `task-log-outing` (post-outing) and `task-log-trip` (post-return). Also user-callable: "reflect on {trip|outing}".
**Produces:** Reflection block embedded in the outing or trip record, plus an optional standalone note in `vault/explore/00_current/reflections/`.

## What It Does

Captures three short fields immediately after an experience while memory is fresh. One canonical schema across outings and trips so reflections compose cleanly into year-end pattern analysis.

**Reflection schema:**
- `highlight` — the single best moment or takeaway (one sentence)
- `remember` — what should not be lost (sensory, emotional, practical)
- `differently` — what to do differently next time (gear, route, timing, companions, pace)
- `recommend_to_others` — yes / no / conditional (feeds into wishlist seeding for friends)
- `revisit` — yes / no / maybe (feeds back into `flow-suggest-next-outing`)
- `rating` — 1-5 stars, optional

**Embedding:** Reflection is appended to the parent outing or trip file under a `## Reflection` heading. A copy is also written to `vault/explore/00_current/reflections/{YYYY-MM-DD-slug}.md` so reflections can be browsed independently of trip/outing files.

**Year-end value:** `flow-trip-pattern-analysis` reads reflections to surface highest-rated experiences, common "differently" patterns (e.g., user repeatedly notes they overpacked), and revisit candidates.

## Steps

1. Receive parent record path (outing or trip file) and free-form reflection input
2. Parse into the four required fields; ask user for missing ones
3. Append `## Reflection` block to parent file
4. Write standalone copy to `vault/explore/00_current/reflections/{slug}.md`
5. Return confirmation

## Configuration

No configuration required.

## Vault Paths

- Reads: parent outing or trip file
- Writes: parent file (append), `~/Documents/aireadylife/vault/explore/00_current/reflections/{slug}.md`
