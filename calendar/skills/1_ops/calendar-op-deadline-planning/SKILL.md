---
name: arlive-calendar-deadline-planning
type: op
cadence: on-demand
description: >
  On-demand deadline planner; given a deadline date and task scope, works backward
  from the due date to create a preparation schedule with milestones, effort estimates,
  and calendar placement recommendations.
  Triggers: "plan deadline", "work backward from deadline", "deadline prep".
---

# arlive-calendar-deadline-planning

**Cadence:** On-demand (any time a new deadline is given)
**Produces:** A milestone preparation schedule in `vault/calendar/00_deadlines/` and a new entry in `vault/calendar/open-loops.md`.

## What it does

Takes a deadline date and scope description as input and constructs a reverse-engineered preparation schedule. Identifies the natural milestones between now and the deadline (research, drafting, review, finalization), assigns realistic effort estimates to each phase, and maps them onto available calendar dates accounting for existing focus time constraints and other known deadlines. Flags if the deadline is dangerously close with insufficient lead time given the stated scope and recommends either a scope reduction or escalation path. The output is a milestone file in `vault/calendar/00_deadlines/` that other ops (like weekly agenda) will pick up automatically. Also runs `arlive-calendar-add-deadline` to register the item in the vault and writes it to open loops so it surfaces in cross-domain deadline scans.

## Calls

- **Flows:** `arlive-calendar-collect-deadlines`
- **Tasks:** `arlive-calendar-add-deadline`

## Apps

vault file system

## Vault Output

`vault/calendar/00_deadlines/`
