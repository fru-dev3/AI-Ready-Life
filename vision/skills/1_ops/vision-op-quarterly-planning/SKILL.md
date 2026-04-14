---
name: arlive-vision-op-quarterly-planning
type: op
cadence: quarterly
description: >
  Structured quarterly planning session. Reviews prior quarter OKRs, runs a retrospective,
  and sets new OKRs for the next quarter aligned to the life vision.
  Triggers: "quarterly planning", "set goals", "quarterly review", "Q planning session".
---

# arlive-vision-quarterly-planning

**Cadence:** Quarterly (first week of Jan, Apr, Jul, Oct)
**Produces:** Quarterly review retrospective + new OKRs for next quarter

## What it does

Runs a structured quarterly planning session in three phases:

**Phase 1 — Retrospective:** Reviews each prior quarter OKR — what was achieved, what wasn't, and why. Produces a retrospective summary with lessons learned.

**Phase 2 — Life Scorecard:** Compiles the final 13-domain scorecard for the quarter. Identifies domains with the biggest positive or negative momentum.

**Phase 3 — New OKRs:** Guides the user through setting 3-5 objectives for the next quarter, each with 2-3 measurable key results. Checks alignment with 1-year life vision.

## Configuration

Life vision and prior OKRs live at `vault/vision/00_current/`. New OKRs are saved to `vault/vision/01_goals/YYYY-QN-okrs.md`.

## Calls

- **Flows:** `arlive-vision-run-retrospective`, `arlive-vision-build-quarterly-scorecard`, `arlive-vision-set-new-okrs`
- **Notifies:** Chief of Staff — routes new OKRs to all relevant domain agents

## Apps

`calendar` (for retrospective time block), `gdrive` (optional)

## Vault Output

`vault/vision/04_planning/YYYY-QN-planning-session.md`
`vault/vision/01_goals/YYYY-QN-okrs.md`
