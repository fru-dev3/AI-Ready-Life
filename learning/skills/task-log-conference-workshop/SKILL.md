---
type: task
trigger: user-or-flow
description: >
  Logs a conference / workshop / talk / meetup attendance: event, dates, sessions,
  takeaways, contacts made, follow-up actions. Cross-pollinates with the social
  domain via `task-link-learning-to-domain` (target_domain=social) when contacts
  are recorded.
---

# learning-log-conference-workshop

**Trigger:**
- User input: "log conference", "log workshop", "log talk attended", "log meetup"
- Called by: `task-track-learning-budget` (when expense category is `conference`), `op-monthly-reflection`

## What It Does

Single-entry log per event so the value of conferences (which are often the year's biggest learning spend) is captured rather than evaporating in three days.

**Per-event fields:**
- `event_name`, `format` (in-person / hybrid / virtual), `location`, `dates_start_end`, `cost`, `funded_by` (self / employer-budget / scholarship).
- `sessions_attended` — list with title, speaker, 1-line takeaway each.
- `top_3_takeaways` — across the whole event, ≤2 sentences each.
- `contacts_made` — list of `{name, role / company, contact_method, follow_up_by_date}`. Each generates a record in social domain via `task-link-learning-to-domain`.
- `follow_up_actions` — concrete to-dos with owner=user, due dates. Each writes to open-loops.
- `would_attend_again` — yes / no / depends. Honest signal for next year's calendar.
- `linked_theme` — optional link to monthly theme.

**Side-effects:**
- If `cost` is non-zero, push to `task-track-learning-budget` (category=conference).
- For each contact: push to `task-link-learning-to-domain` (target_domain=social).
- Each `follow_up_action` becomes an open-loops entry with the due date.

## Steps

1. Read input or prompt user for fields.
2. Append to `vault/learning/00_current/conferences.md`.
3. Push cost to budget ledger (if any).
4. Push contacts to social cross-link.
5. Push follow-ups to open-loops.

## Configuration

`vault/learning/config.md`:
- `conference_followup_default_days` (default 14)

## Vault Paths

- Writes: `vault/learning/00_current/conferences.md`, `vault/learning/00_current/budget-ledger.md` (via task), `vault/social/00_current/from-learning.md` (via task), `vault/learning/open-loops.md`.
