---
name: arlive-career-task-flag-comp-gap
type: task
cadence: quarterly
description: >
  Writes a comp gap flag to vault/career/open-loops.md when current TC is below
  market P50 for role and level. Includes gap amount, market range, and action plan.
---

# arlive-career-flag-comp-gap

**Cadence:** Quarterly (called by comp review op)
**Produces:** Comp gap alert in vault/career/open-loops.md with market data and recommended action

## What it does

Called by `arlive-career-build-comp-summary` when your total compensation is identified as falling below the market P50 for your role, level, and metro area. Writes a structured comp gap flag to vault/career/open-loops.md that includes: the current TC, the market P50, the dollar gap, the market P25-P75 range for full context, and a prioritized action plan based on the size of the gap. A gap under 10% vs. P50 is flagged as low severity with the recommended action of targeting it at the next performance review. A gap of 10-25% is medium severity — recommend initiating a comp conversation or beginning passive market engagement. A gap above 25% is high severity — recommend active market exploration with a target timeline. The flag also references the most recent benchmark sources used so the data can be verified or updated before acting on it.

## Apps

None

## Vault Output

`vault/career/open-loops.md`
