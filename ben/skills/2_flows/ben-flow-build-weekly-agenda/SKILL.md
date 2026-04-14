---
name: arlive-ben-flow-build-weekly-agenda
type: flow
trigger: called-by-op
description: >
  Builds a week-ahead view with all cross-domain deadlines, meetings, top priorities, and focus
  time block recommendations.
---

# arlive-ben-build-weekly-agenda

**Trigger:** Called by `arlive-ben-weekly-preview`
**Produces:** Structured weekly agenda with deadline calendar, priorities, focus time recommendations, and backlog summary

## What it does

Receives the collected domain alerts and open loops from the calling op and builds a week-ahead
structured agenda document. First constructs a deadline calendar: a table with columns for day of
week, domain, item description, and priority — populated only with items that have explicit due
dates or deadlines falling within the next 7 days. Any domain that has no time-sensitive items
this week still appears with a "no deadlines this week" note so the user can see the full picture.
Then builds a "top priorities" section — the 3 to 5 highest-priority items that require action
this week regardless of whether they have a strict deadline. These are chosen based on priority
marker, domain health, and recency of last review. Reads calendar data from vault/calendar/ if
installed to assess meeting load per day, then generates focus time recommendations: suggests
which days have sufficient open calendar time for deep work and estimates total focused hours
available. Closes with a backlog count summary (total open loops by domain) so the user sees
what's accumulating versus what's being resolved week over week.

## Configuration

If the calendar plugin is installed, vault/calendar/ must contain the current week's calendar
data in a readable format. Optionally set "focus block minimum" (default: 2 hours) in
vault/ben/config.md to control what qualifies as usable focus time.

## Steps

1. Read calendar deadlines from vault/calendar/ for the next 7 days if the plugin is installed
2. Collect cross-domain open loop items with due dates in the next 7 days from domain alerts
3. Identify top 3-5 priorities requiring deep work this week based on priority and domain health
4. Assess calendar meeting load per day; suggest focus time blocks on lighter days

## Apps

None

## Vault Output

`vault/ben/02_agenda/`
