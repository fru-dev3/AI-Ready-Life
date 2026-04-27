---
type: flow
trigger: called-by-op
description: >
  YTD progress against the health deductible and out-of-pocket max plus auto deductible
  status. Cross-domain with health (where EOB reconciliation lives) but lives in
  insurance because the answer informs decisions like "should I delay this elective
  procedure to next plan year." Returns a snapshot of where each deductible stands and
  the projected end-of-year position.
---

# insurance-deductible-progress-snapshot

**Trigger:** Called by `op-review-brief`, `op-coverage-audit`, `op-open-enrollment-readiness`, or on-demand ("how close am I to my deductible").

## What It Does

The user's deductible position changes the math for any near-term medical decision. Once the deductible is met, additional in-network spend is covered at the coinsurance rate; once the OOP max is met, additional spend is fully covered. Patients facing $X of upcoming care benefit from knowing whether to schedule before or after January 1.

**Health plan snapshot:**
- Plan name, family vs individual deductible structure.
- Deductible: amount met YTD / total / remaining.
- OOP max: amount met YTD / total / remaining.
- Days remaining in plan year.
- Projected EOY deductible position based on YTD pace.
- Decision flags: "if you have $X+ of upcoming elective care, schedule before EOY since you've met deductible" / "delay to next plan year — you're early in this one."

**Auto deductible snapshot (per vehicle policy):**
- Collision deductible amount.
- Comprehensive deductible amount.
- Recent claim history (last 3 years) — if claims-free, the user may be eligible for a deductible waiver renewal benefit.

**Data sources, in order:** `vault/health/00_current/eob/` (preferred — actual EOB data), then `vault/insurance/00_current/deductible-tracker.md` (manual user log), then `vault/insurance/00_current/policies/health-*.md` (just shows the totals; YTD is unknown).

## Steps

1. Read the active health plan's deductible and OOP max from policy record.
2. If `vault/health/00_current/eob/` exists, sum YTD covered-charge user portion to compute amount-met figures.
3. Else read `vault/insurance/00_current/deductible-tracker.md` if user maintains it manually.
4. Compute remaining and project EOY based on YTD pace (months_elapsed / 12).
5. Read auto policies for collision and comprehensive deductibles.
6. Compose snapshot output.
7. Return to caller; do not write to open-loops directly (caller decides whether to flag).

## Configuration

`vault/insurance/config.md`:
- `plan_year_start_month` (default 1, January)
- `health_plan_tier` — `individual` or `family` (drives which deductible figure to use)

## Error Handling

- **No EOB data and no manual tracker:** Return totals only with note that YTD position is unknown; suggest enabling EOB ingest.
- **Plan-year start mid-year (e.g. July):** Use configured start; days-remaining math adjusts automatically.

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/insurance/00_current/policies/`, optional `~/Documents/aireadylife/vault/health/00_current/eob/`, `~/Documents/aireadylife/vault/insurance/00_current/deductible-tracker.md`
- Writes: None (returns data to caller)
