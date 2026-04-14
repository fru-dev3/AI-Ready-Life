---
name: aireadylife-health-flow-build-wellness-summary
type: flow
trigger: called-by-op
description: >
  Compiles a wearable wellness summary covering sleep, HRV, and activity averages
  compared to the prior month and 90-day rolling baseline.
---

# aireadylife-health-build-wellness-summary

**Trigger:** Called by `aireadylife-health-review-brief`
**Produces:** Monthly wellness summary in vault/health/04_briefs/ with trend analysis and deviation flags

## What it does

Reads all wearable data exports stored in vault/health/00_wearable/ and calculates 30-day averages for the key wellness signals: sleep score, sleep duration, HRV (average and low), resting heart rate, steps, and active energy. Each metric is compared to the prior 30-day period and the 90-day rolling baseline to distinguish normal variation from meaningful trends. Any metric deviating more than 15% from the 90-day baseline is flagged in the summary. The output is a clean, single-page wellness brief that can be shared with a physician or used as personal context heading into a monthly health review.

## Steps

1. Read Oura Ring and Apple Health data from vault/health/00_wearable/
2. Calculate 30-day averages for sleep score, HRV, resting HR, steps, active energy
3. Compare to prior 30-day period (month-over-month delta)
4. Compare to 90-day rolling baseline (trend context)
5. Flag any metric deviating more than 15% from baseline

## Apps

None

## Vault Output

`vault/health/04_briefs/`
