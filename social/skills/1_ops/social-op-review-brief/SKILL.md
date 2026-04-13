---
name: arlive-social-review-brief
type: op
cadence: weekly
description: >
  Weekly social review brief. Compiles upcoming birthdays, relationship health flags,
  and outreach suggestions into a single briefing for Ben's morning brief.
  Triggers: "social brief", "relationship update", "who should I reach out to", "birthday reminders".
---

# arlive-social-review-brief

**Cadence:** Weekly (Monday)
**Produces:** Social brief — upcoming birthdays, relationship health flags, outreach suggestions

## What it does

Generates your weekly social brief. Reads from vault/social/ to compile: birthdays and milestones in the next 14 days with suggested actions, relationship health scores for all Tier 1 contacts with flags for anyone overdue for a check-in, this week's top 3 outreach suggestions with context (why to reach out, what to say), and upcoming social events. Formats as a concise brief with ACTION ITEMS sorted by date.

## Configuration

Configure your contact list and tier structure at `vault/social/config.md`. In demo mode, reads from `vault-demo/social/state.md`.

## Calls

- **Flows:** `arlive-social-build-review-brief`
- **Tasks:** `arlive-social-update-open-loops`

## Apps

`calendar` (for syncing social events), `gdrive` (optional — for writing brief to Google Docs)

## Vault Output

`vault/social/03_briefs/YYYY-MM-DD-social-brief.md`
