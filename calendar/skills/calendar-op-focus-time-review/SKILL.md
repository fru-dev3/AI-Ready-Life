---
name: aireadylife-calendar-op-focus-time-review
type: op
cadence: weekly
description: >
  Weekly focus time audit; analyzes meeting load vs. deep work blocks across the
  current and upcoming week, flags weeks falling below 8 hours of uninterrupted
  focus time, and recommends specific calendar changes to protect deep work.
  Triggers: "focus review", "meeting overload", "deep work time", "calendar audit".
---

# aireadylife-calendar-focus-time-review

**Cadence:** Weekly (Friday or Sunday)
**Produces:** A focus-time audit report in `vault/calendar/01_focus/` with meeting hours, focus hours, deficit flags, and calendar change recommendations.

## What it does

Analyzes the balance between meeting commitments and unblocked deep work time for both the past week (retrospective) and the upcoming week (forward-looking). Reads calendar data from `vault/calendar/01_focus/` to calculate total meeting hours, identify back-to-back meeting clusters that fragment focus, and measure the total hours of uninterrupted 90-minute-or-longer blocks available. If total focus hours fall below 8 for the week, it flags a deficit and produces a concrete list of calendar changes: meetings to batch, blocks to protect, or times to decline. Also identifies which days are most focus-hostile (high meeting density, repeated interruptions) versus which days have the best deep work potential for scheduling complex work. Updates open loops if a recurring deficit pattern is detected.

## Calls

- **Flows:** `aireadylife-calendar-analyze-focus-time`
- **Tasks:** `aireadylife-calendar-update-open-loops`

## Apps

Google Calendar (read), vault file system

## Vault Output

`vault/calendar/01_focus/`
