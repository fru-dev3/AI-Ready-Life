---
type: task
trigger: user-or-flow
description: >
  Sets a weekly outreach target (e.g., "3 outreach messages, 1 coffee chat, 1
  phone call") and tracks progress against it. Surfaces progress in op-review-brief
  so social effort becomes an explicit weekly goal rather than a vibes-based intent.
---

# social-set-weekly-outreach-goal

**Trigger:**
- User input: "set my weekly outreach goal", "what's my outreach goal this week", "log an outreach toward goal"
- Called by: `op-review-brief` (for progress display)

## What It Does

Most relationship maintenance fails not because the user doesn't care but because there's no commitment count to hit. This task makes the count explicit. The user sets a weekly target by channel — for example, `messages: 3, coffee_chats: 1, calls: 1, in_person: 1` — and the task tracks progress against it across the week (Mon–Sun by default, configurable).

Progress comes from two sources, joined by week:
1. **Native signals** via `task-pull-relationship-signals-from-gmail-calendar` — outbound Gmail messages and Calendar meetings count automatically.
2. **Manual log** via `task-log-interaction` — phone calls, texts, in-person interactions count when logged.

Each week the goal rolls over. The prior week's goal vs actual is preserved in `01_prior/outreach-goals/YYYY-WW.md` so the user can look at the trailing 4–8 weeks and adjust the target if it's persistently missed or trivially exceeded.

The op-review-brief surfaces the in-progress count: "Outreach: 2/3 messages, 1/1 coffee, 0/1 call, 0/1 in-person — one call short with 2 days left."

## Steps

1. For "set goal": write target to `00_current/outreach-goal.md` with effective-from date
2. For progress check: count the current week's outbound Gmail (sent), Calendar meetings (with contacts), and manual interactions
3. Compare against the target by channel
4. Return progress summary
5. On Sunday end-of-week: archive the week's actuals to `01_prior/outreach-goals/YYYY-WW.md`

## Configuration

`vault/social/config.md`:
- `outreach_goal_default` — channel-keyed defaults
- `outreach_week_start` (default Monday)

## Vault Paths

- Reads: `00_current/outreach-goal.md`, `00_current/last-signals.md`, `01_interactions/`, native Gmail, native Calendar
- Writes: `00_current/outreach-goal.md`, `01_prior/outreach-goals/YYYY-WW.md`
