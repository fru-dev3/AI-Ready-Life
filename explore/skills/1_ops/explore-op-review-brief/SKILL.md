---
name: arlive-explore-op-review-brief
type: op
cadence: monthly
description: >
  Monthly explore review brief. Compiles upcoming trips, travel document expiration alerts,
  and wishlist status into a single briefing doc.
  Triggers: "explore brief", "travel review", "trip status", "passport check".
---

# arlive-explore-review-brief

**Cadence:** Monthly (1st of month)
**Produces:** Explore brief — upcoming trips, document expiration alerts, wishlist

## What it does

Generates your monthly explore brief. Reads from vault/explore/ to compile: all upcoming booked trips with preparation status, travel document expiration dates (flags anything expiring within 12 months), top wishlist destinations with budget estimates, and open pre-trip action items. Formats as a concise brief with ACTION ITEMS sorted by urgency.

## Configuration

Configure your vault at `vault/explore/config.md` with your travelers, passport details, and travel preferences. In demo mode, reads from `vault-demo/explore/state.md`.

## Calls

- **Flows:** `arlive-explore-build-review-brief`
- **Tasks:** `arlive-explore-update-open-loops`

## Apps

`gdrive` (optional — for writing brief to Google Docs)

## Vault Output

`vault/explore/03_briefs/YYYY-MM-explore-brief.md`
