---
name: arlive-content-flow-build-seo-summary
type: flow
trigger: called-by-op
description: >
  Summarizes keyword rankings, search impressions, and top content performance;
  identifies quick-win keywords (positions 4-15), ranking drops, and top 3
  optimization opportunities.
---

# arlive-content-build-seo-summary

**Trigger:** Called by `arlive-content-seo-review`
**Produces:** An SEO analysis with quick-win keyword list, ranking loss report, and prioritized optimization recommendations returned to the calling op.

## What it does

Reads SEO data from `vault/content/03_seo/` — which includes keyword ranking snapshots, search impressions by page, and click-through rate data — and produces a monthly SEO intelligence summary. Identifies all keywords currently ranking in positions 4-15 as the "quick win" zone: these have proven search demand and existing page authority, so targeted optimization (title, meta, internal links, freshness update) can realistically move them to top 3. Identifies all content pieces that have dropped more than 3 ranking positions since the prior month, indicating either competitive pressure, content freshness decay, or technical SEO issues. Scans for high-volume keywords in the domain's topic space that have no existing content targeting them (gap analysis). From these three signals, produces a ranked top-3 opportunity list: each opportunity includes the keyword, current position, estimated monthly search volume, the recommended action (update existing page vs. create new content), and an effort estimate. Returns the full summary to `arlive-content-seo-review` for output and open loop flagging.

## Steps

1. Read keyword ranking data from `vault/content/03_seo/` for current and prior month
2. Identify all keywords in positions 4-15 (quick win zone) with search volume data
3. Find content pieces that have dropped >3 ranking positions MoM
4. Scan keyword gap list for high-value terms with no existing content coverage
5. Rank opportunities by: search volume × position improvement potential ÷ effort
6. Select top 3 optimization opportunities and write recommendation summaries

## Apps

Google Search Console, vault file system

## Vault Output

`vault/content/03_seo/`
