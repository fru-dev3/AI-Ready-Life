---
name: aireadylife-brand-flow-build-analytics-summary
type: flow
trigger: called-by-op
description: >
  Compiles cross-platform analytics: followers, growth, engagement rate, and impressions per
  platform with month-over-month deltas and top-performing content identified.
---

# aireadylife-brand-build-analytics-summary

**Trigger:** Called by `aireadylife-brand-monthly-synthesis`, `aireadylife-brand-content-review`
**Produces:** Analytics summary table with MoM growth, engagement rates, and top content callouts per platform

## What it does

Reads platform analytics data from vault/brand/00_analytics/ where monthly exports or manual
snapshots are stored for each platform. For each platform present (LinkedIn, Twitter/X, GitHub,
YouTube, personal site), extracts follower count, total impressions for the period, total engagements,
and calculates an engagement rate (engagements / impressions). Compares current month values to
prior month values to produce MoM growth figures — both absolute and percentage. Scans
vault/brand/03_content/ for the content log to identify which individual posts drove the highest
engagement, then surfaces the top 3 across all platforms. Formats the complete result as a structured
summary table suitable for embedding in monthly briefs or the chief daily brief.

## Configuration

Analytics data should be stored in vault/brand/00_analytics/ as monthly files named by platform
and period (e.g. linkedin-2026-03.md). Consistent field naming across files is required for
automated comparison.

## Steps

1. Read platform analytics from vault/brand/00_analytics/ for current and prior month
2. Calculate MoM growth (absolute and %) per platform for followers and impressions
3. Calculate engagement rate per platform (engagements / impressions)
4. Identify top-performing content by engagement across all platforms from vault/brand/03_content/
5. Format summary table with platform rows, metric columns, deltas, and top content callouts

## Apps

None

## Vault Output

`vault/brand/00_analytics/`
