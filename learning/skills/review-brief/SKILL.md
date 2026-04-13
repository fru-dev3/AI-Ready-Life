---
name: arlive-learning-review-brief
type: op
cadence: weekly
description: >
  Weekly learning review brief. Compiles active course progress, current book chapter,
  certification timeline, and weekly study time into a concise briefing.
  Triggers: "learning brief", "learning review", "how is my learning", "study update".
---

# arlive-learning-review-brief

**Cadence:** Weekly (Monday)
**Produces:** Learning brief — active courses progress, current book, cert timeline

## What it does

Generates your weekly learning brief. Reads from vault/learning/ to compile: active course progress with percentage and pace-vs-target status, current book progress, certification exam countdown, weekly study hours logged, and Q2 learning goal status. Formats as a concise brief with ACTION ITEMS — courses falling behind, exam prep milestones, and reading targets.

## Configuration

Configure your learning setup at `vault/learning/config.md` with your active platforms, courses, and goals. In demo mode, reads from `vault-demo/learning/state.md`.

## Calls

- **Flows:** `arlive-learning-build-review-brief`
- **Tasks:** `arlive-learning-update-open-loops`

## Apps

`gdrive` (optional — for writing brief to Google Docs)

## Vault Output

`vault/learning/03_briefs/YYYY-MM-DD-learning-brief.md`
