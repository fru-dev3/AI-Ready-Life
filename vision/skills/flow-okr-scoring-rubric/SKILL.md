---
type: flow
trigger: called-by-op
description: >
  Reproducible OKR retrospective scorer. Each KR is graded 0.0–1.0 against thresholds
  defined when the OKR was set, replacing ad-hoc judgement with consistent math. Called
  by op-quarterly-planning at quarter close and op-annual-review.
---

# vision-okr-scoring-rubric

**Trigger:** Called by `op-quarterly-planning` (at the close-out step), `op-annual-review`. User-facing for "score my quarter."

## What It Does

Applies a standard rubric to every key result on a closing OKR set. Replaces "I think we hit ~70% on that one" with a deterministic grade computed from the KR's own success thresholds.

Threshold convention (set at OKR creation, not retrospect):
- `target` — the planned end value (e.g., 50,000).
- `commit` — the floor commitment, scoring 0.7 if reached (e.g., 35,000).
- `stretch` — the stretch target, scoring 1.0 if reached (e.g., 65,000).

Score formula:
- final_value < commit: linear from 0.0 (no progress) to 0.7 (at commit).
- commit ≤ final_value < target: linear from 0.7 to 0.9.
- target ≤ final_value < stretch: linear from 0.9 to 1.0.
- final_value ≥ stretch: 1.0 (capped).

KRs without thresholds are flagged and skipped from the score (and surfaced to open-loops so the next OKR cycle sets thresholds up front).

## Steps

1. Read the closing OKR file from `vault/vision/00_current/`.
2. For each KR, parse `commit`, `target`, `stretch` from the OKR file's frontmatter or inline annotations.
3. Read the final value (manually entered or pulled from the relevant domain plugin's current state).
4. Apply the formula; round to two decimals.
5. Aggregate per-objective average and overall quarter score (mean of all KR scores).
6. Write the scored OKR file to `01_prior/QYYYY-okrs-scored.md`.
7. Surface KRs missing thresholds to open-loops as a calibration flag.
8. Return the scored summary.

## Output Format

```
# QYYYY OKRs — Scored
Overall: [N] / 1.00

## [Objective 1] — [average]
- KR1.1: [final] vs commit [c] / target [t] / stretch [s] → [score]
- KR1.2: ...

## [Objective 2] — [average]
...

## Calibration flags
- [KR description] — missing thresholds
```

## Configuration

`vault/vision/config.md`:
- `okr_threshold_default_commit_pct` (default 70 — used to seed when user doesn't specify)
- `okr_threshold_default_stretch_pct` (default 130)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/vision/00_current/QYYYY-okrs.md`
- Writes: `~/Documents/aireadylife/vault/vision/01_prior/QYYYY-okrs-scored.md`, `~/Documents/aireadylife/vault/vision/open-loops.md`
