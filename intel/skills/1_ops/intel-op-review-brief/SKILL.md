---
name: arlive-intel-op-review-brief
type: op
cadence: daily
description: >
  Daily morning intelligence brief. Scans configured sources, filters stories through
  the user's interest lens, and produces a top 5-8 story brief with summaries and flags.
  Triggers: "intel brief", "morning brief", "what's the news", "daily intel", "news summary".
---

# arlive-intel-morning-brief

**Cadence:** Daily (6 AM)
**Produces:** Morning intelligence brief — top stories filtered to user's interest lens

## What it does

Scans all configured sources (RSS feeds, newsletters, web sources) and filters through the user's interest lens defined in vault/intel/config.md. Produces a morning brief of 5-8 top stories with 1-sentence summaries and source attribution. Flags any market-moving news for the Wealth Agent. Updates active story threads with latest developments. Outputs brief to vault/intel/01_briefs/YYYY-MM-DD-morning.md.

## Configuration

Configure your source list and interest lens at `vault/intel/config.md` with your topics, sources, and keywords. In demo mode, reads from `vault-demo/intel/state.md`.

## Calls

- **Flows:** `arlive-intel-scan-sources`, `arlive-intel-filter-stories`, `arlive-intel-build-brief`
- **Tasks:** `arlive-intel-update-threads`, `arlive-intel-flag-market-news`

## Apps

`rss` (feed reader), `brave-search` (web sources), `gdrive` (optional — for writing brief to Google Docs)

## Vault Output

`vault/intel/01_briefs/YYYY-MM-DD-morning.md`
