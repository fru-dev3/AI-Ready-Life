---
name: arlive-health-build-lab-summary
type: flow
trigger: called-by-op
description: >
  Builds a structured lab summary with current biomarker values, prior panel
  comparison, reference ranges, and flagged out-of-range items grouped by panel type.
---

# arlive-health-build-lab-summary

**Trigger:** Called by `arlive-health-lab-review`
**Produces:** Formatted lab summary document in vault/health/01_labs/ with out-of-range items surfaced first

## What it does

Reads the incoming lab results from vault/health/01_labs/ and produces a clean, structured summary that makes it easy to spot what changed and what matters. Each biomarker is compared against its standard reference range, and where a prior panel exists, a trend direction (up, down, stable) is calculated. Results are grouped by panel type — metabolic panel, lipid panel, CBC, thyroid, hormones — so the summary mirrors how a physician would read a lab report. Flagged items are sorted to the top within each panel. The summary does not include raw PHI values in open-loops.md; those remain only in the lab summary document itself.

## Steps

1. Read lab results from vault/health/01_labs/ (latest received file)
2. Compare each biomarker value to its standard reference range
3. Compare to prior panel where available and calculate trend direction
4. Group biomarkers by panel type (metabolic, lipid, CBC, thyroid, etc.)
5. Format summary document with flagged items first within each group

## Apps

None

## Vault Output

`vault/health/01_labs/`
