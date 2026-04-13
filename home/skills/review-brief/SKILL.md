---
name: arlive-home-review-brief
type: op
cadence: weekly
description: >
  Home review brief — produced weekly when maintenance items are flagged or seasonal tasks are due.
  Compiles open maintenance, upcoming seasonal tasks, and home expenses.
  Triggers: "home brief", "home review", "maintenance check", "home status".
---

# arlive-home-review-brief

**Cadence:** Weekly (when items flagged) or on-demand
**Produces:** Home brief — open maintenance, upcoming seasonal tasks, home expenses

## What it does

Generates a home brief when triggered. Reads from vault/home/ to compile: all open maintenance items with priority and current status, seasonal tasks due in the next 2 weeks, current month's home expenses vs. prior month, and lease or contract renewal alerts within 90 days. Formats as a concise brief with ACTION ITEMS sorted by urgency.

## Configuration

Configure your vault at `vault/home/config.md` with your home type, address, and maintenance contacts. In demo mode, reads from `vault-demo/home/state.md`.

## Calls

- **Flows:** `arlive-home-build-review-brief`
- **Tasks:** `arlive-home-update-open-loops`

## Apps

`gdrive` (optional — for writing brief to Google Docs)

## Vault Output

`vault/home/03_briefs/YYYY-MM-home-brief.md`
