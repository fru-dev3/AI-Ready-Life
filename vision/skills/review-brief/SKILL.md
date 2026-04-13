---
name: arlive-vision-review-brief
type: op
cadence: monthly
description: >
  Monthly vision review brief. Compiles 13-domain life scorecard, top 3 at-risk goals,
  and alignment flags into a single strategic briefing.
  Triggers: "vision brief", "life scorecard", "goal review", "how am I doing", "life check-in".
---

# arlive-vision-review-brief

**Cadence:** Monthly (1st of month)
**Produces:** Vision brief — 13-domain scorecard, top 3 at-risk goals, alignment flags

## What it does

Generates your monthly vision brief. Reads from vault/vision/ to compile: 13-domain life scorecard with current scores (1-10) and velocity indicators (improving, stable, declining), quarterly OKR status (on-track, at-risk, off-track), calendar vs. priorities alignment check with gap analysis, top 3 at-risk goals with recommended interventions, and overall life score trend. Formats as a strategic brief with ACTION ITEMS sorted by impact.

## Configuration

Configure your life vision and OKRs at `vault/vision/config.md` with your 13-domain baselines and quarterly goals. In demo mode, reads from `vault-demo/vision/state.md`.

## Calls

- **Flows:** `arlive-vision-build-review-brief`, `arlive-vision-compile-scorecard`
- **Tasks:** `arlive-vision-update-open-loops`, `arlive-vision-escalate-at-risk-goals`

## Apps

`calendar` (for time allocation analysis), `gdrive` (optional — for writing brief to Google Docs)

## Vault Output

`vault/vision/03_briefs/YYYY-MM-vision-brief.md`
