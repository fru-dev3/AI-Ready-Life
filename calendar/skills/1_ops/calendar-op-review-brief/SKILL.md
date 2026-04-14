---
name: aireadylife-calendar-op-review-brief
type: op
cadence: weekly
description: >
  Weekly calendar brief. Surfaces upcoming deadlines, focus time health, and scheduling flags.
  Triggers: "calendar brief", "what's due this week", "deadline check", "focus time", "schedule review".
---

# aireadylife-calendar-review-brief

**Cadence:** Weekly (Monday morning)
**Produces:** Weekly calendar brief — upcoming deadlines, focus time health, scheduling flags

## What it does

Reads the calendar vault state, extracts all deadlines due in the next 30 days, scores focus time health for the prior week, reviews weekly priorities, and surfaces scheduling conflicts or open items. Produces a concise weekly calendar brief.

## Calls

- **Tasks:** reads vault/calendar/state.md or vault-demo/calendar/state.md

## Vault Output

`vault/calendar/04_reviews/week-YYYY-WNN.md`
