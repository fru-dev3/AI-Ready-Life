---
type: op
cadence: weekly
description: >
  Lightweight weekly scan distinct from the heavier monthly op-market-scan. Checks the recruiter
  inbox for new threads, scans target-company career pages and LinkedIn for newly posted roles
  matching tight criteria, and surfaces 0-5 high-signal items per week. Closes the weekly market
  cadence benchmark. Triggers: "weekly market pulse", "what's new this week", "any new roles",
  "weekly career check".
---

# career-weekly-market-pulse

**Cadence:** Weekly (typically Monday morning); user-triggered.

## What It Does

The monthly market scan is a deep sweep — broad criteria, full skills extraction, comp aggregation. The weekly pulse is the opposite: short, narrow, opportunity-cost-aware. The point is to never miss a tight-fit role posted Tuesday that gets 200 applications by Friday, and to keep recruiter threads from going stale.

**Three checks each run:**

1. **Recruiter inbox sweep** — checks LinkedIn inbox + Gmail label `recruiter` for new threads in the past 7 days. For each new thread: extract company, role, recruiter name, comp range if mentioned. Log to `vault/career/00_current/recruiter-touches.md` via `task-log-recruiter-touch`.

2. **Tight-fit role scan** — re-runs `flow-scan-target-roles` filtered to: posted in the last 7 days AND fit score >= 90 AND named target company OR comp range >= configured `weekly_pulse_comp_floor` (typically 10-15% above the monthly floor). Returns 0-3 roles per week typically.

3. **Target-company signal check** — for each company on the user's named target list, check the careers page count delta vs. last week (sudden surge = active hiring; sudden zero = freeze). Flag deltas >25%.

**Output is short:** 5-15 line summary, no brief file unless a HIGH-priority signal appears (named target company posted exact target role, or recruiter at named target company opened a thread). When a HIGH signal appears, write a one-page snapshot to `vault/career/02_briefs/YYYY-WW-pulse.md`.

## Triggers

- "weekly market pulse"
- "what's new this week"
- "any new roles for me"
- "check recruiter inbox"
- "weekly career check"

## Steps

1. Read `vault/career/config.md` — confirm target companies, weekly pulse comp floor, and recruiter inbox locations.
2. Sweep recruiter inbox sources for new threads in past 7 days; for each, call `task-log-recruiter-touch`.
3. Call `flow-scan-target-roles` with `posted_within_days=7` and `min_fit_score=90`.
4. For each target company, fetch careers-page posting count and compare to value cached from prior week.
5. Compose 5-15 line summary; only write a brief file when a HIGH-priority signal appears.
6. Call `task-update-open-loops` with any new HIGH-priority items.

## Configuration

`vault/career/config.md`:
- `weekly_pulse_comp_floor` (typically monthly floor + 10-15%)
- `target_companies` (named list)
- `recruiter_inbox_sources` (list — e.g., linkedin-inbox, gmail-label:recruiter)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/career/config.md`, `00_current/`, target-company careers pages, recruiter inboxes
- Writes: `~/Documents/aireadylife/vault/career/00_current/recruiter-touches.md`, `02_briefs/YYYY-WW-pulse.md` (only on HIGH signal), `open-loops.md`
