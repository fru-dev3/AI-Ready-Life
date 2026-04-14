---
name: arlive-social-task-update-open-loops
type: task
description: >
  Writes all social flags (overdue relationships, upcoming birthdays, promised follow-ups) to
  vault/social/open-loops.md and resolves completed items.
---

# arlive-social-update-open-loops

**Trigger:** Called by social ops and flows
**Produces:** Updated `vault/social/open-loops.md` with current relationship action items

## What it does

This task maintains the social domain's open-loops file as the active list of relationship actions
that need to happen. It appends new flags from monthly relationship reviews and weekly birthday
watches, including close contacts gone overdue, promised follow-ups that haven't been logged as
completed, and upcoming birthdays requiring action this week. It resolves items when the
interaction has been logged — the outreach happened, the follow-up was delivered. Each entry
includes the person's name, relationship tier, the specific action needed, and any context that
makes the outreach easier to execute (shared topic, recent life event, suggested medium).

## Apps

None

## Vault Output

`vault/social/open-loops.md`
