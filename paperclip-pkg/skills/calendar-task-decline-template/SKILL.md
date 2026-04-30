---
type: task
trigger: user-or-flow
description: >
  Pre-built "no" responses + reschedule proposals for common meeting-request patterns.
  Reduces friction in protecting time. Given a meeting request (or detected protected-block
  conflict), drafts a polite decline or counter-propose-time response in the user's voice,
  ready to send. Never auto-sends.
---

# calendar-decline-template

**Trigger:**
- User input: "draft decline for {meeting}", "say no to {meeting}"
- Called by: `op-conflict-scan` when a meeting violates a protected block

**Produces:** Drafted reply text returned to the user.

## What It Does

Detects the request type and selects a matching template, then personalizes with sender name, meeting topic, and (for counter-proposes) the user's next 3 available windows that satisfy `meeting_acceptance_rules`.

**Template categories:**
- **Hard decline** — meeting purpose doesn't match user's role/priorities.
- **Counter-propose** — meeting fits but conflicts with a protected block; offer 3 alternative windows.
- **Async-instead** — meeting could be a doc/comment thread; propose async path with a doc link or short answer.
- **Delegate** — meeting belongs on someone else's plate; offer the right person + a short context.
- **Defer-to-future** — meeting is fine but premature; propose a check-back date.

**Tone calibration:** reads `decline_voice` from config (default `warm-direct`); supports `formal`, `terse`, or a custom example block.

**Never sends:** the task always returns the draft to the user. Sending is gated on the no-outbound-messages rule and requires explicit user action.

## Steps

1. Receive request context: sender, topic, time, conflict reason.
2. Classify into one of five template categories.
3. Personalize template; for counter-propose, compute 3 next windows from the calendar.
4. Apply tone per `decline_voice`.
5. Return draft for user review; never send.

## Configuration

`vault/calendar/config.md`:
- `decline_voice` (default `warm-direct`)
- `meeting_acceptance_rules` — windows when meetings are OK (e.g., `Tue-Thu 13:00-17:00`)
- `decline_template_overrides` (optional per-category custom text)

## Vault Paths

- Reads: `vault/calendar/config.md`, configured calendars (for next-3-windows calc)
- Writes: nothing automatically (drafts returned to user)
