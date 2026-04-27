---
type: task
trigger: called-by-flow-or-op
description: >
  Single write-point wrapper for every agent-initiated calendar create or update. Drafts the
  payload, presents it to the user for explicit approval, and only then writes via the native
  MCP calendar connector (preferred) or `app-gcalendar` (fallback). Enforces the paragon's
  rule that agent-added events are confirmed before creation, and applies the standard naming
  convention so downstream skills can detect agent-authored events.
---

# calendar-create-confirmed-event

**Trigger:** Called by every skill that writes events: `flow-protect-recurring-blocks`,
`task-add-meeting-prep`, `task-add-travel-buffer`, `task-import-birthdays-from-social`,
`task-block-after-travel-recovery`, `op-holiday-observance-sync`, `op-deadline-planning`.

**Produces:** New or updated event on the user's calendar; never writes without explicit approval.

## What It Does

Receives a draft payload (title, calendar id, start, end, recurrence, description, color, action: create/update/delete). Normalizes the title to convention, presents the full payload to the user, and waits for explicit approval ("yes", "create", "approve") before writing.

**Naming conventions enforced:**
- Protected blocks: `[Protected: {type}] — {label}`
- Travel buffers: `[Buffer: {direction}] — {trip}`
- Birthdays: `[Birthday] {name}`
- Holidays: `[Holiday] {observance}`
- Recovery blocks: `[Recovery] — {trip}`
- Deadlines: `[Deadline] {item} ({domain})`

**Approval modes:**
- **Single:** user approves one event; write executes.
- **Batch:** caller passes a list (e.g., `flow-protect-recurring-blocks` writing 6 blocks). Task presents all as a numbered list; user can approve all, none, or a subset by index.
- **Auto-approved class:** if `auto_approve_types` in config lists a type (e.g., `holiday`), those writes skip approval. Empty by default — paragon prefers explicit approval.

**Idempotence:** before writing, queries for an event matching title + start; if a match exists, switches to update path with diff or skips silently if identical.

## Steps

1. Receive draft payload(s) from caller.
2. Normalize title to convention.
3. Check for existing matching event; switch action if needed.
4. Present payload(s) to user with full detail.
5. Await explicit approval (or skip if type is in `auto_approve_types`).
6. Write via native MCP connector (preferred); fall back to `app-gcalendar` if MCP unavailable.
7. Return event id(s) and status to caller.

## Configuration

`vault/calendar/config.md`:
- `auto_approve_types` — list of event types that bypass approval (default empty)
- `default_calendar_id` — fallback calendar when caller doesn't specify

## Vault Paths

- Reads: `vault/calendar/config.md`
- Writes: events on the configured calendar via native MCP or fallback
