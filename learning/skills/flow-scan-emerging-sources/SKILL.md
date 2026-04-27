---
type: flow
trigger: called-by-op
description: >
  Pulls from user-configured sources (arxiv, industry blogs, newsletters, podcast
  feeds, model release notes, conference proceedings — whatever fits the field)
  and ranks 5–10 emerging topics relevant to the user's themes and skill gaps.
  Field-agnostic — finance, medicine, software, design, law all configure their
  own source list.
---

# learning-scan-emerging-sources

**Trigger:** Called by `op-monthly-theme-set` (input candidate themes), `op-goal-review`, on-demand.
**Produces:** Ranked list written to `vault/learning/00_current/horizon-YYYY-MM.md`.

## What It Does

Field-agnostic horizon scanner. The user owns the source list — the flow does the aggregation, dedup, and ranking.

**Source types supported (any combination):**
- RSS / Atom feeds (blogs, arxiv categories, newsletters, podcast feeds).
- Email-newsletter inbox label (Gmail label scrape via `app-gmail`).
- Twitter / X list export (manual, drop into vault).
- YouTube channel uploads RSS.
- Conference / journal pages (Playwright scrape if listed in config).
- Free-text "topics I keep hearing about" entries the user adds manually.

**Ranking factors (each topic):**
1. Frequency — how many distinct sources mention it in the window.
2. Recency — weight last 14 days higher.
3. Theme alignment — does it touch the user's `learning_priorities` or current monthly theme?
4. Gap alignment — does it close a skill gap from `vault/career/` if installed?
5. Novelty — was it on last month's list? If yes, deprioritize unless it shipped a major update.

Window default: trailing 30 days.

**Output:** ranked list of 5–10 topics with title, 1-line summary, top 3 sources, suggested action (one of: read, watch, skim, ignore-for-now).

## Steps

1. Read `vault/learning/config.md` `horizon_sources` list.
2. For each source: pull recent items (RSS via http, Gmail via app, Playwright as fallback).
3. Cluster items by topic (simple keyword + title overlap; prompt user when ambiguous).
4. Score each topic on the 5 factors above.
5. Take top 5–10. Write `vault/learning/00_current/horizon-YYYY-MM.md`.
6. Return list to caller.

## Configuration

`vault/learning/config.md`:
- `horizon_sources` — list of `{type, url_or_label, weight}`.
- `horizon_window_days` (default 30).
- `horizon_top_n` (default 7).

## Vault Paths

- Reads: `vault/learning/config.md`, `vault/career/00_current/skills-gap.md` (optional).
- Writes: `vault/learning/00_current/horizon-YYYY-MM.md`.
