---
name: arlive-ben-task-pull-domain-status
type: task
description: >
  Reads the state.md file from a specified plugin vault and returns a summary of current domain
  status: last updated, wellness or score if present, and open item count.
---

# arlive-ben-pull-domain-status

**Trigger:** Called by `arlive-ben-daily-brief` for each installed plugin
**Produces:** Per-domain status snapshot: last-updated date, domain score/wellness indicator if present, open item count

## What it does

Accepts a domain name (e.g. "benefits", "brand", "business", "health", "wealth") and reads the
corresponding vault/{domain}/state.md file if it exists. Extracts the last-updated date to show
how recently the domain was reviewed — domains that haven't been touched in over 30 days are
flagged as stale (🟡). If the state.md contains a domain-specific score or wellness indicator
(such as a net-worth figure in wealth, a health wellness score, or a business health score), reads
and returns it so the daily brief can display it in the domain alert table. Reads the domain's
open-loops.md (if present) and returns the total count of unresolved items as a number. If
state.md does not exist for the specified domain, returns "not initialized" for that domain rather
than erroring, since some domains may not use a state file. The compact per-domain status returned
by this task populates the domain alert table row in the daily brief for each installed plugin.

## Configuration

Domain state files should follow the naming convention vault/{domain}/state.md. Include a
"last-updated" field and an optional score or wellness field in a consistent format for reliable
parsing.

## Apps

None

## Vault Output

`vault/ben/00_briefs/`
