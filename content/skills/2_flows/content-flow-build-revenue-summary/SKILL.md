---
name: aireadylife-content-flow-build-revenue-summary
type: flow
trigger: called-by-op
description: >
  Aggregates revenue from all content channels into a single monthly summary
  with MoM comparison, identifying the top channel and flagging declines >20%.
---

# aireadylife-content-build-revenue-summary

**Trigger:** Called by `aireadylife-content-revenue-review`
**Produces:** A structured revenue summary object with per-channel totals, MoM deltas, and a top-channel designation returned to the calling op.

## What it does

Reads revenue data from all three monetization vault locations and produces a unified monthly revenue report. From `vault/content/00_youtube/`, extracts AdSense earnings for the current and prior month. From `vault/content/01_newsletter/`, extracts sponsorship revenue and paid subscription revenue separately so each stream is trackable. From `vault/content/02_gumroad/`, extracts digital product sales by product (so individual product performance is visible, not just totals). Sums all streams to produce total content revenue for the month. Calculates MoM delta in both dollar amount and percentage for each channel and for the total. Identifies the single top-contributing channel. Flags any channel that declined more than 20% MoM with the channel name and decline percentage. Returns the full summary structure to `aireadylife-content-revenue-review` for output formatting and open loop updates.

## Steps

1. Read YouTube AdSense data for current and prior month from `vault/content/00_youtube/`
2. Read newsletter sponsorship and subscription revenue from `vault/content/01_newsletter/`
3. Read Gumroad product sales by product from `vault/content/02_gumroad/`
4. Sum all streams to calculate total monthly revenue and per-channel totals
5. Calculate MoM dollar delta and percentage change per channel and overall
6. Identify top revenue channel and flag any channel with >20% MoM decline

## Apps

vault file system

## Vault Output

`vault/content/02_gumroad/`
