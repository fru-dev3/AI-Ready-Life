---
name: aireadylife-explore-op-monthly-sync
type: op
cadence: monthly
description: >
  Monthly explore sync. Checks all travel document expiration dates and surfaces upcoming trips
  requiring preparation. Triggers: "explore monthly sync", "sync travel documents", "check passport".
---

# aireadylife-explore-monthly-sync

**Cadence:** Monthly (1st of month)
**Produces:** Document expiry alerts and upcoming trip preparation checklist

## What it does

Runs a full document check: scans all passport and visa expiration dates, flags anything expiring within 6 months, checks Global Entry and NEXUS renewal windows. Reviews upcoming booked trips and generates a preparation checklist for any trip within 90 days. Ends by triggering the Explore Review Brief.

## Configuration

Uses document details from `vault/explore/documents/`. Upcoming trips from `vault/explore/trips/`. In demo mode, reads from `vault-demo/explore/state.md`.

## Calls

- **Flows:** `aireadylife-explore-check-document-expiry`, `aireadylife-explore-prep-upcoming-trips`
- **Then triggers:** `aireadylife-explore-review-brief`

## Vault Output

`vault/explore/00_current/state.md`
