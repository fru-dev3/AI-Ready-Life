---
name: arlive-content-revenue-review
type: op
cadence: monthly
description: >
  Monthly revenue review across all content channels: YouTube AdSense, newsletter
  sponsorships and paid tiers, and digital product sales (Gumroad). Produces a
  consolidated MoM comparison with top channel identification.
  Triggers: "content revenue", "creator revenue", "how much did I make", "monthly revenue".
---

# arlive-content-revenue-review

**Cadence:** Monthly (1st of month)
**Produces:** A monthly revenue summary in `vault/content/02_gumroad/` with totals per channel, MoM delta, and a logged revenue entry in the vault.

## What it does

Runs on the first of each month to consolidate revenue from every content monetization channel into a single comparable report. Pulls YouTube AdSense earnings from `vault/content/00_youtube/`, newsletter revenue (sponsorship fees, paid subscriptions) from `vault/content/01_newsletter/`, and digital product sales from `vault/content/02_gumroad/`. Calculates month-over-month change per channel and total, identifies the top revenue channel for the month, and flags any channel that declined more than 20% month-over-month as needing attention. Writes a structured revenue log entry via `arlive-content-log-revenue` so the vault has a complete historical record for trend analysis. Flags any revenue anomalies (unexpected spikes or drops) to open loops for follow-up investigation. The report is the financial heartbeat of the content business — one read tells the full monetization story.

## Calls

- **Flows:** `arlive-content-build-revenue-summary`
- **Tasks:** `arlive-content-log-revenue`, `arlive-content-update-open-loops`

## Apps

YouTube Studio (AdSense data), Gumroad dashboard, newsletter platform

## Vault Output

`vault/content/02_gumroad/`
