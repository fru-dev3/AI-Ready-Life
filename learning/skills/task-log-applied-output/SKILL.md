---
type: task
trigger: user-or-flow
description: >
  Records the artifact that proves a learned skill was actually applied: a URL or
  path to a project, blog post, repo, certification, talk, deck, or notebook.
  Generic — works whether the user creates content for a living or applies skills
  in their day job only. Closes the "learn-without-shipping" gap.
---

# learning-log-applied-output

**Trigger:**
- User input: "log applied output", "I shipped X", "log my project"
- Called by: `op-monthly-theme-set` (on month-end), `op-monthly-reflection`

## What It Does

Appends one row to `vault/learning/00_current/applied-outputs.md` recording the artifact tied to a learning theme or learning item.

**Required fields:**
- `date` — date the artifact shipped or was made public/visible.
- `theme` — links back to the monthly theme (e.g. `2026-04`).
- `learning_item` — the course / book / source the skill came from (free-text).
- `output_type` — one of: project, blog-post, repo, certification, talk, deck, notebook, internal-doc, app, video, other.
- `link_or_path` — URL (preferred) or vault path. Internal-only artifacts can use vault path.
- `audience` — self / team / company / public.
- `notes` — one line: what was the application (≤140 chars).

**Validation:**
- If `link_or_path` is empty, this is not yet an applied output — record as a draft and flag in open-loops.
- If `output_type` is `other`, prompt the user for a one-word category and append to the allow-list in config.

## Steps

1. Read input fields (interactive or programmatic).
2. Validate required fields.
3. Append to `vault/learning/00_current/applied-outputs.md` (table format).
4. If linked to current month's theme, mark the theme's milestone as hit.
5. If draft (no link yet), write to open-loops with severity LOW.

## Configuration

`vault/learning/config.md`:
- `applied_output_types_allowlist` (default: project, blog-post, repo, certification, talk, deck, notebook, internal-doc, app, video)

## Vault Paths

- Writes: `vault/learning/00_current/applied-outputs.md`, `vault/learning/00_current/theme-YYYY-MM.md` (milestone update), `vault/learning/open-loops.md`
