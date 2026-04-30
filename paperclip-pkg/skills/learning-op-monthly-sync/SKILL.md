---
type: op
cadence: monthly
description: >
  Full learning monthly process on the 1st of each month. Refreshes course
  progress from configured platforms, updates reading list and current-book
  status, recalculates certification exam timelines, runs unified pace review
  (absorbs the old `op-progress-review`), evaluates monthly goal vs. actual,
  and tops with a learning brief.
  Triggers: "learning monthly sync", "sync learning data", "refresh learning
  vault", "monthly learning review", "learning progress review", "am I on track
  with learning".
---

## What It Does

Single monthly op that does both the data refresh *and* the pace review. Earlier versions of this plugin split those into two ops (`op-monthly-sync` + `op-progress-review`) — same cadence, same inputs, same outputs. Now merged. Runs on the 1st of each month and produces the canonical monthly snapshot.

**Layer 1 — platform refresh.** For each configured platform (Coursera, Udemy, LinkedIn Learning, Pluralsight, A Cloud Guru, O'Reilly, edX, Educative): connect via Playwright (cookie session), pull current completion percentage, last activity date, and any upcoming assignment deadlines. Save to `vault/learning/00_current/` with a sync timestamp. Login expiry on any platform is non-fatal — note it, continue with the rest, prompt the user to re-auth.

**Layer 2 — reading + book sync.** Update `vault/learning/00_current/current-reading.md` from Goodreads RSS (if `goodreads_rss_url` configured) or from the manual entry. Move newly completed books from `current-reading.md` to `completed.md` (YTD log). The reading queue is owned by `task-update-reading-list` — this op only refreshes status / current book.

**Layer 3 — certification timeline.** For each certification in `vault/learning/00_current/certs.md` with an exam date: compute hours logged, hours remaining (estimated total minus logged), and required daily study pace to reach exam-ready by the date. Flag certs whose current pace will miss the exam date.

**Layer 4 — unified pace review (absorbed from `op-progress-review`).** Calls `flow-build-learning-summary` to get the urgency-ranked table across courses, certs, books, papers, and projects. For every behind item (>15 pts behind time-elapsed): compute the recovery daily pace and call `task-flag-falling-behind`. Calls `flow-build-streak-summary` for behavioral consistency overlay.

**Layer 5 — monthly goal vs actual.** Reads monthly milestone targets from the active theme (`theme-YYYY-MM.md` written by `op-monthly-theme-set`) and from `monthly_completion_target` in config. Computes achievement rate. If <70% of milestones hit, surfaces shortfall items.

**Layer 6 — brief.** Writes `vault/learning/02_briefs/monthly-sync-YYYY-MM.md` with all five layers' output and an executive summary at the top.

## Triggers

- "learning monthly sync"
- "sync learning data"
- "refresh learning vault"
- "monthly learning review"
- "learning progress review"
- "am I on track with my learning"
- "check my courses"

## Steps

1. Read `vault/learning/config.md` — confirm active platforms, profile paths, `annual_book_goal`, `daily_study_minutes`, `monthly_completion_target`.
2. For each active platform: Playwright sync (headless=False); update progress in `vault/learning/00_current/`. On login expiry: note and continue.
3. Refresh `current-reading.md` from Goodreads RSS or manual log; promote completions to `completed.md`.
4. Update `certs.md` with study-hours-logged and required-pace per cert with an exam date.
5. Call `flow-build-learning-summary` — get urgency-ranked table + per-type rollups + streak overlay.
6. For each item flagged behind: call `task-flag-falling-behind` with full pace data.
7. Read theme + `monthly_completion_target`; compute milestones-hit / planned. Surface shortfall items.
8. Call `task-track-learning-budget` to refresh balance and apply expiry flags.
9. Call `flow-scan-emerging-sources` if `horizon_sources` configured (input to next month's theme).
10. Write `vault/learning/02_briefs/monthly-sync-YYYY-MM.md`.
11. Call `task-update-open-loops` with all flags from this run.

## Input

- `~/Documents/aireadylife/vault/learning/config.md`
- Learning platforms via Playwright (Coursera, Udemy, LinkedIn Learning, etc.)
- Goodreads RSS or `~/Documents/aireadylife/vault/learning/00_current/current-reading.md`
- `~/Documents/aireadylife/vault/learning/00_current/certs.md`
- `~/Documents/aireadylife/vault/learning/00_current/theme-YYYY-MM.md`
- `~/Documents/aireadylife/vault/learning/01_prior/`

## Output Format

**Monthly Sync Brief** — `vault/learning/02_briefs/monthly-sync-YYYY-MM.md`

```
## Learning Monthly Sync — [Month Year]
Sync completed: [timestamp]

### Executive Summary
On track: X / Y items | Behind: X | Ahead: X
This month's theme: [theme] — applied output: [shipped / draft / not yet]
Streak: X-day current ([on target / at risk / broken])

### Pace Table (urgency-ranked)
[BEHIND] [Title] — Completion X% | Elapsed X% | Recovery: X units/day
[ON PACE] [Title] — Completion X% | Elapsed X% | Target [date]
[AHEAD]  [Title] — Completion X% | Elapsed X%

### Reading
Books YTD: X / annual goal X (X%) | Current pace: X books/month
Current book: [title] — X% | Projected completion: [date]

### Certifications
[Cert] — Exam [date] — Hours X of X — Readiness X% — [On track / At risk]

### Monthly Goal Achievement
Milestones planned: X | Hit: X | Achievement rate: X%
Shortfall: [items]

### Budget
Spent: $X of $X | Remaining: $X | Days to expiry: X | Flags: [if any]

### Horizon (next-month input)
Top 5: [topics from flow-scan-emerging-sources]
```

## Configuration

`vault/learning/config.md`:
- `active_platforms` — list of `{platform, chrome_profile_path}`.
- `annual_book_goal` (target books per year)
- `daily_study_minutes` (daily study target)
- `monthly_completion_target` (items to complete this month)
- `pace_delta_threshold` (default 15)

## Error Handling

- **Platform login expired:** record which platform; continue with the others; surface to user.
- **No active items:** report empty table — not an error.
- **Goodreads RSS unavailable:** fall back to `current-reading.md`.
- **No theme set for the month:** note, recommend running `op-monthly-theme-set`.
- **No certifications configured:** skip Layer 3 with note.

## Vault Paths

- Reads: `vault/learning/config.md`, `vault/learning/00_current/`, `vault/learning/01_prior/`
- Writes: `vault/learning/00_current/`, `vault/learning/02_briefs/monthly-sync-YYYY-MM.md`, `vault/learning/open-loops.md`
