---
type: op
cadence: monthly
description: >
  Monthly career review brief — the single user-facing monthly entry point. Refreshes pay-stub
  data, pipeline freshness, recruiter touches, and document organization, then synthesizes
  market position, comp vs. market summary, skills-gap priorities, and 3-5 next actions into
  a dated brief. Replaces the prior split between op-monthly-sync (data refresh) and
  op-review-brief (synthesis). Triggers: "career brief", "career review", "career status",
  "how is my career", "career update", "monthly career report", "monthly career sync",
  "sync career data".
---

## What It Does

Single monthly entry point. The first half of the run refreshes data (pay stubs parsed from the configured payroll provider, pipeline freshness audit, recruiter inbox sweep, document organization, comp-to-wealth handoff). The second half synthesizes — reads the refreshed data plus the outputs of comp review, market scan, network review, and skills gap review that have run during the month and assembles a single scannable brief. The brief is saved as a dated file so you have a historical record of your career trajectory over time.

The brief has five sections. Market position: where you sit relative to the current market based on the most recent market scan — how many target roles are active, what compensation ranges look like, and any notable shifts in the market since last month. Pipeline status: a count of active applications by stage (applied, phone screen, technical, final, offer, watching), flags for anything requiring action in the next 7 days, and the overall health of your search funnel. Comp vs. market summary: your current TC percentile position based on the most recent quarterly benchmark, the gap vs. P50, and the recommended action level (none, negotiate, explore). Skills gap priorities: the top 3 skills from the quarterly gap analysis that have the highest demand in target role postings and the most impact on your candidacy, with specific learning resources for each. Next actions: exactly 3-5 concrete, dated next steps — not a list of everything you could do but the subset that will have the most impact this month.

The brief is formatted for a 2-minute read — executive summary at the top, detail sections below. It is not a data dump; it is a decision-support document. Every section either confirms that something is on track (no action needed) or identifies a specific gap and a specific action to close it.

## Triggers

- "career brief"
- "career review"
- "career status"
- "how is my career"
- "career update"
- "monthly career report"
- "monthly career sync"
- "sync career data"
- "refresh career vault"
- "show me my career"

## Steps

**Refresh phase (data sync):**
1. Read `vault/career/config.md` — confirm payroll provider, target companies, LinkedIn handle.
2. Parse the most recent pay stub via `task-parse-pay-stub` (or prompt user to drop a fresh stub if none has been added since last run). Saves to `00_current/pay-stubs.md` and flags any anomalies.
3. Run `flow-review-pipeline` — audit applications for staleness (>7 business days no response) and stalled opportunities (>14 days same stage).
4. Sweep recruiter inbox (LinkedIn + Gmail label) for new threads since last run; for each, call `task-log-recruiter-touch`.
5. Run `task-flag-stale-contact` to flag any warm contact with last_contact_date >90 days.
6. Run `task-export-comp-to-wealth` to push refreshed comp + YTD totals to the wealth and benefits plugins.
7. Scan `vault/career/` root for unsorted documents and route each to its correct subfolder.
8. Update `vault/career/00_current/status.md` with the sync timestamp and a one-line summary of what changed.

**Synthesis phase (brief):**
9. Read most recent market scan brief from `vault/career/02_briefs/` — extract market health summary and qualifying posting count.
10. Read `vault/career/00_current/` — compile pipeline stage counts and identify items requiring action within 7 days.
11. Read most recent comp review brief from `vault/career/02_briefs/` — extract percentile position, gap vs. P50, and action level.
12. Read skills gap analysis from `vault/career/00_current/` — extract top 3 gap priorities with demand scores.
13. Read `vault/career/open-loops.md` — extract all open items, filter to highest priority by severity and deadline.
14. Synthesize: market position, pipeline status, comp summary, skills priorities, 3-5 next actions with target dates.
15. Write complete monthly brief to `vault/career/02_briefs/YYYY-MM-career-brief.md`.
16. Call `task-update-open-loops` with any new flags from this synthesis.

## Input

- `~/Documents/aireadylife/vault/career/02_briefs/` — prior market scan and comp review briefs
- `~/Documents/aireadylife/vault/career/00_current/` — active application pipeline
- `~/Documents/aireadylife/vault/career/00_current/` — skills gap analysis
- `~/Documents/aireadylife/vault/career/00_current/status.md` — sync status
- `~/Documents/aireadylife/vault/career/01_prior/` — prior period records for trend comparison
- `~/Documents/aireadylife/vault/career/open-loops.md` — all outstanding flags

## Output Format

**Monthly Career Brief** — saved as `vault/career/02_briefs/YYYY-MM-career-brief.md`

```
# Career Brief — [Month Year]

## Executive Summary
[2-3 sentences: where you stand, biggest opportunity or risk right now]

## Market Position
Active postings matching your criteria: X
Comp range at target level (P25-P50): $X–$X
Market signal: [Strong / Neutral / Soft] — [brief explanation]

## Pipeline Status
| Stage | Count | Action Needed |
|-------|-------|--------------|
| Watching | X | — |
| Applied | X | X follow-ups due |
| Screening | X | — |
| Final | X | [specific action] |
| Offer | X | [deadline] |

## Comp vs. Market
Current TC: $X — [Xth percentile]
Gap vs. P50: +/-$X
Action level: None / Negotiate at review / Begin passive exploration / Active search

## Skills Gap Priorities
1. [Skill] — appears in X% of target postings — Resource: [specific course/cert]
2. [Skill] — appears in X% of target postings — Resource: [specific course/cert]
3. [Skill] — appears in X% of target postings — Resource: [specific course/cert]

## Next Actions (this month)
1. [Specific action] — by [date]
2. [Specific action] — by [date]
3. [Specific action] — by [date]
```

## Configuration

No additional configuration beyond standard `vault/career/config.md`. Brief cadence is monthly; if sub-domain ops (market scan, comp review, skills gap) have not run recently, the brief will note stale data.

## Error Handling

- **Sub-domain data missing or stale:** Note in brief which sections are based on stale data (>30 days) and recommend running the relevant op.
- **Pipeline vault empty:** Report pipeline section as "no active applications" — not an error, just a state.
- **No recent comp review:** Use config.md base salary for a rough percentile estimate and flag that a full comp review is needed for accuracy.

## Vault Paths

- Reads from: `~/Documents/aireadylife/vault/career/01_prior/` — prior period records
- Reads from: `~/Documents/aireadylife/vault/career/02_briefs/`, `~/Documents/aireadylife/vault/career/00_current/`, `~/Documents/aireadylife/vault/career/00_current/`, `~/Documents/aireadylife/vault/career/00_current/status.md`, `~/Documents/aireadylife/vault/career/open-loops.md`
- Writes to: `~/Documents/aireadylife/vault/career/02_briefs/YYYY-MM-career-brief.md`, `~/Documents/aireadylife/vault/career/open-loops.md`
