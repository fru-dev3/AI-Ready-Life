---
name: arlive-calendar-flow-analyze-focus-time
type: flow
trigger: called-by-op
description: >
  Analyzes the ratio of meetings vs. unblocked focus time across the past week
  and upcoming week, comparing against a 10-hour focus goal and identifying
  which days have the best and worst deep work conditions.
---

# arlive-calendar-analyze-focus-time

**Trigger:** Called by `arlive-calendar-focus-time-review`
**Produces:** A focus time analysis with meeting totals, focus totals, deficit flags, and per-day quality scores passed back to the calling op.

## What it does

Reads calendar data from `vault/calendar/01_focus/` to calculate a detailed breakdown of time allocation for both the past 7 days and the upcoming 7 days. Counts total meeting hours (scheduled events with participants), identifies back-to-back meeting segments that prevent cognitive recovery, and measures uninterrupted blocks of 90 minutes or longer as true focus time (shorter blocks don't qualify as deep work). Calculates a per-day focus quality score based on the longest uninterrupted block, number of context switches, and total focus hours. Compares weekly totals against a 10-hour focus goal. If the goal is missed, identifies the specific meeting clusters or scheduling patterns that caused the deficit — recurring meetings that could be batched, short gap filler meetings that fragment afternoons, or early-week meeting loads that burn focus capital before the week's real work begins. Returns both the numeric analysis and a plain-language diagnosis of what's eating focus time.

## Steps

1. Read calendar event log from `vault/calendar/01_focus/` for the past and upcoming week
2. Calculate total meeting hours (all scheduled events with external participants)
3. Identify back-to-back meeting clusters (gaps of <30 min between events)
4. Measure all uninterrupted blocks of ≥90 minutes as qualifying focus time
5. Calculate per-day focus quality score (longest block, context switches, total focus hours)
6. Compare weekly focus total to 10-hour goal and calculate deficit
7. Identify which specific meetings or patterns are the primary focus time drains
8. Flag days with <2 hours of qualifying focus time as focus-hostile days

## Apps

Google Calendar (read), vault file system

## Vault Output

`vault/calendar/01_focus/`
