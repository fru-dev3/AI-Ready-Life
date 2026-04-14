---
name: aireadylife-wealth-op-review-brief
type: op
cadence: monthly
description: >
  Monthly wealth review brief. Generates a concise brief with net worth delta, key moves,
  anomalies, and recommended actions. Triggers: "wealth review brief", "monthly wealth brief",
  "wealth summary brief", "what happened with my wealth".
---

# aireadylife-wealth-review-brief

**Cadence:** Monthly (after aireadylife-wealth-monthly-synthesis)
**Produces:** Wealth review brief — net worth delta, flags, prioritized action items

## What it does

Generates the monthly wealth review brief after synthesis is complete. Consolidates: net worth change from prior month, key investment moves, anomalies flagged during daily scans, liquidity status, and any open loops. Formats as a concise brief with ACTION ITEMS sorted by urgency.

## Calls

- **Flows:** `aireadylife-wealth-build-review-brief`

## Vault Output

`vault/wealth/04_briefs/YYYY-MM-wealth-brief.md`
