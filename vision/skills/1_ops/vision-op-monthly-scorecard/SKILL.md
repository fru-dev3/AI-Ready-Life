---
name: aireadylife-vision-op-monthly-scorecard
type: op
cadence: monthly
description: >
  Monthly life scorecard; scores each active life domain (1-10) based on open loops
  resolved, goals on pace, and positive milestones. Produces a trend view showing
  which domains are improving, stalling, or declining.
  Triggers: "life scorecard", "monthly scorecard", "how am I doing", "life review".
---

# aireadylife-vision-monthly-scorecard

**Cadence:** Monthly (last day of month or first of new month)
**Produces:** A monthly life scorecard report in `vault/vision/02_scorecard/` with domain scores, trend indicators, and open loop counts.

## What it does

Runs at the end of each month to produce a scored snapshot of life across all active domains. Calls `aireadylife-vision-build-scorecard` to assemble the data and score each domain on a 1-10 scale, where the score reflects a combination of: open loops resolved this month (positive signal), open loops accumulated without resolution (negative signal), milestones logged (strong positive), and goals currently on pace vs. off-pace per OKR tracking. The resulting scorecard shows each domain with its numerical score, a trend indicator (improving, stable, declining) based on the prior month comparison, and a 1-line status note explaining the score. Domains scoring below 5 get a "needs attention" flag that automatically generates an open loop recommendation in `vault/vision/open-loops.md`. Domains scoring above 8 get a "momentum" note. The monthly scorecard is the single-page life dashboard — it tells at a glance where life is going well, where it's drifting, and where intentional effort is needed next month. Also logs the scorecard to the historical file so year-over-year domain trends are trackable by the annual review op.

## Calls

- **Flows:** `aireadylife-vision-build-scorecard`, `aireadylife-vision-score-domain-progress`
- **Tasks:** `aireadylife-vision-update-open-loops`

## Apps

vault file system

## Vault Output

`vault/vision/02_scorecard/`
