---
name: arlive-estate-op-review-brief
type: op
cadence: monthly
description: >
  Monthly portfolio review brief. Compiles cash flow per property, open maintenance items,
  upcoming lease renewals, property tax deadlines, and portfolio equity into a single briefing doc.
  Triggers: "estate brief", "estate review", "portfolio review", "rental property status".
---

# arlive-estate-review-brief

**Cadence:** Monthly (1st of month)
**Produces:** Portfolio brief — cash flow per property, maintenance items, upcoming lease renewals, tax deadlines

## What it does

Generates your monthly estate brief. Reads from vault/estate/ to compile: net cash flow per property (rent minus PITI minus maintenance reserves), equity position updates, open maintenance items by priority, lease expirations within 90 days, upcoming property tax deadlines, and insurance renewal dates. Formats as a concise brief with ACTION ITEMS sorted by urgency.

## Configuration

Configure your vault at `vault/estate/config.md` with your property list, mortgage servicers, and tax deadlines. In demo mode, reads from `vault-demo/estate/state.md`.

## Calls

- **Flows:** `arlive-estate-build-review-brief`
- **Tasks:** `arlive-estate-update-open-loops`

## Apps

`gdrive` (optional — for writing brief to Google Docs)

## Vault Output

`vault/estate/03_briefs/YYYY-MM-estate-brief.md`
