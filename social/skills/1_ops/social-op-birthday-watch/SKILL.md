---
name: aireadylife-social-op-birthday-watch
type: op
cadence: weekly
description: >
  Weekly birthday and milestone watch that surfaces upcoming birthdays and life events in the next
  14 days with suggested actions. Triggers: "birthdays this week", "upcoming birthdays", "who has
  a birthday", "milestone check".
---

# aireadylife-social-birthday-watch

**Cadence:** Weekly (Monday morning)
**Produces:** Upcoming birthday and milestone list with suggested actions for the next 14 days

## What it does

This op runs every Monday to surface any birthdays, anniversaries, or significant milestones in
the next 14 days across all tracked contacts. For each upcoming event it suggests a specific action
calibrated to the relationship tier: close contacts get a personalized message recommendation with
a suggested medium (call vs. text), professional contacts get a LinkedIn message or email suggestion,
and acquaintances get a simple acknowledgment. If a contact is also showing as overdue in the
relationship health tracker, the birthday becomes a natural reconnect opportunity and is flagged
accordingly.

## Calls

- **Flows:** `aireadylife-social-build-outreach-queue`
- **Tasks:** `aireadylife-social-update-open-loops`

## Apps

None

## Vault Output

`vault/social/02_birthdays/`
