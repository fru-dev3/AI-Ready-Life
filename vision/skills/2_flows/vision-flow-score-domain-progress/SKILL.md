---
name: arlive-vision-score-domain-progress
type: flow
trigger: called-by-op
description: >
  Evaluates progress toward quarterly OKRs across all domains; calculates percent
  complete per key result and flags OKRs at less than 50% with less than 2 weeks
  remaining in the quarter.
---

# arlive-vision-score-domain-progress

**Trigger:** Called by `arlive-vision-quarterly-planning`, `arlive-vision-monthly-scorecard`, `arlive-vision-annual-review`
**Produces:** A per-OKR progress report with completion percentages, pace-to-goal ratings, and at-risk flags returned to the calling op.

## What it does

Reads all active OKRs from `vault/vision/01_okrs/` and evaluates progress on each key result. For quantitative key results (e.g., "Increase monthly content revenue to $2,000"), reads the relevant domain metric from the appropriate plugin vault and calculates the actual percentage of the target achieved. For qualitative key results (e.g., "Complete estate planning documents"), reads the corresponding domain vault for evidence of completion (a filed document, a logged milestone, an open loop marked resolved). Calculates the expected completion percentage based on how far through the quarter the current date falls — if it's 70% through the quarter, a healthy key result should be at least 70% complete. Key results that are more than 20 percentage points behind the expected pace are flagged as at-risk. Key results with less than 2 weeks remaining in the quarter and less than 50% complete are flagged as critical-at-risk and surfaced prominently. For each at-risk key result, provides a brief diagnosis: is the target itself unrealistic, has the activity been deprioritized, or is there a blocking issue that hasn't been resolved? Returns the full OKR progress report with pace ratings and at-risk flags to the calling op.

## Steps

1. Read all active OKRs from `vault/vision/01_okrs/` for the current quarter
2. For each key result, identify whether it is quantitative or qualitative
3. For quantitative KRs: read the metric from the relevant domain vault and calculate % complete
4. For qualitative KRs: check domain vault for completion evidence (milestone, document, resolved loop)
5. Calculate expected completion % based on days elapsed in the quarter
6. Flag KRs more than 20 points behind expected pace as at-risk
7. Flag KRs with <2 weeks remaining and <50% complete as critical-at-risk
8. Generate brief diagnosis note for each at-risk KR
9. Return full OKR progress report with pace ratings and flags

## Apps

vault file system

## Vault Output

`vault/vision/01_okrs/`
