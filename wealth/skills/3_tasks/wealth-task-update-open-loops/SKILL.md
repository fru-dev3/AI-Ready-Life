---
name: aireadylife-wealth-task-update-open-loops
type: task
cadence: called-by-op
description: >
  Writes all wealth flags from the current run to vault/wealth/open-loops.md and
  resolves completed items. Called at the end of every wealth op.
---

# aireadylife-wealth-update-open-loops

**Cadence:** Called at the end of every wealth op
**Produces:** Updated vault/wealth/open-loops.md with new flags appended and resolved items closed

## What it does

Serves as the single write point for the wealth domain's open-loop tracking file. Every wealth op calls this task at the end of its run, passing in all flags generated during execution: budget category overages, rebalancing alerts, savings milestones, debt payoff events, 401k contribution warnings, and any other actionable items. The task appends each new flag with a timestamp, source op, severity, and status of "open". It simultaneously scans existing open items for entries that can be auto-resolved — for example, a rebalancing alert from last month where the allocation has since corrected, or a budget warning for a category that came in under budget this month. The result is a reliable, low-noise list of genuine wealth actions requiring attention.

## Apps

None

## Vault Output

`vault/wealth/open-loops.md`
