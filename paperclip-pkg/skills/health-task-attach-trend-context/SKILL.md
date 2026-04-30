---
type: task
trigger: called-by-flow-or-op
description: >
  Given a biomarker name and a current value, returns the prior value, delta, percent
  change, and a 3-panel direction (improving / stable / worsening) using the biomarker's
  reference range to determine which direction is favorable. Single primitive enforced
  across labs, vitals, weight, and any other tracked health metric. Ensures no value is
  ever shown without context.
---

# health-attach-trend-context

**Trigger:** Called by `flow-build-lab-summary`, `task-flag-out-of-range-value`, `flow-prep-appointment-brief`, `flow-build-wellness-summary`, `flow-fitness-goal-review`.
**Produces:** Trend record returned to caller; no vault writes.

## What It Does

The paragon rule "lab results never presented without trend + prior period" applies to every metric, not just labs. This is the single primitive that enforces it.

**Inputs:** biomarker name, current value, current date.

**Outputs (returned struct):**
- `prior_value` — most recent value before current, or `null` if none
- `prior_date` — date of prior measurement
- `delta_absolute` — current minus prior
- `delta_percent` — `(current - prior) / prior × 100`
- `direction` — one of `improving`, `stable`, `worsening` based on whether the delta moves toward or away from the in-range target
- `band_change` — `entered_range`, `left_range`, `improved_within_range`, `worsened_within_range`, `still_out_of_range`, `still_in_range`
- `panel_summary` — three-line text: prior → current → direction (e.g., "Last: 7.2 (3 mo ago) → Now: 6.4 → Improving toward target")

**Direction logic:**
- For biomarkers where lower is better (e.g., LDL, A1c, BP): downward delta = improving
- For biomarkers where higher is better (e.g., HDL, vitamin D, eGFR): upward delta = improving
- For range-bounded biomarkers (e.g., TSH, sodium): "improving" = closer to range midpoint
- Direction polarity is read from `vault/health/00_current/lab-reference.md`

## Steps

1. Look up biomarker reference range and direction polarity
2. Search `vault/health/00_current/labs/` and `01_prior/labs/` for the most recent prior value
3. If no prior value exists, return struct with `prior_value: null` and `panel_summary: "No prior value on file — establishing baseline."`
4. Compute deltas, direction, band change
5. Format `panel_summary` text
6. Return struct

## Configuration

`vault/health/config.md`:
- `trend_lookback_months` (default 24 — how far back to search for a prior value)

## Vault Paths

- Reads: `vault/health/00_current/labs/`, `01_prior/labs/`, `lab-reference.md`
- Writes: none (returns struct)
