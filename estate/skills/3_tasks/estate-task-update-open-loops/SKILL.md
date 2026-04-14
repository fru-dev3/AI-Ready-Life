---
name: arlive-estate-task-update-open-loops
type: task
description: >
  Writes all estate flags (overdue maintenance, lease expirations within 90 days,
  cash flow anomalies, vacancy risks) to vault/estate/open-loops.md and resolves
  completed items.
---

# arlive-estate-update-open-loops

**Produces:** An updated `vault/estate/open-loops.md` with new flags added and resolved items marked complete.

## What it does

Maintains the canonical open-loops file for the estate domain. Receives flags from every estate op — overdue or approaching maintenance items, lease expirations requiring renewal decisions, negative or declining cash flow alerts, extended vacancy situations, and warranty expiration notices — and writes them as structured entries to `vault/estate/open-loops.md`. Each entry includes the property address, issue type, urgency level, relevant dates (due date, expiration date, days overdue), estimated financial impact if unresolved, and the recommended action with a suggested action-by date. On every run, also checks existing open loop items against current vault data and resolves any that are no longer applicable — maintenance completed, lease renewed, vacancy filled. Archives resolved items to `vault/estate/open-loops-archive.md` to maintain history without cluttering the active list. The file is read by `arlive-calendar-collect-deadlines` during cross-domain scans, so estate items with explicit action-by dates will appear automatically in weekly calendar agendas.

## Apps

vault file system

## Vault Output

`vault/estate/open-loops.md`
