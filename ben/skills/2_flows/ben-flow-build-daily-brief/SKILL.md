---
name: aireadylife-ben-flow-build-daily-brief
type: flow
trigger: called-by-op
description: >
  Assembles the daily brief from domain alerts, calendar items, and open loops into a prioritized
  ACTION TODAY format with Top 3 callout, domain alert table, and full open-loops list.
---

# aireadylife-ben-build-daily-brief

**Trigger:** Called by `aireadylife-ben-daily-brief`
**Produces:** Fully formatted daily brief document ready to write to vault/ben/00_briefs/

## What it does

Receives the collected domain alerts and calendar items from the calling op and builds the final
brief document. First, applies a prioritization algorithm to rank all items: 🔴 urgent items
(overdue, today's deadline, auth/action gate) rank highest, followed by 🟡 watch items due within
7 days, then 🟢 info items. Selects the top 3 highest-priority actionable items across all domains
to surface as the "ACTION TODAY" callout at the very top of the brief — these are the three things
the user must not miss today. Builds a domain alert table with one row per installed plugin showing:
plugin name, last-run date, active flag count, and top flag description. Builds a calendar section
listing all items due today and within 24 hours from vault/calendar/ (shows "No calendar items"
if the calendar plugin is not installed). Builds the open loops section as a grouped list by domain,
showing all unresolved items sorted by priority within each group. Calls flag-urgent-item for each
🔴 item to ensure cross-domain urgent items are preserved in vault/ben/01_alerts/.

## Configuration

The Top 3 selection logic prefers items with explicit due dates over open-ended flags. If fewer
than 3 items are 🔴, it fills remaining slots with the highest-priority 🟡 items.

## Steps

1. Read domain alerts from vault/*/open-loops.md (all installed plugins) as provided by calling op
2. Read calendar items due today from vault/calendar/ if the calendar plugin is installed
3. Prioritize all items by urgency (🔴 first, then 🟡, then 🟢); select Top 3 actions
4. Format as: ACTION TODAY callout + domain alert table + calendar section + open loops by domain

## Apps

None

## Vault Output

`vault/ben/00_briefs/`
