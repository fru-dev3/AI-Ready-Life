---
name: arlive-social-flag-overdue-contact
type: task
description: >
  Writes a relationship flag to vault/social/open-loops.md when a close contact hasn't been reached
  in 90+ days or a professional contact in 180+ days, with name, last contact date, and suggested
  outreach type.
---

# arlive-social-flag-overdue-contact

**Trigger:** Called by social relationship flows
**Produces:** Overdue relationship flag in `vault/social/open-loops.md`

## What it does

This task fires when the relationship health flow identifies a contact who has crossed the overdue
threshold for their tier. Each flag captures the contact's name, relationship tier (close friend,
family, colleague, professional network), the date and type of the last interaction, how many days
have elapsed since that interaction, and a suggested outreach approach calibrated to both the
relationship and the gap. A close friend at 95 days gets a text suggestion; a professional contact
at 200 days gets a LinkedIn message or email. The flag stays in open-loops.md until an interaction
is logged with that person, which resolves it on the next op run.

## Apps

None

## Vault Output

`vault/social/open-loops.md`
