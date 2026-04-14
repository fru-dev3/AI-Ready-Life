---
name: aireadylife-brand-op-review-brief
type: op
cadence: monthly
description: >
  Monthly brand brief. Pulls consistency score, mention summary, analytics highlights, and reputation flags.
  Triggers: "brand brief", "brand summary", "how is my brand doing", "brand health", "brand check".
---

# aireadylife-brand-review-brief

**Cadence:** Monthly (1st of month)
**Produces:** Brand brief — consistency score, mentions, analytics, reputation flags

## What it does

Reads the brand vault state, computes the brand health score, summarizes cross-platform analytics, reviews recent mentions and sentiment, and surfaces open items (inconsistent profiles, stale assets, content gaps). Produces a concise monthly brand brief.

## Calls

- **Tasks:** reads vault/brand/state.md or vault-demo/brand/state.md

## Vault Output

`vault/brand/01_analytics/brief-YYYY-MM.md`
