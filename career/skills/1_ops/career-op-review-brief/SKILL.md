---
name: arlive-career-op-review-brief
type: op
cadence: monthly
description: >
  Monthly career review brief. Compiles market position, pipeline status, comp vs market,
  skills gaps, and next actions. Triggers: "career brief", "career review", "career status", "how is my job search".
---

# arlive-career-review-brief

**Cadence:** Monthly (1st of month)
**Produces:** Career review brief — market position, pipeline, comp, gaps, next actions

## What it does

Generates monthly career review brief: current market position, active application pipeline status, comp vs. market benchmarks, skills gap priorities, and 3-5 next actions. Formats as a brief with prioritized action items.

## Calls

- **Flows:** `arlive-career-build-review-brief`
- **Tasks:** `arlive-career-update-open-loops`

## Apps

`gdrive` (optional)

## Vault Output

`vault/career/04_briefs/YYYY-MM-career-brief.md`
