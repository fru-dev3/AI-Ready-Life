---
name: aireadylife-health-task-flag-out-of-range-value
type: task
cadence: as-received
description: >
  Writes a structured flag to vault/health/open-loops.md when a lab biomarker is
  outside its reference range. Logs metadata only — no raw PHI values stored.
---

# aireadylife-health-flag-out-of-range-value

**Cadence:** As-received (called during lab review)
**Produces:** Flagged entry in vault/health/open-loops.md with biomarker metadata and recommended action

## What it does

Called by `aireadylife-health-lab-review` for each biomarker that falls outside its reference range. Deliberately logs only the metadata needed to take action — biomarker name, flag severity (borderline, elevated, critical), collection date, ordering provider, and a recommended next action (retest, follow up with provider, lifestyle change) — without storing the actual numerical value. This approach keeps PHI confined to the structured lab summary document where it belongs and ensures open-loops.md can be freely referenced without privacy risk. Each flag is marked with a resolution status of "open" and a source reference pointing back to the lab summary file for the full value context.

## Apps

None

## Vault Output

`vault/health/open-loops.md`
