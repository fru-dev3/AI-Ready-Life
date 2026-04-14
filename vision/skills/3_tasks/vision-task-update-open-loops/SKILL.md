---
name: aireadylife-vision-task-update-open-loops
type: task
description: >
  Writes all vision flags (stalled goals, OKRs off-pace, domain score declines)
  to vault/vision/open-loops.md and resolves completed items.
---

# aireadylife-vision-update-open-loops

**Produces:** An updated `vault/vision/open-loops.md` with new flags added and resolved items marked complete.

## What it does

Maintains the canonical open-loops file for the vision domain. This is the highest-level open-loops file in the plugin system — it captures issues that span domains or that require a fundamental decision about direction rather than just execution. Receives flags from every vision op: OKRs that are critically off-pace and need either a rescue plan or a deliberate decision to drop them, domain scores in sustained decline for 2+ months (indicating a structural problem, not just a bad month), stalled goals that haven't progressed in 30+ days, and vision-level decisions that need to be made before the next quarterly plan can be meaningful. Each entry is written with clear decision framing: not just "this is a problem" but "the choice here is X vs. Y — which do you choose?" For vision-level items, the recommended action often involves a decision conversation rather than a task. On every run, also scans existing entries and resolves any that are no longer applicable — an OKR that was rescued, a domain score that recovered, a stalled goal that was either resumed or explicitly dropped. Archives resolved items to `vault/vision/open-loops-archive.md`. The file is read by `aireadylife-calendar-collect-deadlines`, so vision items with explicit decision-by dates will surface in weekly agendas.

## Apps

vault file system

## Vault Output

`vault/vision/open-loops.md`
