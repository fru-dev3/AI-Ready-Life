---
name: arlive-content-review-brief
type: op
cadence: monthly
description: >
  Monthly content review brief. Compiles channel analytics, revenue across all platforms,
  newsletter metrics, publishing schedule health, and SEO flags into a single briefing doc.
  Triggers: "content brief", "content review", "monthly content summary", "how is my content".
---

# arlive-content-review-brief

**Cadence:** Monthly (1st of month)
**Produces:** Content review brief — channel analytics, revenue, schedule health, SEO flags

## What it does

Generates your monthly content brief. Reads from vault/content/ to compile: YouTube channel metrics (views, watch time, CTR, subscriber delta), total revenue across all platforms (AdSense, Gumroad, sponsorships), newsletter health (subscribers, open rate, CTR), publishing schedule status (videos published vs. target), and top SEO/thumbnail improvement opportunities. Formats as a concise brief with ACTION ITEMS sorted by urgency.

## Configuration

Configure your vault at `vault/content/config.md` with your channel IDs, newsletter platform, and revenue sources. In demo mode, reads from `vault-demo/content/state.md`.

## Calls

- **Flows:** `arlive-content-build-review-brief`
- **Tasks:** `arlive-content-update-open-loops`

## Apps

`gdrive` (optional — for writing brief to Google Docs)

## Vault Output

`vault/content/03_briefs/YYYY-MM-content-brief.md`
