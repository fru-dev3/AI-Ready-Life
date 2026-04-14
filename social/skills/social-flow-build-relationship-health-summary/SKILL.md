---
name: aireadylife-social-flow-build-relationship-health-summary
type: flow
trigger: called-by-op
description: >
  Generates a relationship health table showing all tracked contacts with last contact date, health
  status, and relationship tier.
---

# aireadylife-social-build-relationship-health-summary

**Trigger:** Called by `aireadylife-social-relationship-review`
**Produces:** Relationship health table sorted by urgency with health status and days-since-contact per person

## What it does

This flow joins the contact list with the interaction log to calculate days since last contact for
every tracked person. It assigns a health status based on tier-specific thresholds: close contacts
(family, close friends) are flagged overdue after 90 days of no contact; professional contacts
(colleagues, network) after 180 days; acquaintances after 365 days. The output is a table with
each person's name, relationship tier, last contact date, days since contact, and health status.
The table is sorted to surface the most at-risk close relationships first, making the outreach
priority immediately visible.

## Steps

1. Read contact list and tier assignments from `vault/social/00_contacts/`
2. Read interaction log from `vault/social/01_interactions/` to find last contact date per person
3. Calculate days since last contact for each person
4. Assign health status: healthy (<90 days close, <180 days professional), fading (90-180 days close, 180-365 professional), overdue (>90 days close, >365 professional)

## Apps

None

## Vault Output

`vault/social/00_contacts/`
