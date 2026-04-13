---
name: arlive-health-update-open-loops
type: task
cadence: called-by-op
description: >
  Writes all health flags from the current op/flow run to vault/health/open-loops.md
  and resolves items that have been completed or expired.
---

# arlive-health-update-open-loops

**Cadence:** Called at the end of every health op and flow
**Produces:** Updated vault/health/open-loops.md with new flags added and resolved items closed

## What it does

Serves as the single write point for the health domain's open-loop tracking file. Every health op calls this task at the end of its run, passing in any new flags generated during execution (out-of-range labs, wearable anomalies, refill reminders, preventive care gaps). The task appends new flags with a timestamp, source op, severity, and resolution status of "open". It also scans existing open items for entries that have been acted on (e.g., a lab retest was completed, a refill was picked up) and marks them as resolved based on configurable resolution criteria. The result is a clean, up-to-date list of genuine open health actions without accumulating noise from past runs.

## Apps

None

## Vault Output

`vault/health/open-loops.md`
