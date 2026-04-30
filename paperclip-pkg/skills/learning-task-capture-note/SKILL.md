---
type: task
trigger: user-or-flow
description: >
  Atomic note capture into the vault (or to the user's note system if Obsidian /
  Notion native connection is set). Tags by theme + source. Replaces the
  "I'll remember this" failure mode that loses 80% of learning the moment the
  session ends.
---

# learning-capture-note

**Trigger:**
- User input: "capture note", "save this idea", "log a learning note", "remember this"
- Called by: `op-monthly-reflection` (uses notes as source data), `task-log-conference-workshop` (per-session notes)

## What It Does

One-line-or-paragraph note capture, fast. Designed for the "in the middle of reading / watching / talking" moment where the cost of switching to a real notes app is high enough to drop the thought.

**Per-note fields:**
- `id` — auto-generated UTC timestamp slug (e.g. `2026-04-26T14-32-11`).
- `body` — free-text, plain markdown. No length cap, but the design assumes ≤300 words; longer captures should become a real document.
- `theme` — optional link to monthly theme.
- `source` — optional link to a learning item (course module, book chapter, paper section, conversation, podcast).
- `tags` — free-text user tags.
- `domain_link` — optional, triggers `task-link-learning-to-domain` if set.

**Storage:**
- Default: `vault/learning/00_current/notes/{YYYY-MM}/{id}.md` — one file per note. Monthly directory keeps the listing readable.
- If `external_notes_target` is set in config (e.g. `obsidian://...` URL or Notion DB ID): also write to that system. Vault stays canonical.

**Indexing:**
- Append a one-line entry to `vault/learning/00_current/notes/index.md` for fast scanning: `{id} | {first_line_of_body} | {theme} | {tags}`.

## Steps

1. Generate id.
2. Write note file.
3. Append to index.
4. If external target configured, push there too (best-effort; never block on external-system failure).
5. If `domain_link` set, call `task-link-learning-to-domain`.

## Configuration

`vault/learning/config.md`:
- `external_notes_target` (optional — Obsidian URI, Notion database ID, etc.).
- `default_note_tags` (optional list always applied).

## Vault Paths

- Writes: `vault/learning/00_current/notes/{YYYY-MM}/{id}.md`, `vault/learning/00_current/notes/index.md`.
