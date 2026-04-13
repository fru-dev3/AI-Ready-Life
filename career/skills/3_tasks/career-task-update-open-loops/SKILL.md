---
name: arlive-career-update-open-loops
type: task
cadence: called-by-op
description: >
  Writes all career flags from the current run to vault/career/open-loops.md and
  resolves completed items. Called at the end of every career op.
---

# arlive-career-update-open-loops

**Cadence:** Called at the end of every career op
**Produces:** Updated vault/career/open-loops.md with new flags appended and resolved items closed

## What it does

Serves as the single write point for the career domain's open-loop tracking file. Every career op calls this task at the end of its run, passing in all flags generated during execution: compensation gaps vs. market, interview follow-ups requiring action, stalled pipeline opportunities, skills development priorities, networking outreach drafts ready to send, and market intelligence worth acting on. Each flag is written with a timestamp, source op, severity, and status of "open". The task also resolves items that have naturally closed: a comp gap flag once a raise is received and logged, a follow-up flag once a response arrives, a stalled opportunity once it moves stage or is archived. The result is a clean, actionable list of the 5-10 career moves that actually need attention at any given time.

## Apps

None

## Vault Output

`vault/career/open-loops.md`
