---
name: arlive-real-estate-op-review-brief
type: op
cadence: monthly
description: >
  Monthly real estate review brief. Compiles market conditions for target markets,
  buy vs. rent verdict, portfolio expansion opportunities, and acquisition pipeline
  into a single briefing doc.
  Triggers: "real estate brief", "housing update", "market analysis", "buy vs rent".
---

# arlive-realestate-review-brief

**Cadence:** Monthly (1st of month)
**Produces:** Real estate brief — market conditions, portfolio expansion opportunities, buy vs. rent update

## What it does

Generates your monthly real estate brief. Reads from vault/real-estate/ to compile: buy vs. rent verdict for the primary residence market at current rates, market snapshot for each configured target market (median price, price-to-rent ratio, cap rate, vacancy), current properties under evaluation, and portfolio strategy progress. Formats as a concise brief with ACTION ITEMS sorted by decision urgency.

## Configuration

Configure your target markets and acquisition criteria at `vault/real-estate/config.md`. In demo mode, reads from `vault-demo/real-estate/state.md`.

## Calls

- **Flows:** `arlive-realestate-build-review-brief`
- **Tasks:** `arlive-realestate-update-open-loops`

## Apps

`brave-search` (for market data), `gdrive` (optional — for writing brief to Google Docs)

## Vault Output

`vault/real-estate/03_briefs/YYYY-MM-realestate-brief.md`
