---
name: aireadylife-chief-op-daily-brief
type: op
cadence: daily
description: >
  Generates today's prioritized brief: top 3 actions, domain alerts, calendar items, and open
  loops across all installed plugins. Triggers: "morning brief", "daily brief", "what's today",
  "chief brief", "what do I need to do today".
---

# aireadylife-chief-daily-brief

**Cadence:** Daily (morning)
**Produces:** Prioritized daily brief written to vault/chief/00_briefs/ with Top 3 actions, domain alert table, calendar, and open loops

## What it does

Acts as the daily command center, aggregating signals from every installed plugin into a single
prioritized output. Calls collect-domain-alerts to scan all open-loops.md files across installed
plugin vaults and collect every unresolved flag. Calls pull-domain-status to read each plugin's
state.md for a quick domain health snapshot. Reads calendar items due today or within 24 hours
from vault/calendar/ if the calendar plugin is installed. Passes all collected signals to the
build-daily-brief flow, which ranks them by urgency and formats them into the structured brief
format: a Top 3 action callout (the three highest-urgency items the user must act on today),
a domain alert table (all plugins with their current status and active flag count), a calendar
section (meetings, deadlines, reminders due today), and an open loops section listing everything
else. Writes the dated brief to vault/chief/00_briefs/ and calls flag-urgent-item for any 🔴
items that need to be preserved in vault/chief/01_alerts/ for tracking.

## Configuration

No special configuration required beyond having plugins installed with their vault/ subfolders
present. Optionally maintain vault/chief/config.md with a list of plugin names to scan, or the
flow will auto-discover them from the vault/ directory structure.

## Calls

- **Flows:** `aireadylife-chief-collect-domain-alerts`, `aireadylife-chief-build-daily-brief`
- **Tasks:** `aireadylife-chief-pull-domain-status`

## Apps

None

## Vault Output

`vault/chief/00_briefs/daily-{date}.md`
