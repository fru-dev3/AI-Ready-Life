---
type: flow
trigger: called-by-op
description: >
  v2 — only relevant for users learning a language. Computes vocabulary count,
  app streak (Duolingo, Anki, Pimsleur, Babbel, etc.), CEFR self-eval, and
  practice-hours-by-skill (reading / listening / speaking / writing). Skipped
  cleanly when no language is configured.
---

# learning-language-learning-progress

**Trigger:** Called by `op-monthly-sync` (if any language configured), on-demand.
**Produces:** Structured per-language progress block returned to caller; appended to `vault/learning/00_current/language-progress.md`.

## What It Does

Skill is v2: only runs if `vault/learning/config.md` has at least one entry in `languages_learning`. With no entry, exits cleanly — no stub output.

**Per language tracked:**
- `code` (ISO 639-1, e.g. `es`, `fr`, `ja`).
- `target_cefr` — A1 / A2 / B1 / B2 / C1 / C2.
- `current_cefr_self_eval` — quarterly user check.
- `vocabulary_count` — from Anki deck or app export, or manual entry.
- `app_streak_days` — from app screenshot / manual entry (Duolingo etc. don't all expose APIs).
- `practice_minutes_by_skill` — last 30 days, split: reading / listening / speaking / writing.
- `next_milestone` — e.g. "first conversation", "watch a film without subs", "B2 exam".

**Diagnostic flags:**
- Heavy app-only practice with no speaking minutes → "passive trap" warning. Suggest a tutor/conversation partner.
- Vocabulary growing but CEFR self-eval flat for >2 quarters → suggest output-focused practice.
- App streak broken >7 days → flag to open-loops.

## Steps

1. Read `vault/learning/config.md` `languages_learning`. If empty, exit.
2. For each language: read the app log / Anki export / manual log from `vault/learning/00_current/languages/{code}/`.
3. Compute metrics above.
4. Apply diagnostic flags.
5. Return per-language block to caller; append to `language-progress.md`.

## Configuration

`vault/learning/config.md`:
- `languages_learning` — list of `{code, target_cefr, app, weekly_minutes_target}`.

## Vault Paths

- Reads: `vault/learning/00_current/languages/{code}/`.
- Writes: `vault/learning/00_current/language-progress.md`, `vault/learning/open-loops.md`.
