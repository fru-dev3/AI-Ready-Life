---
name: aireadylife-records-op-review-brief
type: op
cadence: monthly
description: >
  Monthly records review brief. Compiles expiring documents, subscription cost
  review, and document gaps into a single briefing with action items.
  Triggers: "records brief", "document review", "subscription audit", "what's expiring".
---

# aireadylife-records-review-brief

**Cadence:** Monthly (1st of month)
**Produces:** Records brief — expiring documents, subscription cost review, document gaps

## What it does

Generates your monthly records brief. Reads from vault/records/ to compile: all documents expiring within 90 days with renewal instructions, total monthly subscription spend with per-service breakdown, subscriptions flagged as unused or duplicated for cancellation consideration, and document gaps (important documents missing from inventory). Formats as a concise brief with ACTION ITEMS sorted by urgency.

## Configuration

Configure your document inventory and subscription list at `vault/records/config.md`. In demo mode, reads from `vault-demo/records/state.md`.

## Calls

- **Flows:** `aireadylife-records-build-review-brief`
- **Tasks:** `aireadylife-records-update-open-loops`

## Apps

`gdrive` (optional — for writing brief to Google Docs)

## Vault Output

`vault/records/03_briefs/YYYY-MM-records-brief.md`
