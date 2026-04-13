---
name: arlive-business-build-pipeline-summary
type: flow
trigger: called-by-op
description: >
  Summarizes active proposals by stage, expected close dates, total pipeline value, and flags
  proposals needing follow-up due to inactivity.
---

# arlive-business-build-pipeline-summary

**Trigger:** Called by `arlive-business-pipeline-review`
**Produces:** Pipeline stage breakdown, total value, stale proposal list, and conversion rate calculation

## What it does

Reads the client pipeline from vault/business/00_clients/ and extracts all records with a status
other than closed-won or closed-lost (i.e. all active opportunities). Groups them by stage: sent
(proposal delivered, no response yet), in-review (client acknowledged, evaluating), verbal-yes
(informal commitment received, contract pending), and closed (awaiting payment or final signature).
Calculates the total pipeline value at each stage and as a grand total. Computes a weighted pipeline
value using standard stage probabilities (sent: 10%, in-review: 40%, verbal-yes: 80%, closed: 95%)
to produce a more realistic revenue forecast. Flags any proposal where the last-contact date is
more than 7 days ago and no response has been received — these are stale and need a follow-up
outreach. Calculates trailing 90-day conversion rate from closed records. Returns all results
structured for the calling op's brief.

## Configuration

Client pipeline records in vault/business/00_clients/ should include: proposal name, client,
value, current stage, last-contact date, and next-action field. A pipeline.md or per-client files
are both acceptable formats.

## Steps

1. Read client pipeline from vault/business/00_clients/; filter to active opportunities only
2. Group by stage (sent, in-review, verbal-yes, closed); sum value per stage and total
3. Calculate weighted pipeline value using stage-probability multipliers
4. Flag proposals with last-contact date >7 days ago and no response as needing follow-up
5. Calculate trailing 90-day conversion rate from closed-won vs total proposals sent

## Apps

None

## Vault Output

`vault/business/00_clients/`
