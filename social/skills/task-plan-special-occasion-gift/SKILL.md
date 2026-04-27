---
type: task
trigger: user-or-flow
description: >
  Surfaces upcoming gift occasions (birthdays, anniversaries, weddings, baby
  showers, holidays, graduations) with lead-time, budget, and idea log. Most
  adults forget gifts they meant to give; this task makes the planning explicit.
---

# social-plan-special-occasion-gift

**Trigger:**
- User input: "any gifts coming up", "plan a gift for X", "log a gift idea"
- Called by: `op-birthday-watch`, `op-family-relationships-review`, `op-review-brief`

## What It Does

Maintains a gift-planning ledger keyed off occasion dates pulled from `contacts.md` (birthdays, anniversaries) and from a manually maintained `00_current/occasions.md` file (weddings, baby showers, graduations, holidays where the user gives gifts). For each upcoming occasion within the configurable lead-time window, the task surfaces:

- Recipient + relationship context
- Days until the occasion
- Configured budget for that recipient (or default by tier)
- Logged ideas (running list — user adds candidate ideas over time, not all at once)
- Status: idea-stage / chosen / purchased / wrapped / sent
- Shipping or delivery deadline if remote

The skill works in two modes:
**Read mode:** "any gifts coming up" — returns a table of all occasions in the lead-time window with status.
**Write mode:** "log a gift idea for [Name] — [idea]" / "mark [recipient]'s gift as purchased" — appends or updates the entry.

A gift idea is *logged*, not committed — the user can collect 3–5 candidate ideas before choosing. Status tracking prevents the common failure of buying twice or assuming someone else handled it.

## Steps

1. For "any gifts coming up": read `contacts.md` birthdays/anniversaries + `occasions.md`; filter to lead-time window
2. Join with `gifts.md` ledger to get status, budget, ideas
3. Return formatted table sorted by date
4. For "log idea" / "mark purchased": append to `gifts.md` entry for that occasion
5. If occasion within shipping window and status still `idea-stage`: flag to `open-loops.md`

## Configuration

`vault/social/config.md`:
- `gift_lead_time_days` (default 30)
- `gift_budget_by_tier` (default T1: $75, T2: $40, T3: $25, family-immediate: $150)
- `shipping_buffer_days` (default 7) — flag if remote occasion is within this window and not yet purchased

## Vault Paths

- Reads: `00_current/contacts.md`, `00_current/occasions.md`, `00_current/gifts.md`
- Writes: `00_current/gifts.md`, `open-loops.md`
