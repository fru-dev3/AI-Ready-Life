---
name: chief-flow-build-weekly-agenda
type: flow
trigger: called-by-op
description: >
  Builds a week-ahead view with all cross-domain deadlines, meetings, top priorities, and focus
  time block recommendations.
---

# chief-build-weekly-agenda

**Trigger:** Called by `chief-op-weekly-preview`
**Produces:** Structured weekly agenda document written to ~/Documents/aireadylife/vault/chief/00_current/week-YYYY-MM-DD.md

## What It Does

This flow receives the collected domain alerts, calendar data, and backlog summary from the calling op and assembles the structured weekly agenda. It is a pure formatting and synthesis engine — all data collection happens upstream in the calling op.

**Deadline calendar construction:** The flow builds a table of all deadline items falling within the next 7 days, one row per item. Items are sourced from: (a) open loop items with explicit due dates in the next 7 days, extracted from the domain alerts list, and (b) deadline records from vault/calendar/00_current/ if the calendar plugin is installed. The table columns are: Day of Week, Domain, Item Description, Priority. Each day of the week appears in the table regardless of whether it has items — days with no deadlines show "No deadlines." This prevents the false impression that all deadlines were accounted for.

**Top priorities selection:** The flow selects 3-5 priority items for the week that require active work regardless of whether they have a strict deadline. Priority selection criteria: (1) any 🔴 item without a hard deadline this week that still requires meaningful effort, (2) high-priority 🟡 items that have been on the list for 2+ weeks without movement, (3) OKR-aligned objectives from vault/vision/00_current/ if provided by the calling op. Each priority item includes a brief explanation of why it's a priority this week rather than next week.

**Focus time recommendations:** Using the per-day meeting load data provided by the calling op (from vault/calendar/), the flow calculates: total meeting hours per day, the longest single uninterrupted block per day, and which days have at least one 90+ minute block available for deep work. Days with 90+ minute blocks are recommended for complex tasks. Days with back-to-back meetings (under 30-minute gaps between events) are flagged as focus-hostile. If no calendar data is available, this section notes "Calendar plugin not installed" without skipping the section entirely.

**Backlog summary:** Renders the backlog count data provided by chief-task-check-open-loops as a formatted table (Domain | Total | 🔴 | 🟡 | 🟢). Adds a note if any domain has 5+ unresolved items (potential backlog accumulation) or if the total count has grown compared to the prior week's brief.

## Steps

1. Receive domain alerts, calendar data, OKR data (optional), and backlog summary from calling op
2. Extract items with due dates in the next 7 days; sort by day then by priority
3. Build deadline calendar table: one row per deadline item, one "No deadlines" row per empty day
4. Identify 3-5 priority items for the week using selection criteria (🔴 no deadline, aged 🟡, OKR alignment)
5. Write brief explanation for why each priority item matters this week
6. Build per-day focus time analysis: meeting hours, longest free block, focus-hostile days
7. Flag days with 90+ min available block as "best for deep work"
8. Flag days with back-to-back meeting clusters as "focus-hostile"
9. Render backlog summary table; add accumulation notes where applicable
10. Assemble complete weekly agenda in standard four-section format
11. Return formatted document to calling op for vault write

## Input

- Sorted domain alerts list with due dates (from chief-flow-collect-domain-alerts, via calling op)
- Per-day calendar meeting load data (from vault/calendar/, via calling op)
- OKR data (from vault/vision/00_current/, optional, via calling op)
- `vault/chief/01_prior/` — prior period records for trend comparison
- Backlog counts by domain and tier (from chief-task-check-open-loops, via calling op)

## Output Format

```
# Weekly Preview — Week of [Month DD, YYYY]

## This Week's Deadlines
| Day       | Domain    | Item                                   | Priority |
|-----------|-----------|----------------------------------------|----------|
| Monday    | tax       | Q1 estimated payment due               | 🔴       |
| Tuesday   | —         | No deadlines                           | —        |
| Wednesday | benefits  | HSA enrollment change window closes    | 🟡       |
| Thursday  | —         | No deadlines                           | —        |
| Friday    | calendar  | Weekly agenda review                   | 🟢       |

## Top Priorities This Week
1. [Item] — [Domain] — [Why this week: specific reason]
2. [Item] — [Domain] — [Why this week: specific reason]
3. [Item] — [Domain] — [Why this week: specific reason]

## Focus Time Recommendations
Best days for deep work:
- Tuesday: 3.5 hours available (09:00–12:30 free)
- Thursday: 2.5 hours available (13:00–15:30 free)

Focus-hostile days:
- Wednesday: 4 back-to-back meetings (09:00–13:00), max free block 45 min

[or: "Calendar plugin not installed — install to enable focus time recommendations."]

## Backlog Summary
| Domain   | Total | 🔴 | 🟡 | 🟢 |
|----------|-------|----|----|-----|
| tax      | 3     | 1  | 0  | 2  |
| benefits | 2     | 0  | 1  | 1  |
| TOTAL    | 5     | 1  | 1  | 3  |
[Note: benefits has grown 3 consecutive weeks — consider running benefits-op-review-brief]
```

## Configuration

- `focus_block_minimum_hours` — from vault/chief/config.md; default 1.5 (90 minutes)
- `weekly_priorities_override` — manual priorities in vault/chief/00_current/ that take precedence over auto-generated priorities

## Error Handling

- **No items with due dates this week:** Show all days as "No deadlines" in table; still populate priorities section from 🔴 and aged 🟡 items.
- **Calendar data missing:** Show focus time section with "Calendar plugin not installed" note rather than an empty section.
- **Fewer than 3 priority items identified:** Show however many exist; do not pad.

## Vault Paths

- Reads from: `~/Documents/aireadylife/vault/chief/01_prior/` — prior period records
- Reads from: inputs passed by calling op (no direct vault reads)
- Writes to: ~/Documents/aireadylife/vault/chief/00_current/week-YYYY-MM-DD.md (via calling op)
