---
name: arlive-social-monthly-sync
type: op
cadence: monthly
description: >
  Full social data sync on the 1st of each month. Reviews all relationship health
  scores, identifies who needs a check-in, and updates the outreach queue for the month.
  Triggers: "social monthly sync", "relationship review", "refresh social vault".
---

# arlive-social-monthly-sync

**Cadence:** Monthly (1st of month)
**Produces:** Social vault refreshed with updated relationship health scores and monthly outreach plan

## What it does

Full social sync: recalculates relationship health scores for all contacts based on last-contact date, generates the monthly outreach plan (who to reconnect with and suggested approach), reviews upcoming birthdays and milestones for the month ahead, checks for any relationship deterioration (Tier 1 contacts moving from yellow to red), and updates the outreach log with completed check-ins from last month.

## Configuration

Set your tier definitions and health score thresholds in `vault/social/config.md`.

## Calls

- **Flows:** `arlive-social-recalculate-health-scores`, `arlive-social-build-monthly-outreach-plan`
- **Then triggers:** `arlive-social-review-brief`

## Apps

`calendar` (for upcoming social events), `gdrive` (optional)

## Vault Output

`vault/social/` (all subdomains refreshed)
