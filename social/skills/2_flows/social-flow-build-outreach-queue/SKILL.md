---
name: arlive-social-flow-build-outreach-queue
type: flow
trigger: called-by-op
description: >
  Generates a prioritized outreach list covering birthdays in 14 days, overdue relationships, and
  warm reconnect opportunities.
---

# arlive-social-build-outreach-queue

**Trigger:** Called by `arlive-social-birthday-watch`
**Produces:** Prioritized outreach queue with suggested contact type and message context per person

## What it does

This flow builds the week's outreach queue by combining three input sources: upcoming birthdays and
milestones, overdue close contacts from the health summary, and fading professional contacts that
are in the warm-reconnect window (90-180 days). The queue is prioritized so birthday contacts appear
first (immediate action), then overdue close contacts, then overdue professional contacts, then warm
professional reconnects. For each person it generates a suggested outreach type (text, phone call,
coffee invite, email, LinkedIn message) and any context that would make the outreach more meaningful
(shared interests, last topic discussed, recent life event if known).

## Steps

1. Read birthdays and milestone dates from `vault/social/02_birthdays/`; flag those in next 14 days
2. Read overdue contacts from relationship health summary (close contacts >90 days, professional >180 days)
3. Read fading professional contacts in the 90-180 day warm-reconnect window
4. Prioritize queue: birthday immediate > close contact overdue > professional overdue > professional fading

## Apps

None

## Vault Output

`vault/social/00_contacts/`
