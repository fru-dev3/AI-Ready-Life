---
name: aireadylife-insurance-task-update-open-loops
type: task
description: >
  Writes all insurance flags (upcoming renewals, coverage gaps, open claims,
  missing policies) to vault/insurance/open-loops.md and resolves completed items.
---

# aireadylife-insurance-update-open-loops

**Produces:** An updated `vault/insurance/open-loops.md` with new flags added and resolved items marked complete.

## What it does

Maintains the canonical open-loops file for the insurance domain. Receives flags from every insurance op — upcoming renewals within 60 days, identified coverage gaps, active claims requiring follow-up, and missing policy types — and writes them as structured entries to `vault/insurance/open-loops.md`. Each entry includes the policy type or coverage area, the specific issue, the recommended action, a suggested action-by date, and the financial exposure if left unresolved (e.g., "$400K of unprotected net worth if umbrella not added before next liability event"). On every run, also scans existing open loop items against current vault data and resolves any that are no longer applicable — a renewal completed and logged, a coverage gap closed by a new policy, a claim settled. Archives resolved items to `vault/insurance/open-loops-archive.md` to maintain audit history. The file is read by `aireadylife-calendar-collect-deadlines` during cross-domain scans, so insurance items with renewal action-by dates will surface in weekly calendar agendas with enough lead time to shop before auto-renewal locks in.

## Apps

vault file system

## Vault Output

`vault/insurance/open-loops.md`
