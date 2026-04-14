---
name: arlive-calendar-flow-build-agenda
type: flow
trigger: called-by-op
description: >
  Builds a week-ahead agenda combining cross-domain deadlines, calendar events,
  and priority open loops — then suggests 2-3 focus blocks for deep work items.
---

# arlive-calendar-build-agenda

**Trigger:** Called by `arlive-calendar-weekly-agenda`
**Produces:** A structured week-ahead agenda document with ranked priorities and suggested focus block placements, written to `vault/calendar/02_agenda/`.

## What it does

Combines three input streams — deadline items from `arlive-calendar-collect-deadlines`, calendar events already logged in `vault/calendar/02_agenda/`, and high-priority open loops from any installed plugin — into a single ranked weekly agenda. Applies a ranking algorithm: items due this week rank highest, followed by items due next week that require preparation this week, followed by open decisions blocking other work, followed by make-progress items with no hard deadline. After ranking, it identifies the 2-3 items that require the longest uninterrupted blocks (deep reading, writing, analysis, financial review) and suggests specific calendar slots for those focus blocks based on the focus time analysis from `vault/calendar/01_focus/`. The final output is a dated markdown file with a "This Week" priority list, a focus block calendar proposal, and a section for deferred items that don't need attention this week but are on the radar.

## Steps

1. Run `arlive-calendar-collect-deadlines` to gather all cross-domain items due within 7 days
2. Read any existing calendar events logged in `vault/calendar/02_agenda/`
3. Read high-priority (flagged) open loops from all installed plugin vaults
4. Rank all items by urgency, deadline proximity, and blocking status
5. Identify the 2-3 items requiring deep work blocks (>90 min uninterrupted)
6. Suggest focus block calendar slots based on available low-meeting days
7. Write the complete week agenda to `vault/calendar/02_agenda/YYYY-MM-DD-week-agenda.md`

## Apps

vault file system

## Vault Output

`vault/calendar/02_agenda/`
