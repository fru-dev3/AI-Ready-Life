---
name: arlive-learning-flag-falling-behind
type: task
description: >
  Writes a flag to vault/learning/open-loops.md when a course or book is behind pace to complete
  by its target date, with item title, % complete, target date, days remaining, and required daily pace.
---

# arlive-learning-flag-falling-behind

**Trigger:** Called by learning progress flows
**Produces:** Behind-pace flag in `vault/learning/open-loops.md`

## What it does

This task fires when the progress flow detects that a learning item's completion percentage is
significantly behind the percentage of available time elapsed. Each flag captures the item title
and type, the current percentage complete, the original target completion date, the number of days
remaining, the amount of content remaining (chapters, hours, or modules), and the daily or weekly
pace required to finish on time from today. This turns a vague "falling behind" signal into a
concrete, actionable number — e.g., "need 20 minutes/day for 14 days to complete by target date" —
so the user can decide whether to accelerate, adjust the deadline, or drop the item.

## Apps

None

## Vault Output

`vault/learning/open-loops.md`
