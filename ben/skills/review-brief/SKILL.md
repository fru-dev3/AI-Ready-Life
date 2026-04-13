---
name: arlive-ben-morning-brief
type: op
cadence: daily
description: >
  Daily morning executive brief. Polls all installed plugin vaults, synthesizes domain alerts,
  surfaces urgent items, and delivers a prioritized daily brief.
  Triggers: "morning brief", "daily brief", "what's on my plate today", "life summary".
---

# arlive-ben-morning-brief

**Cadence:** Daily (7 AM)
**Produces:** Executive AM brief — domain alerts, urgent items, top 3 actions, calendar

## What it does

Reads from every installed plugin vault, extracts open loops and urgent items, synthesizes into a single executive brief. Sections: Today's Focus (top 3 actions), Domain Alerts (flags from any plugin), Upcoming Deadlines (next 7 days), and Calendar Preview.

## Calls

- **Tasks:** polls all installed plugin vault/*/state.md files

## Vault Output

`vault/ben/01_briefs/brief-YYYY-MM-DD-am.md`
