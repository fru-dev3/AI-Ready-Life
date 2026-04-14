---
name: arlive-content-op-seo-review
type: op
cadence: monthly
description: >
  Monthly SEO health check; reviews keyword rankings, search impressions, top-performing
  content, and quick-win optimization opportunities. Identifies content losing ranking
  and keywords with no coverage.
  Triggers: "SEO review", "search rankings", "keyword performance", "SEO audit".
---

# arlive-content-seo-review

**Cadence:** Monthly (first week of month)
**Produces:** An SEO health report in `vault/content/03_seo/` with rankings summary, quick-win opportunities, and flagged gaps in open loops.

## What it does

Analyzes the full SEO picture across all content properties monthly. Reads keyword ranking data from `vault/content/03_seo/` to identify which keywords are in the "quick win" zone (positions 4-15, where optimization effort yields the most ranking improvement), which content pieces have dropped more than 3 positions since last month (indicating competitive pressure or freshness decay), and which high-value keywords currently have no published content to target them. Generates a prioritized list of the top 3 optimization opportunities — ranked by search volume, current position gap, and estimated effort to move into top 3. Calls `arlive-content-flag-seo-gap` for any keyword or content piece requiring immediate action. Also checks if any top-10 content pieces are approaching their 6-month freshness window and flags them for a content refresh before ranking drops. The output gives a clear monthly action list: which page to update, which keyword to target, and which gap to fill.

## Calls

- **Flows:** `arlive-content-build-seo-summary`
- **Tasks:** `arlive-content-flag-seo-gap`, `arlive-content-update-open-loops`

## Apps

Google Search Console, vault file system

## Vault Output

`vault/content/03_seo/`
