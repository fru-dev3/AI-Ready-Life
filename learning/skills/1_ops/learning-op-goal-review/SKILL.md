---
name: arlive-learning-goal-review
type: op
cadence: quarterly
description: >
  Quarterly learning goal review that evaluates whether learning goals are aligned to career and
  life vision priorities and adjusts the plan for next quarter. Triggers: "learning goals review",
  "quarterly learning", "skills update", "certifications review".
---

# arlive-learning-goal-review

**Cadence:** Quarterly (1st of Jan, Apr, Jul, Oct)
**Produces:** Learning goal alignment report with recommended additions, removals, and priority changes

## What it does

This op takes a step back from monthly progress tracking to evaluate whether the current learning
portfolio is pointed at the right targets. It reads the current learning goals alongside career and
vision context from the vault, assesses whether each active course or certification directly supports
a current priority, and flags items that may be low-value given what's changed in the last quarter.
It recommends specific additions (new certifications, skills, books) based on career developments,
and produces an updated learning plan for the next quarter with priority rankings.

## Calls

- **Flows:** `arlive-learning-build-progress-summary`
- **Tasks:** `arlive-learning-update-open-loops`

## Apps

None

## Vault Output

`vault/learning/03_goals/`
