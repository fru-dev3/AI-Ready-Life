---
name: aireadylife-calendar-task-flag-approaching-deadline
type: task
description: >
  Writes a deadline alert to vault/calendar/open-loops.md when a cross-domain item
  is due within 7 days with no preparation activity started. Includes item, domain,
  due date, effort estimate, and recommended prep start date.
---

# aireadylife-calendar-flag-approaching-deadline

**Produces:** A new urgent flag entry in `vault/calendar/open-loops.md`.

## What it does

Called when `aireadylife-calendar-collect-deadlines` identifies an item tagged as urgent (due within 7 days) that has no corresponding preparation activity logged in its domain vault. Writes a structured flag entry to `vault/calendar/open-loops.md` that includes: the item name and description, the source domain (e.g., tax, estate, insurance), the exact due date, an effort estimate for completing the required work, a recommended prep start date (typically 1-3 days before the deadline depending on effort), and the specific preparation steps needed. The flag is marked with `urgency: critical` so it surfaces at the top of any agenda build. If the same item has already been flagged in a prior run and no progress has occurred, the flag is updated with an escalated urgency note rather than creating a duplicate entry. This ensures nothing critical approaches its due date without explicit visibility in the weekly agenda.

## Apps

vault file system

## Vault Output

`vault/calendar/open-loops.md`
