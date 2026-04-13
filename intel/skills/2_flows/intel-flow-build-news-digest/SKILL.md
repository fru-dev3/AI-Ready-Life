---
name: arlive-intel-build-news-digest
type: flow
trigger: called-by-op
description: >
  Pulls news from configured RSS feeds and sources, filters to priority topics, deduplicates, and
  formats as a scannable daily digest.
---

# arlive-intel-build-news-digest

**Trigger:** Called by `arlive-intel-daily-briefing`
**Produces:** Formatted daily digest with ranked, deduplicated, one-sentence summaries per story

## What it does

This flow ingests recent content from every source in the vault's source registry, applies topic
and keyword filters to remove irrelevant items, and deduplicates stories being covered by multiple
outlets (keeping the highest-credibility source). It then ranks the filtered items by a combination
of recency and source credibility score to determine display order. The final digest is formatted
with priority stories first, followed by secondary items, each with headline, source name, and a
single-sentence summary written to be informative on its own without needing to click through.

## Steps

1. Read topic list and source registry from `vault/intel/00_sources/`
2. Fetch or read recent articles from configured feeds and sources
3. Filter articles to priority topics and configured keywords
4. Deduplicate overlapping coverage, retaining the highest-credibility source per story
5. Rank by recency and credibility score; format as headline + source + 1-sentence summary

## Apps

None

## Vault Output

`vault/intel/01_digests/`
