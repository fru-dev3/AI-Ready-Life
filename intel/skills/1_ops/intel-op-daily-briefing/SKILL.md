---
name: arlive-intel-op-daily-briefing
type: op
cadence: daily
description: >
  Generates a daily news digest filtered to configured priority topics and sources. Triggers:
  "daily briefing", "news briefing", "what's happening today", "morning news".
---

# arlive-intel-daily-briefing

**Cadence:** Daily (morning)
**Produces:** Scannable daily news digest filtered to priority topics and credibility-ranked sources

## What it does

This op produces a concise morning briefing drawn from the user's configured source list and priority
topic filters. It pulls recent articles and headlines from RSS feeds, newsletters, and saved sources,
filters them to the topics defined in the vault's topic configuration, deduplicates overlapping
coverage, and ranks items by recency and source credibility. The output is a scannable digest — not
a wall of links — with each item as a one-sentence summary with source attribution. Priority stories
(from high-credibility sources on configured top topics) are elevated to the top and flagged for
follow-up if warranted.

## Calls

- **Flows:** `arlive-intel-build-news-digest`
- **Tasks:** `arlive-intel-flag-priority-story`, `arlive-intel-update-open-loops`

## Apps

None

## Vault Output

`vault/intel/01_digests/`
