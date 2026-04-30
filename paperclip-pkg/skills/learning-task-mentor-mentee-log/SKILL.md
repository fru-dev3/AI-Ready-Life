---
type: task
trigger: user-or-flow
description: >
  v2 — only relevant for users in formal mentor / mentee relationships. Logs
  meeting cadence, topics discussed, action items, and reciprocity check.
  Cross-domain with social. Skipped cleanly when no relationships configured.
---

# learning-mentor-mentee-log

**Trigger:**
- User input: "log mentor meeting", "log mentee session", "log coaching session"
- Called by: `op-monthly-reflection`, `task-track-learning-budget` (if paid coaching)

## What It Does

Skill is v2: only runs if at least one entry exists in `vault/learning/00_current/mentors-mentees.md` (the relationship roster). Otherwise, no-op.

**Roster entry per relationship:**
- `name`, `role` (mentor / mentee / peer-coach / paid-coach), `domain` (career / craft / business / parenting / language / etc.), `cadence` (e.g. monthly / biweekly), `started_date`, `paid` (yes / no), `goals` (1–3 lines).

**Per-meeting log entry:**
- `relationship_id` — links to roster entry.
- `date`, `duration_minutes`, `format` (call / coffee / video / async).
- `topics` — bullet list, ≤5.
- `action_items` — list of `{owner, action, due_date}`. Each with owner=user → open-loops.
- `value_signal` — 1–5 rating of how useful the session was.
- `reciprocity_note` — for mentor relationships: what did I bring back to the mentor / give to the mentee? Catches one-way drain.

**Cadence flags:**
- Meeting overdue by >1.5x cadence → MEDIUM open-loop.
- 3+ consecutive sessions with `value_signal` ≤ 2 → suggest re-evaluating the relationship.
- Net-zero reciprocity for >3 months on a mentor relationship → flag.

## Steps

1. If `mentors-mentees.md` empty, exit.
2. Read input — relationship_id and meeting fields.
3. Append to `vault/learning/00_current/mentor-meetings.md`.
4. Push action items to open-loops.
5. Apply cadence + reciprocity flags.

## Configuration

`vault/learning/config.md`:
- `mentor_meeting_overdue_multiplier` (default 1.5)
- `low_value_session_threshold` (default 3 consecutive ≤2)

## Vault Paths

- Reads: `vault/learning/00_current/mentors-mentees.md`.
- Writes: `vault/learning/00_current/mentor-meetings.md`, `vault/learning/open-loops.md`, `vault/social/00_current/from-learning.md` (via `task-link-learning-to-domain`, optional).
