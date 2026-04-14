---
name: aireadylife-brand-op-content-review
type: op
cadence: monthly
description: >
  Monthly content output review that tracks publishing cadence vs goal, cross-platform performance,
  and top-performing content. Triggers: "content review", "brand performance", "how is my content doing".
---

# aireadylife-brand-content-review

**Cadence:** Monthly (1st of month)
**Produces:** Content performance brief, cadence scorecard, updated open-loops entries

## What it does

Reads content analytics from vault/brand/00_analytics/ and the content log from
vault/brand/03_content/ to produce a monthly performance snapshot. Counts posts published per
platform vs the user's set cadence goal (e.g. 4 LinkedIn posts/month, 2 YouTube videos/month)
and flags any cadence misses. Pulls engagement metrics — impressions, likes, comments, shares,
click-through rate — for each platform and surfaces the top 3 performing pieces of content by
engagement. Calculates month-over-month change in follower counts and engagement rate per platform.
Surfaces content gaps (platforms that had zero output) and topic areas that generated above-average
engagement, so the user can double down. Writes a dated brief to vault/brand/04_briefs/ and pushes
cadence misses and engagement anomalies to open-loops.

## Configuration

Log each published piece in vault/brand/03_content/ with platform, date, format, and title. Store
monthly platform analytics exports in vault/brand/00_analytics/. Set cadence targets in
vault/brand/03_content/cadence-targets.md.

## Calls

- **Flows:** `aireadylife-brand-build-analytics-summary`
- **Tasks:** `aireadylife-brand-update-open-loops`

## Apps

None

## Vault Output

`vault/brand/04_briefs/content-review-{month}-{year}.md`
