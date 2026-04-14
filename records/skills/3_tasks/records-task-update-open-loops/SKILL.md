---
name: arlive-records-task-update-open-loops
type: task
description: >
  Writes all records flags (expiring IDs, outdated legal documents, unused subscriptions) to
  vault/records/open-loops.md and resolves completed items.
---

# arlive-records-update-open-loops

**Trigger:** Called by records ops and flows
**Produces:** Updated `vault/records/open-loops.md` with current action items

## What it does

This task maintains the records domain's open-loops file as the single list of outstanding document
and subscription actions. It appends new flags from quarterly document audits (expiring IDs, outdated
legal documents, missing records) and monthly subscription reviews (unused subscriptions to cancel,
renewals approaching). It resolves items when the underlying action is complete — a document renewed,
a subscription cancelled, a legal document updated. Each entry includes the document or subscription
name, the specific issue, estimated cost savings or risk if not addressed, and a clear next action.

## Apps

None

## Vault Output

`vault/records/open-loops.md`
