---
name: aireadylife-learning-op-monthly-sync
type: op
cadence: monthly
description: >
  Full learning data sync on the 1st of each month. Updates course progress,
  reviews monthly learning goals, and recalibrates certification timelines.
  Triggers: "learning monthly sync", "sync learning data", "refresh learning vault".
---

# aireadylife-learning-monthly-sync

**Cadence:** Monthly (1st of month)
**Produces:** Learning vault refreshed with updated course progress, book status, and goal assessment

## What it does

Full learning sync: updates all course progress from connected platforms, updates reading list status, recalculates certification exam timeline based on current study pace, reviews monthly learning goals vs actuals, and identifies courses at risk of missing target finish dates. Ends by triggering Learning Review Brief.

## Configuration

Set your platform list and daily study target in `vault/learning/config.md`. Supports: A Cloud Guru, Educative, Coursera, Udemy, Pluralsight, O'Reilly, LinkedIn Learning.

## Calls

- **Flows:** `aireadylife-learning-sync-course-progress`, `aireadylife-learning-update-reading-list`, `aireadylife-learning-review-monthly-goals`
- **Then triggers:** `aireadylife-learning-review-brief`

## Apps

`gdrive` (optional), connected learning platform APIs (if configured)

## Vault Output

`vault/learning/` (all subdomains refreshed)
