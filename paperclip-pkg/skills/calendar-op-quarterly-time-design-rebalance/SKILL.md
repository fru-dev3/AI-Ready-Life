---
type: op
trigger: user-facing
description: >
  Big quarterly retrospective + redesign. Distinct from monthly `op-time-allocation-review`
  (which is reactive). This op asks: was last quarter's calendar a fair representation of the
  user's stated priorities, and what should change next quarter? Reconfigures protected blocks
  in `config.md` and re-runs `flow-protect-recurring-blocks` with the new design.
---

# calendar-quarterly-time-design-rebalance

**Cadence:** Quarterly (first week of new quarter)
**Produces:** `vault/calendar/02_briefs/YYYY-QN-time-design.md` + updated `recurring_blocks` in config.

## What It Does

Aggregates the past 3 monthly `op-time-allocation-review` briefs and compares actual hours-per-bucket to the targets that were in place at quarter start. Layers in `op-recurring-event-audit` results so retire/redesign candidates are visible during the rebalance.

**Output sections:**
1. **Quarter retrospective** — actual vs. target per bucket; biggest 3 wins, biggest 3 misses.
2. **Priority alignment check** — reads `vault/vision/00_current/quarterly-priorities.md` (if present) and asks: did time spent reflect stated priorities? Identifies any priority bucket that received less than half the planned hours.
3. **Block redesign proposal** — concrete edits to `recurring_blocks` (add, remove, resize, reschedule). Each edit includes rationale.
4. **Next-quarter targets** — proposed `time_allocation_targets` for the new quarter.

After user review and approval, the op writes the new `recurring_blocks` and `time_allocation_targets` to `config.md`, then triggers `flow-protect-recurring-blocks` to materialize the redesigned blocks.

## Steps

1. Read past 3 `02_briefs/YYYY-MM-time-allocation.md` files.
2. Read latest `02_briefs/YYYY-QN-recurring-audit.md` if present.
3. Read `vault/vision/00_current/quarterly-priorities.md` if present.
4. Compute quarter actuals; compare to targets; identify alignment gaps.
5. Draft block redesign + new targets; present for approval.
6. On approval, update `config.md`; call `flow-protect-recurring-blocks` to apply.

## Configuration

`vault/calendar/config.md`:
- `time_allocation_targets` (rewritten by this op)
- `recurring_blocks` (rewritten by this op)
- `quarterly_priority_path` (default `~/Documents/aireadylife/vault/vision/00_current/quarterly-priorities.md`)

## Vault Paths

- Reads: `vault/calendar/02_briefs/`, `vault/vision/00_current/quarterly-priorities.md`
- Writes: `vault/calendar/02_briefs/YYYY-QN-time-design.md`, `vault/calendar/config.md`
