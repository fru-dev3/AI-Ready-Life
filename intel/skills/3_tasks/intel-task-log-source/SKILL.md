---
name: arlive-intel-log-source
type: task
cadence: as-added
description: >
  Adds a new news source to vault/intel/00_sources/ with name, URL/feed, type, topic tags,
  and credibility rating. Used to expand the intel source list.
---

# arlive-intel-log-source

**Cadence:** As-added (when a new source is discovered or recommended)
**Produces:** New source record in `vault/intel/00_sources/`

## What it does

This task registers a new source in the intel source registry so it is included in future digest
builds and topic deep dives. Each source record captures the name, URL or RSS feed address, source
type (RSS feed, newsletter, podcast, X/Twitter account, website), topic tags that describe what it
covers, and a credibility rating from 1-5 that influences how its stories are ranked in the digest.
Keeping the source registry well-maintained and tagged accurately is what determines the quality of
the intel domain's output — the digest is only as good as its inputs.

## Apps

None

## Vault Output

`vault/intel/00_sources/`
