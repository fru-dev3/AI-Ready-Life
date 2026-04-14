---
name: aireadylife-brand-task-update-open-loops
type: task
description: >
  Writes all brand flags (profile inconsistencies, content gaps, unanswered mentions, publishing
  cadence misses) to vault/brand/open-loops.md. Resolves completed items.
---

# aireadylife-brand-update-open-loops

**Trigger:** Called at the end of every brand op
**Produces:** Updated vault/brand/open-loops.md with current flags and resolved items cleared

## What it does

Receives the list of flags from the calling op — which may include profile fields that are out of
sync with the master profile, platforms that missed their publishing cadence goal, brand mentions
that need a response, analytics anomalies worth investigating, or any other action items surfaced
during brand reviews. Appends new flags to vault/brand/open-loops.md with a priority marker
(🔴 urgent / 🟡 watch / 🟢 info), the source op or flow that generated the flag, a clear action
description, and the date the flag was raised. Before writing new items, scans existing entries
for any that are marked as resolved (checkbox checked or explicit resolution note) and removes
them to keep the file clean and actionable. The resulting file serves as the live brand action
list that chief's collect-domain-alerts flow reads on each daily brief cycle.

## Configuration

No special configuration required. vault/brand/open-loops.md is created on first run if it
does not exist.

## Apps

None

## Vault Output

`vault/brand/open-loops.md`
