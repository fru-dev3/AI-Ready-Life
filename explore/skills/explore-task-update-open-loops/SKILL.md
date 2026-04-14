---
name: aireadylife-explore-task-update-open-loops
type: task
description: >
  Writes all explore flags (expiring documents, unbooked trip items, budget overruns) to
  vault/explore/open-loops.md and resolves completed items.
---

# aireadylife-explore-update-open-loops

**Trigger:** Called by explore ops and flows
**Produces:** Updated `vault/explore/open-loops.md` with current action items

## What it does

This task maintains the explore domain's open-loops file as the single list of outstanding travel
actions. It appends new flags generated during any explore op run, including expiring documents,
unbooked trip items, and budget overruns. It also resolves (checks off) any items that have been
completed since the last run, keeping the list clean and current. Each open item includes a priority
level (urgent/soon/monitor), source trip or document, and a clear next action so nothing gets lost
between op runs.

## Apps

None

## Vault Output

`vault/explore/open-loops.md`
