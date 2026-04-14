---
name: aireadylife-learning-op-progress-review
type: op
cadence: monthly
description: >
  Monthly learning progress review that checks active courses and certifications for completion
  pace, reading list progress, and goal alignment. Triggers: "learning review", "course progress",
  "reading list review", "learning goals".
---

# aireadylife-learning-progress-review

**Cadence:** Monthly (1st of month)
**Produces:** Learning progress report with completion pace analysis and flagged items falling behind

## What it does

This op reviews every active learning item in the vault — courses, certifications, and books in
progress — and calculates whether each is on pace to complete by its target date. It computes the
percentage complete vs. the percentage of time elapsed, so a course that's 30% done with 60% of
time gone is clearly flagged as falling behind. It also tracks reading list progress against the
annual book goal and surfaces the monthly completion count. Any item falling behind gets flagged
as an open loop with a calculated daily pace needed to recover.

## Calls

- **Flows:** `aireadylife-learning-build-progress-summary`, `aireadylife-learning-build-reading-summary`
- **Tasks:** `aireadylife-learning-flag-falling-behind`, `aireadylife-learning-update-open-loops`

## Apps

None

## Vault Output

`vault/learning/00_active/`
