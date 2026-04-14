---
name: arlive-intel-task-update-open-loops
type: task
description: >
  Writes all intel flags (breaking priority stories, source gaps, follow-up items) to
  vault/intel/open-loops.md and resolves completed items.
---

# arlive-intel-update-open-loops

**Trigger:** Called by intel ops and flows
**Produces:** Updated `vault/intel/open-loops.md` with current action items

## What it does

This task maintains the intel domain's open-loops file as the running list of stories and follow-ups
that need attention beyond the daily briefing. It appends new flags for priority stories that warrant
a deeper read, response, or share, as well as notes about source gaps (topics where coverage is thin
and new sources should be added). It resolves items that have been addressed — a story that was read
and acted on, a source that was added — keeping the list focused on genuinely open items. Each entry
includes the story or gap description, why it matters, and the specific action needed.

## Apps

None

## Vault Output

`vault/intel/open-loops.md`
