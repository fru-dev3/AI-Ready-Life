---
name: aireadylife-health-op-review-brief
type: op
cadence: monthly
description: >
  Monthly health review brief. Compiles wellness score, lab flags, medication status,
  cost summary, and preventive care gaps into a single briefing doc.
  Triggers: "health brief", "health review", "monthly health summary", "how is my health".
---

# aireadylife-health-review-brief

**Cadence:** Monthly (1st of month)
**Produces:** Health review brief — wellness score, lab flags, meds, cost, preventive gaps

## What it does

Generates your monthly health brief. Reads from vault/health/ to compile: composite wellness score from wearable trends, flagged lab values from most recent results, active medication refill status, health cost YTD and HSA balance, and any preventive care gaps. Formats as a concise brief with ACTION ITEMS sorted by urgency.

## Configuration

Configure your vault at `vault/health/config.md` with your providers, insurance carrier, and HSA account. In demo mode, reads from `vault-demo/health/state.md`.

## Calls

- **Flows:** `aireadylife-health-build-review-brief`
- **Tasks:** `aireadylife-health-update-open-loops`

## Apps

`gdrive` (optional — for writing brief to Google Docs)

## Vault Output

`vault/health/03_briefs/YYYY-MM-health-brief.md`
