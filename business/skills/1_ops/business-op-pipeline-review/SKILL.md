---
name: aireadylife-business-op-pipeline-review
type: op
cadence: monthly
description: >
  Monthly client pipeline review that tracks active proposals, follow-ups needed, total pipeline
  value, and conversion rate. Triggers: "pipeline review", "client pipeline", "proposals",
  "sales pipeline".
---

# aireadylife-business-pipeline-review

**Cadence:** Monthly (1st of month)
**Produces:** Pipeline summary brief, follow-up flags, conversion rate trend, updated open-loops entries

## What it does

Reads the client pipeline from vault/business/00_clients/ to produce a snapshot of all active
commercial opportunities. Counts proposals by stage (sent, in-review, verbal yes, closed-won,
closed-lost) and calculates total pipeline value at each stage. Flags proposals where the last
activity was more than 7 days ago with no response received — these are stale and need a
follow-up. Calculates a trailing conversion rate (proposals sent vs closed-won) to give the user
a sense of pipeline efficiency. Compares pipeline value this month vs last month to show whether
the opportunity book is growing or shrinking. Surfaces top opportunities by value that are in
late stages and deserve priority attention. Writes a dated pipeline brief to vault/business/04_briefs/
and pushes all follow-up flags and stalled deals to vault/business/open-loops.md.

## Configuration

Store client and proposal records in vault/business/00_clients/ with stage, value, last-contact
date, and next action. A pipeline.md file with a structured table format works well for this flow.

## Calls

- **Flows:** `aireadylife-business-build-pipeline-summary`
- **Tasks:** `aireadylife-business-update-open-loops`

## Apps

None

## Vault Output

`vault/business/04_briefs/pipeline-{month}-{year}.md`
