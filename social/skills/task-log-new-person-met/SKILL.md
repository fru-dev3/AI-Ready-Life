---
type: task
trigger: user-or-flow
description: >
  Lightweight capture of someone new the user just met (event, conference, intro,
  party). Records name, context, follow-up plan, and status. Decays into the
  contact roster if followed up; archived to a "met-once" file if not, so the
  primary roster stays clean.
---

# social-log-new-person-met

**Trigger:**
- User input: "I met someone new", "log a new contact", "met [Name] at [event]"
- Called by: optional after `task-log-conference-workshop` from the learning plugin

## What It Does

Bridges the gap between meeting someone interesting and either (a) integrating them into the tracked roster or (b) cleanly letting them go. Without this skill, names from events accumulate in random notebooks and never become real contacts. With it, every new person the user meets gets a brief structured entry that ages out automatically.

**Entry fields:**
- `name`
- `met_date`
- `met_context` — event/intro source
- `topic_discussed` — what made them memorable
- `intent` — `keep-in-touch` / `professional-only` / `unsure`
- `follow_up_action` — what the user said they'd do next ("send the article", "connect on LinkedIn", "grab coffee in 2 weeks")
- `follow_up_deadline` (default +14 days)
- `status` — `pending` / `followed-up` / `archived-no-followup` / `promoted-to-contact`

**Decay rule:** If `status` is still `pending` after `follow_up_deadline + 14 days`, the entry is automatically moved to `01_prior/met-once-archive.md` and the open-loop is closed. The point is to keep the roster honest — the user doesn't gain a relationship from a single hello.

**Promotion:** If the user follows up *and* a return interaction happens, the task offers to promote the person to `contacts.md` with a default tier of T3 (active, professional) — the user can adjust.

## Steps

1. Append entry to `00_current/new-people.md` with `status: pending`
2. Write a follow-up open-loop with deadline
3. On follow-up completion: update status; if reciprocated, prompt user to promote
4. On archive sweep (run as part of `op-relationship-review`): move stale `pending` entries to `01_prior/met-once-archive.md`

## Configuration

`vault/social/config.md`:
- `new_person_followup_default_days` (default 14)
- `new_person_archive_grace_days` (default 14) — additional grace after deadline before archiving

## Vault Paths

- Reads: `00_current/new-people.md`, `00_current/contacts.md`
- Writes: `00_current/new-people.md`, `00_current/contacts.md` (on promotion), `01_prior/met-once-archive.md`, `open-loops.md`
