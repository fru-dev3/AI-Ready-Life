---
name: arlive-learning-flow-build-progress-summary
type: flow
trigger: called-by-op
description: >
  Compiles learning progress across active courses with completion percentages, pace analysis,
  and comparison to target deadlines.
---

# arlive-learning-build-progress-summary

**Trigger:** Called by `arlive-learning-monthly-sync`
**Produces:** Progress table with % complete, pace status, and days-remaining per active item

## What it does

This flow reads every active learning item from the vault and calculates a pace status for each.
For each course or certification it computes: total modules or hours, completed modules or hours,
percentage complete, original start date, target completion date, percentage of time elapsed, and
whether the completion percentage is ahead of or behind the time elapsed. It also counts items
completed this month and compares against the monthly learning goal target. The output is a
structured progress table sorted by urgency, with items most at risk of missing their deadline
at the top.

## Steps

1. Read all active items from `vault/learning/00_active/`
2. Calculate percentage complete per course or certification (completed units / total units)
3. Compare completion percentage to percentage of time elapsed between start date and target date
4. Count items completed this month
5. Compare monthly completed count to monthly learning goal from `vault/learning/03_goals/`

## Apps

None

## Vault Output

`vault/learning/00_active/`
