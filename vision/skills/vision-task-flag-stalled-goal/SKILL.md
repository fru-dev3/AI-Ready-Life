---
name: aireadylife-vision-task-flag-stalled-goal
type: task
description: >
  Writes a stalled goal flag to vault/vision/open-loops.md when a goal has had no
  progress for more than 30 days. Includes goal description, domain, last activity
  date, and recommended next action (recommit, modify, or drop).
---

# aireadylife-vision-flag-stalled-goal

**Produces:** A new stalled goal flag entry in `vault/vision/open-loops.md`.

## What it does

Called by `aireadylife-vision-monthly-scorecard` and `aireadylife-vision-quarterly-planning` when a goal in `vault/vision/00_goals/` has not had any recorded activity (no milestone logged, no open loop resolved, no OKR progress update) for more than 30 days. Writes a structured flag entry to `vault/vision/open-loops.md` with: the goal name and description, the domain it lives in, the date it was originally set, the date of the last recorded activity, the number of days stalled, the current quarter's key result it was supporting (if any), and a three-option decision prompt. The three options are: recommit (acknowledge the stall, identify the specific blocker, and set a concrete next action with a date), modify (the original goal is no longer the right target — reframe it to something that is still meaningful and achievable), or drop (this goal no longer serves the life vision — explicitly close it and remove it from active tracking). The flag is written with the deliberate framing of a choice rather than a failure: goals stall for real reasons, and the right response is a conscious decision about what to do next, not guilt about the stall. Prevents duplicate flags by checking for an existing stalled-goal entry for the same goal before writing.

## Apps

vault file system

## Vault Output

`vault/vision/open-loops.md`
