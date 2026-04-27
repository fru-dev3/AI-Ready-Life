---
type: task
trigger: user-or-flow
description: >
  Maintains a single structured reading queue (books, articles, papers) with
  priority, status, expected time, and source. Replaces ad-hoc Goodreads / Pocket
  / saved-tabs / open-browser-tab sprawl. One canonical list, one place to
  prioritize.
---

# learning-update-reading-list

**Trigger:**
- User input: "add to reading list", "queue this book", "save this paper", "update reading list"
- Called by: `op-monthly-theme-set` (queue resources for the theme), `flow-build-learning-summary`

## What It Does

Single canonical reading queue that replaces scattered "to read" lists. Works for books, articles, papers, and long blog posts equally.

**Per-entry fields:**
- `title`, `author`, `format` (book / article / paper / post / podcast-episode), `source_url`, `source` (where you heard about it — name a person or feed if possible).
- `priority` — high / medium / low. Soft cap: ≤5 high at a time.
- `status` — queued / in-progress / completed / abandoned / archived.
- `expected_time` — minutes (article/post) or hours (book/paper).
- `theme_link` — optional link to a monthly theme (e.g. `2026-04`).
- `added_date`, `started_date`, `completed_or_abandoned_date`.

**Hygiene rules:**
- Anything `queued` for >180 days without becoming `in-progress`: surface to open-loops as "stale queue item — promote, demote, or archive."
- More than 5 `high` priority items: prompt the user to demote.
- More than 3 simultaneous `in-progress` items: warn (context-switching cost).

## Steps

1. Read existing list `vault/learning/00_current/reading-list.md`.
2. Apply add / update / remove (one entry per invocation, or batch).
3. Apply hygiene rules; call `task-update-open-loops` for stale items.
4. If a `completed` book has no entry in `applied-outputs.md` within 30 days, surface as "did this lead anywhere?" prompt — not a flag, just a nudge in next reflection.

## Configuration

`vault/learning/config.md`:
- `reading_list_high_priority_cap` (default 5)
- `reading_list_stale_days` (default 180)

## Vault Paths

- Writes: `vault/learning/00_current/reading-list.md`, `vault/learning/open-loops.md`.
