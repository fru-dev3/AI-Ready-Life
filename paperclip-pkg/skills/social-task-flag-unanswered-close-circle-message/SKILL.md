---
type: task
trigger: user-or-flow
description: >
  Daily Gmail scan for unread or unreplied messages from close-circle contacts
  (Tier 1 + family-immediate) older than 24 hours. Writes flags to open-loops so
  response-time-to-close-circle stays inside the 24h paragon benchmark.
---

# social-flag-unanswered-close-circle-message

**Trigger:**
- Called by: `op-review-brief` (daily), `op-family-relationships-review`
- User input: "any unanswered messages from close circle"

## What It Does

The relationship-health system flags overdue *outbound* contact at the week and month timescale. This task closes a tighter loop: *inbound* messages from close-circle contacts that the user hasn't replied to within 24 hours. Slow replies to close-circle messages erode the relationship faster than missed outreach windows do, because the other person already initiated.

**Scope:** Contacts tagged `tier: 1` (inner circle) or `tier: family, sub-tier: immediate` in `contacts.md`. Other tiers are intentionally excluded to keep the signal focused.

**Source:** Native Gmail connector. Looks for messages received in the last 7 days from in-scope contacts where the user has not sent a reply, and where the message is older than 24 hours. Read/unread status alone is not enough — a read-but-unreplied message still counts.

**Output:** Each unanswered message becomes an entry in `open-loops.md` with severity HIGH if the message is >72 hours old or contains question marks / explicit asks, MEDIUM otherwise. The flag includes contact name, message subject, age in hours, and a one-line context line ("they asked about X").

Resolution is automatic: the next time this task runs, if a reply has been sent the flag is closed.

## Steps

1. Read `contacts.md`; collect close-circle contacts (Tier 1 + family-immediate) with email
2. Query Gmail (last 7 days, `from:` close-circle, `-in:sent`) for messages
3. For each message: check if a reply was sent in the same thread by user
4. If no reply and age >24h: build flag entry
5. Severity: HIGH if age >72h or message contains `?`; otherwise MEDIUM
6. Call `task-update-open-loops` with each flag (dedup on thread id)

## Configuration

`vault/social/config.md`:
- `response_time_threshold_hours` (default 24)
- `response_time_high_severity_hours` (default 72)
- `close_circle_tiers` (default `[1, family-immediate]`)

## Vault Paths

- Reads: `00_current/contacts.md`, native Gmail
- Writes via task: `open-loops.md`
