---
type: task
trigger: user-or-flow
description: >
  Records introductions the user makes between two of their contacts. Tracks who
  was connected to whom, when, the context, and the outcome. Functions as a
  social-capital ledger and a reciprocity reminder — making introductions is
  high-value relational currency.
---

# social-log-introduction-made

**Trigger:**
- User input: "log an intro", "I introduced X to Y", "made an intro between A and B"
- Called by: optional follow-up after `task-log-interaction` if interaction notes mention an intro

## What It Does

Tracks every introduction the user actively makes between two of their contacts. Both a quality-of-network signal (the user's network gets stronger when nodes connect to each other) and a reciprocity reminder (introductions are gifts — if someone has introduced the user to multiple people without reciprocation, that imbalance should surface).

**Entry fields:**
- `intro_id` — auto-generated
- `introduced_by` — usually the user; can be another contact (recording an inbound intro the user received)
- `person_a` / `person_b` — both must exist in `contacts.md` (or the task offers to add them)
- `date_made`
- `context` — why the intro was made (e.g., "B is hiring for the role A is targeting")
- `medium` — email / Slack / in-person / text / LinkedIn
- `expected_outcome` — what the user hopes happens (informational chat / hire / collab / friendship)
- `status` — sent / acknowledged / met / outcome-known / went-nowhere
- `outcome_notes` — added later when the user learns how it landed

**Reciprocity surface:** A monthly tally appears in `op-relationship-review` — "Intros made: 3 (A→B, C→D, E→F). Intros received: 1 (G→you, via H)." When ratio is heavily skewed, that's a reciprocity signal worth surfacing.

## Steps

1. Validate person_a and person_b exist in `contacts.md`; offer to add either if missing
2. Append entry to `00_current/introductions.md` with default `status: sent`
3. If the user provided outcome info later: update existing entry by `intro_id`
4. Optionally write a follow-up reminder to `open-loops.md` (e.g., "check in on intro outcome in 30 days")

## Configuration

`vault/social/config.md`:
- `intro_followup_days` (default 30) — automatic reminder to ask the introducees how the intro went

## Vault Paths

- Reads: `00_current/contacts.md`, `00_current/introductions.md`
- Writes: `00_current/introductions.md`, `open-loops.md`
