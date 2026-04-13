---
name: arlive-benefits-update-open-loops
type: task
description: >
  Writes all benefits flags (enrollment deadlines, coverage gaps, HSA action items, 401k
  contribution alerts) to vault/benefits/open-loops.md and resolves completed items.
---

# arlive-benefits-update-open-loops

**Trigger:** Called at the end of every benefits op
**Produces:** Updated vault/benefits/open-loops.md with current flags and resolved items cleared

## What it does

Receives a list of flags from the calling op — which may include open enrollment deadlines,
coverage gaps identified in the quarterly audit, HSA reimbursements that need to be submitted,
401k contribution shortfalls, or any other action items surfaced during the review. Appends any
new flags to vault/benefits/open-loops.md with a priority marker (🔴 urgent / 🟡 watch / 🟢 info),
the source op that generated the flag, and a suggested action. Before writing new items, scans
the existing file for any flags that were previously marked as completed (via a `[x]` checkbox or
explicit resolution note) and removes them to keep the file current. The result is a clean, up-to-date
action list that ben's collect-domain-alerts flow can read on each daily brief cycle.

## Configuration

No special configuration required. File lives at vault/benefits/open-loops.md and is created on
first run if it doesn't exist.

## Apps

None

## Vault Output

`vault/benefits/open-loops.md`
