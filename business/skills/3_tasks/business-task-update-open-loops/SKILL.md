---
name: aireadylife-business-task-update-open-loops
type: task
description: >
  Writes all business flags (overdue invoices, compliance deadlines, stalled proposals, expense
  anomalies) to vault/business/open-loops.md. Resolves completed items.
---

# aireadylife-business-update-open-loops

**Trigger:** Called at the end of every business op
**Produces:** Updated vault/business/open-loops.md with current flags and resolved items cleared

## What it does

Receives the list of action items and flags from the calling op — which may include overdue invoices
needing follow-up, compliance filing deadlines approaching, stalled proposals that need outreach,
expense categories running over budget, or any other business-domain action items surfaced during
monthly or quarterly reviews. Appends each new item to vault/business/open-loops.md with a priority
marker (🔴 urgent / 🟡 watch / 🟢 info), the source op that generated it, a clear description of
the required action, and the date raised. For time-sensitive items (overdue invoices, compliance
deadlines within 30 days), always assigns 🔴 regardless of what the calling op suggests. Before
appending new items, scans existing entries for resolved or completed items (checked checkboxes
or resolution notes) and removes them. The resulting clean file is what chief's daily brief reads
to surface business domain alerts.

## Configuration

No special configuration required. vault/business/open-loops.md is created on first run if it
does not exist.

## Apps

None

## Vault Output

`vault/business/open-loops.md`
