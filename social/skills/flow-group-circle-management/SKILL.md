---
type: flow
trigger: called-by-op
description: >
  For users with named recurring groups (book club, peer group, friend group,
  parent group, mastermind), tracks group-level cadence separately from individual
  contact cadence. A group meeting counts as group health but not as individual
  one-on-one health. Optional v2 skill — only relevant when the user has named
  groups in their config.
---

# social-group-circle-management

**Trigger:** Called by `op-relationship-review`, `op-family-relationships-review` when groups are configured.
**Produces:** Group-level health entries in the relationship review brief.

## What It Does

Group friendships have their own cadence and their own decay mode. A monthly book club where the user shows up consistently is a healthy group relationship — but if they have not had a one-on-one with any individual member in 6 months, the *group* is healthy while every *individual relationship* is fading. This flow disentangles the two.

**Group definition (in `config.md`):**
- `name` — group label
- `members` — list of contact names matching `contacts.md`
- `cadence_target` — how often the group meets (weekly / biweekly / monthly / quarterly)
- `last_group_meeting` — auto-updated from interaction log entries tagged `interaction_type: group` with `group_name: X`

**Two health views per group:**
1. **Group cadence health** — Days since last group meeting vs target cadence. Flag if overdue.
2. **Member-level depth health** — For each group member, days since last *one-on-one* interaction (filter out group-only interactions). Surfaces members who exist in the user's life only as part of a group.

**Output:** Adds a `## Groups` section to the relationship review brief with one row per group: cadence status, next planned meeting, members who haven't had any 1:1 contact in N months (default 6).

## Steps

1. Read `config.md` for group definitions
2. For each group, find latest interaction tagged `group_name: X` from `01_interactions/`
3. Compute group cadence health vs target
4. For each member, compute days since last *non-group* interaction
5. Flag members with no 1:1 contact in `member_one_on_one_threshold_days`
6. Return group section for the calling op
7. Optionally call `task-flag-overdue-contact` for member-level 1:1 gaps

## Configuration

`vault/social/config.md`:
- `groups` — list of group definitions
- `member_one_on_one_threshold_days` (default 180)

## Vault Paths

- Reads: `config.md`, `00_current/contacts.md`, `01_interactions/`
- Writes via task: `open-loops.md`
