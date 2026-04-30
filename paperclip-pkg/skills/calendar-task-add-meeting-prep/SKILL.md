---
type: task
trigger: user-or-flow
description: >
  Given an event ID (or event reference), drafts an agenda + context block by pulling from
  related domain vaults (career, business, wealth, health, etc.) and writes it to the event
  description. Enforces the paragon's rule that every meeting >30 min has an agenda. Called
  by `op-daily-brief` for any flagged unprepped meeting; can also be user-triggered.
---

# calendar-add-meeting-prep

**Trigger:**
- Called by: `op-daily-brief`, `op-weekly-agenda`
- User input: "add prep to {event}", "draft agenda for {event}"

**Produces:** Updated event description on the source calendar.

## What It Does

For a target event, pulls signal from the relevant domain vault(s) and assembles a structured agenda block: purpose (1 line), desired outcome, agenda items (3–5 bullets), context links (vault paths), and questions to raise. Writes the block to the event description, prepended above any existing content; never overwrites.

**Domain inference:** title + attendees + calendar source map to a domain. Examples — `career` for recruiter/interview meetings, `business` for entity/CPA calls, `wealth` for advisor sessions, `health` for appointments, `social` for non-work 1:1s. When inference is ambiguous, the task asks the user for the domain rather than guessing.

**Context pulled per domain:**
- Open loops (top 3) from the domain's `open-loops.md`
- Most recent brief from the domain's `02_briefs/`
- Any items from the deadline registry tied to the same counterparty/topic

The write goes through `task-create-confirmed-event` (update path) so the user approves before the description is changed.

## Steps

1. Receive event ID (or fetch by title + date if id unavailable).
2. Infer domain from title, attendees, calendar; ask if ambiguous.
3. Read domain's `open-loops.md` (top 3) + most recent brief.
4. Assemble agenda block: purpose, outcome, 3–5 agenda bullets, context links, questions.
5. Route description update through `task-create-confirmed-event`.
6. Return draft to user; await approval; write on confirm.

## Configuration

`vault/calendar/config.md`:
- `meeting_prep_threshold_minutes` (default 30)
- `agenda_template` (optional override)

## Vault Paths

- Reads: `vault/{domain}/open-loops.md`, `vault/{domain}/02_briefs/`
- Writes via task: event description on source calendar
