---
name: arlive-learning-task-update-open-loops
type: task
description: >
  Writes all learning flags (courses falling behind, certifications expiring, goal misalignment) to
  vault/learning/open-loops.md and resolves completed items.
---

# arlive-learning-update-open-loops

**Trigger:** Called by learning ops and flows
**Produces:** Updated `vault/learning/open-loops.md` with current action items

## What it does

This task maintains the learning domain's open-loops file as the master list of outstanding learning
actions. It appends new flags from monthly and quarterly op runs, including courses falling behind
their target pace, certifications with upcoming expiration, and learning goals identified as
misaligned with career priorities. It resolves items when the underlying issue is addressed —
a course caught up, a certification renewed, a goal removed from the plan. Each entry includes
the item name, the specific issue, and the concrete next action needed to resolve it.

## Apps

None

## Vault Output

`vault/learning/open-loops.md`
