---
type: flow
trigger: called-by-op
description: >
  Reads recurring-block configuration (deep work, family, workout, health, focus blocks)
  and writes consistently-named recurring protected events to the user's primary calendar
  via `task-create-confirmed-event`. Enforces naming convention so downstream agents can
  detect and respect protected blocks. Called by `op-weekly-agenda` and
  `op-quarterly-time-design-rebalance`.
---

# calendar-protect-recurring-blocks

**Trigger:** Called by `op-weekly-agenda`, `op-quarterly-time-design-rebalance`, on-demand.
**Produces:** Recurring protected events on the configured `protect_blocks_calendar`.

## What It Does

Reads `recurring_blocks` from `config.md` — each entry defines a block type, day(s) of week, time window, duration, and recurrence rule. Generates the canonical event payload for each block and routes it to `task-create-confirmed-event` so the user explicitly approves each before write.

**Naming convention** (consistent across all agent-created events):
`[Protected: {block_type}] — {label}`

Examples: `[Protected: deep-work] — Morning focus`, `[Protected: family] — Dinner`, `[Protected: workout] — Strength`.

This naming convention lets `op-conflict-scan`, `op-time-allocation-review`, and `op-recurring-event-audit` detect protected blocks reliably without false positives.

**Reconciliation logic:** Before drafting a new event, the flow checks the calendar for an existing event with the same naming pattern + recurrence. If found, it diffs against the desired payload; only mismatches are surfaced for re-approval. Surplus blocks (in calendar but not in config) are flagged to the user, never auto-deleted.

## Steps

1. Read `recurring_blocks` from `vault/calendar/config.md`.
2. For each block, build the canonical event payload (title, RRULE, start, end, color, description tag).
3. Read existing events on `protect_blocks_calendar` matching `[Protected: ...]`.
4. Diff: for missing blocks → draft create; for mismatched → draft update; for surplus → flag.
5. Route every create/update through `task-create-confirmed-event` for explicit approval.
6. Return summary of approved/pending/skipped writes to caller.

## Configuration

`vault/calendar/config.md`:
- `recurring_blocks` — list of `{type, label, days, start, end, rrule}` entries
- `protect_blocks_calendar` — calendar id where protected blocks are written

## Vault Paths

- Reads: `vault/calendar/config.md`, native calendar connectors (or `app-gcalendar` fallback)
- Writes via task: protected events on configured calendar; `vault/calendar/open-loops.md` for surplus flags
