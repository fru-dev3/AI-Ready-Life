---
name: aireadylife-content-op-channel-review
type: op
cadence: monthly
description: >
  Monthly cross-channel performance review; subscriber growth, video views, newsletter
  opens, and product sales all in one brief. Flags channels underperforming vs.
  their 90-day average.
  Triggers: "channel review", "platform review", "YouTube review", "newsletter review".
---

# aireadylife-content-channel-review

**Cadence:** Monthly (first week of month)
**Produces:** A cross-channel performance dashboard in `vault/content/` with 30-day totals, MoM comparisons, and underperformance flags in open loops.

## What it does

Aggregates performance data from every content platform into a single monthly dashboard so the full creator picture is visible in one place. For YouTube: total views, watch hours, subscriber net change, top-performing video, and average view duration trend. For the newsletter: total subscribers, net new, open rate, click rate, and top-performing issue. For digital products: total units sold, conversion rate from traffic to purchase, and revenue per product. Calls `aireadylife-content-analyze-channel-performance` to run the analysis, which compares current 30-day figures against the prior 90-day average and flags any platform falling more than 15% below its baseline. For flagged channels, provides a 1-line diagnosis (publishing cadence dropped, topic mismatch, seasonal effect, etc.) and a recommended corrective action. The monthly channel review is the strategic read — it tells you where the content business is growing, stalling, and where to focus effort next month.

## Calls

- **Flows:** `aireadylife-content-analyze-channel-performance`
- **Tasks:** `aireadylife-content-update-open-loops`

## Apps

YouTube Studio, newsletter platform analytics, Gumroad analytics

## Vault Output

`vault/content/00_youtube/`, `vault/content/01_newsletter/`
