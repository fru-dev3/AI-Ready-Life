---
name: aireadylife-vision-op-annual-review
type: op
cadence: annual
description: >
  December annual life review; retrospective on goals achieved across all domains,
  life vision document refresh, and next year's priority targets. The single most
  important op of the year.
  Triggers: "annual review", "year review", "end of year", "life vision review".
---

# aireadylife-vision-annual-review

**Cadence:** Annual (December, first two weeks)
**Produces:** An annual retrospective report and a refreshed life vision document in `vault/vision/00_goals/`, plus next year's draft OKRs in `vault/vision/01_okrs/`.

## What it does

The annual review is the most comprehensive and important op in the entire plugin system — it synthesizes a full year of domain activity into a retrospective, then projects forward with a refreshed vision and concrete next-year targets. Pulls domain scores from all 12 monthly scorecards in `vault/vision/02_scorecard/` to build a year-in-review picture: which domains improved the most, which stalled, where the biggest open loop accumulation happened. Reads milestone logs from `vault/vision/00_goals/` to enumerate concrete achievements across the year — career wins, financial milestones, health improvements, creative outputs, relationship investments, learning completions. Reads the current life vision document (the 3-5 year picture of the ideal life) and checks how much has changed in terms of what actually matters now. Calls `aireadylife-vision-score-domain-progress` to assess where current-year OKRs ended up, and `aireadylife-vision-draft-quarterly-plan` to generate a first draft of Q1 OKRs for the new year. Calls `aireadylife-vision-log-milestone` for any significant year-end achievements worth recording. The output is a complete year-end document: what was accomplished, what was learned, what needs to change, and what the first quarter of the new year will be about.

## Calls

- **Flows:** `aireadylife-vision-score-domain-progress`, `aireadylife-vision-draft-quarterly-plan`
- **Tasks:** `aireadylife-vision-log-milestone`, `aireadylife-vision-update-open-loops`

## Apps

vault file system

## Vault Output

`vault/vision/00_goals/`, `vault/vision/01_okrs/`
