---
type: op
cadence: per-cycle
description: >
  When the user is going for promotion: tracks the visibility log (where you've been seen by
  leadership and skip-levels), sponsor list (named senior advocates and current relationship
  state), stretch-projects-in-flight, and the decision timeline. Runs monthly during a
  promotion cycle; idle otherwise. Triggers: "promotion campaign", "going for promo",
  "promotion check-in", "track my promo case".
---

# career-promotion-campaign

**Cadence:** Monthly during an active promotion cycle; only active when `targeting_promotion: true` in config and a `promo_cycle_end_date` is set.

## What It Does

Promotion outcomes are decided as much by visibility and sponsorship as by raw work output. This op is the structured layer over a campaign that would otherwise live in head and Slack. It runs monthly during a cycle and produces a one-page status.

**Five tracked artifacts:**

1. **Visibility log** — every documented exposure to leadership and skip-levels in the cycle: presented at staff meeting, demo at all-hands, doc reviewed by VP, mentioned in a leader's update, ran a workshop, owned a customer escalation visible to exec. Per entry: date, audience tier (manager / skip / VP / SVP / exec), surface (synchronous / async-doc / mentioned-by-others), outcome signal (positive / neutral / unclear).

2. **Sponsor list** — 2-5 senior people who have or could advocate. Per sponsor: name, current relationship state (active sponsor, supportive but quiet, neutral, needs warming), last meaningful interaction, what they would say in calibration, what they need from you to say more.

3. **Stretch projects in flight** — projects that demonstrate above-bar scope. Per project: title, stated scope vs. above-bar scope-claim, status, exposure plan (where will this surface to which audience), expected close date relative to the cycle deadline.

4. **Gap-vs-bar analysis** — runs `flow-build-skills-gap-summary` against the next-level JD scoped to the dimensions on the company's promotion form (configured in `next_level_competencies`). Surfaces dimensions still under-evidenced with the cycle calendar in mind.

5. **Decision timeline** — promo cycle dates: nominations, packets due, calibration, decisions communicated. Reminders fire 30 / 14 / 7 / 3 days before each milestone.

**Output:** `vault/career/02_briefs/YYYY-MM-promo-campaign.md` — one page status. Calls `task-update-open-loops` with the highest-priority gap and the next milestone.

## Triggers

- "promotion campaign"
- "promo check-in"
- "going for promo"
- "track my promo case"
- "promo packet status"

## Steps

1. Confirm `targeting_promotion: true` and read `promo_cycle_end_date`, `next_level_competencies`, `next_level_jd_path` from config.
2. Read or update visibility log (`vault/career/00_current/promo-visibility.md`).
3. Read or update sponsor list (`vault/career/00_current/promo-sponsors.md`).
4. Read or update stretch-projects file (`vault/career/00_current/promo-stretch.md`).
5. Run gap analysis vs. next-level JD scoped to competency list.
6. Compute days-until each upcoming cycle milestone.
7. Synthesize one-page status; identify the single highest-priority gap and the next milestone action.
8. Write to `vault/career/02_briefs/YYYY-MM-promo-campaign.md`.
9. Call `task-update-open-loops` with the highest-priority gap and milestone reminder.

## Configuration

`vault/career/config.md`:
- `targeting_promotion` (bool)
- `promo_cycle_start_date`, `promo_cycle_end_date`
- `promo_milestones` (list of date+name pairs)
- `next_level_competencies` (list)
- `next_level_jd_path` (file path)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/career/00_current/promo-*.md`, `achievements.md`, `vault/career/config.md`
- Writes: `~/Documents/aireadylife/vault/career/02_briefs/YYYY-MM-promo-campaign.md`, `open-loops.md`
