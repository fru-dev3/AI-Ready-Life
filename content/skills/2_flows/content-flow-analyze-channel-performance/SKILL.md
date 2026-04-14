---
name: arlive-content-flow-analyze-channel-performance
type: flow
trigger: called-by-op
description: >
  Builds a cross-channel performance dashboard with 30-day totals per platform,
  MoM comparisons, and flags for channels underperforming vs. their 90-day average.
---

# arlive-content-analyze-channel-performance

**Trigger:** Called by `arlive-content-channel-review`
**Produces:** A cross-channel performance analysis with per-platform metrics, trend indicators, and underperformance flags returned to the calling op.

## What it does

Reads all platform analytics files from `vault/content/` subfolders and assembles a 30-day performance snapshot for every active content channel. For each platform, calculates the key growth metric (subscribers, newsletter list size), the key engagement metric (views/watch time, open rate), and the key monetization metric (revenue, conversions). Computes the 90-day rolling average for each metric as a baseline, then compares the current 30-day figure against that baseline to detect underperformance. A channel is flagged as underperforming if its primary growth metric is more than 15% below the 90-day average. For flagged channels, attempts a 1-line diagnosis by checking for publishing cadence gaps (fewer posts than average 90-day cadence) or engagement rate drops (views per video declining). Returns the full cross-channel table with trend indicators (up/down/flat) and any underperformance flags for the calling op to include in the monthly brief.

## Steps

1. Read platform analytics from `vault/content/00_youtube/`, `vault/content/01_newsletter/`, `vault/content/02_gumroad/`
2. Calculate 30-day totals per platform for growth, engagement, and monetization metrics
3. Calculate 90-day rolling average per metric as baseline
4. Compare current 30-day figures to 90-day baseline
5. Flag channels where primary growth metric is >15% below baseline
6. Check publishing cadence for flagged channels (posts this month vs. 90-day average)
7. Return cross-channel table with trend indicators and diagnostic notes

## Apps

vault file system

## Vault Output

`vault/content/00_youtube/`, `vault/content/01_newsletter/`
