---
name: aireadylife-home-task-update-open-loops
type: task
description: >
  Writes all home flags (overdue maintenance, budget overruns, expiring warranties) to
  vault/home/open-loops.md and resolves completed items.
---

# aireadylife-home-update-open-loops

**Trigger:** Called by home ops and flows
**Produces:** Updated `vault/home/open-loops.md` with current action items

## What it does

This task maintains the home domain's open-loops file as the canonical list of outstanding home
action items. It appends new flags generated during any home op run, including overdue maintenance
tasks, expense budget overruns, and warranty expiration notices. It resolves (checks off) any items
that have been completed since the last run so the list stays clean. Each open item carries a
priority level (urgent/soon/monitor), the source op that generated it, estimated cost or financial
impact, and a clear next action with any relevant vendor contact.

## Apps

None

## Vault Output

`vault/home/open-loops.md`
