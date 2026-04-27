# AI Ready Life: Learning Plugin

## Vault Location

| OS | Vault path |
|----|------------|
| **Mac** | `~/Documents/aireadylife/vault/learning/` |
| **Windows** | `%USERPROFILE%\Documents\aireadylife\vault\learning\` |

Determine the user's OS from context (file paths they share, or ask if unclear). Use the correct path for their OS. Never use relative paths.

## First Time Setup

If `~/Documents/aireadylife/vault/learning/` does not exist or is empty:

1. Purchase the **AI Ready Life: Learning Vault** at [frudev.gumroad.com/l/aireadylife-learning](https://frudev.gumroad.com/l/aireadylife-learning)
2. Unzip the download
3. Move the `learning/` folder to `~/Documents/aireadylife/vault/`
4. Open `~/Documents/aireadylife/vault/learning/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

## Vault Structure

```
~/Documents/aireadylife/vault/learning/
├── config.md          — your profile and settings
├── open-loops.md      — active flags and open items
├── 00_current/        — active documents and current state
├── 01_prior/          — prior period records
└── 02_briefs/         — generated briefs and reports
```

## Skills

Skills are located under `learning/skills/` — each skill has its own folder containing a `SKILL.md` file.

## Vault Access

**Mac:** If a file read fails with a permission error, Claude Desktop needs filesystem access. Tell the user:
> *Go to **System Settings → Privacy & Security → Full Disk Access**, add **Claude**, then restart Claude Desktop.*

**Windows:** Claude Desktop runs unrestricted — no permission grant needed.

Do not proceed with the skill until access is confirmed (Mac) or reassure the user that no action is needed (Windows).

## First Run

Before running **any skill or flow** in this domain — including flows called by other skills — read `~/Documents/aireadylife/vault/learning/config.md` and check whether the key fields have been filled in (non-blank values after the `:`).

**Rules (follow exactly, no improvisation):**

1. **Vault folder is missing entirely** → output only: *"Your learning vault isn't installed. Download it at [frudev.gumroad.com/l/aireadylife-learning](https://frudev.gumroad.com/l/aireadylife-learning), unzip, and place the `learning/` folder at `~/Documents/aireadylife/vault/`."* Stop.

2. **Config fields are blank** (empty after `:`) → output the First-Run Message below verbatim. Stop. Do **not** scaffold files, offer alternatives, or ask questions.

3. **Config is filled in** → proceed with the requested skill normally.

### First-Run Message

> **Welcome to AI Ready Life: Learning!**
>
> Your vault is installed at:
> - **Mac:** `~/Documents/aireadylife/vault/learning/`
> - **Windows:** `%USERPROFILE%\Documents\aireadylife\vault\learning\` Before skills can run, your config and documents need to be in place.
>
> **Step 1 — Complete your config**
> Open `~/Documents/aireadylife/vault/learning/config.md` and fill in every field. Leave a field blank rather than guessing — the skills will flag anything that's missing.
>
> **Step 2 — Gather your documents and add them to `00_current/`**
> Here's what this domain needs:
>
- **Active courses** — platform (Coursera, Udemy, etc.), course name, enrollment date, and current completion percentage.
- **Books in progress** — title, author, format (physical/Kindle/audio), and current progress (chapter or percentage).
- **Recently completed** — courses or books finished in the past 90 days with key takeaways.
- **Learning goals** — skills you want to develop this year, with target milestones and deadlines.
- **Certifications in progress (optional)** — certification name, exam date, and study schedule.
>
> **Step 3 — Run your first skill**
> Once config.md is filled in and at least a few documents are in `00_current/`, try: *"learning review"*
>
> You don't need everything perfect to start — add what you have and the skills will tell you what's still missing.
>
> **Stop here.** Do not scaffold files, do not offer options, do not ask questions. Wait for the user to complete setup and re-run the skill.

## Skill Index

Skills live in `skills/<skill-name>/SKILL.md`. To run a skill, read its `SKILL.md` and follow the instructions inside.

**Apps (data connectors — fallback when no native MCP connector available):**
- `app-coursera` — Course progress / certificate status / assignment deadlines via Playwright + Chrome cookie session.
- `app-kindle` — Reading progress and highlights via Amazon's Manage Content page or Goodreads RSS sync.

**Operations (user-facing routines):**
- `op-monthly-theme-set` — Monthly (1st). One named theme, one resource, one applied output, weekly milestones.
- `op-monthly-sync` — Full monthly process: platform refresh, reading sync, certification timeline, unified pace review, monthly brief.
- `op-monthly-reflection` — End-of-month qualitative reflection — what changed, what blocked, what's next.
- `op-goal-review` — Quarterly learning-portfolio alignment vs. career and vision priorities.
- `op-review-brief` — Weekly snapshot of pace, current book, streak, and next actions.

**Flows (multi-step internals called by ops):**
- `flow-build-learning-summary` — Unified pace + per-type rollup across courses / certs / books / papers / projects. Replaces former progress + reading summaries.
- `flow-build-streak-summary` — Daily/weekly consistency: streak length, target adherence, weekday/weekend split.
- `flow-scan-emerging-sources` — Field-agnostic horizon scan from user-configured RSS / newsletters / arxiv / podcasts.
- `flow-language-learning-progress` *(v2)* — Per-language vocabulary, app streak, CEFR self-eval. Only if a language is configured.

**Tasks (atomic operations called by flows / ops):**
- `task-log-applied-output` — Records the artifact (project, repo, post, cert, talk, deck) that proves a skill was applied.
- `task-track-learning-budget` — Spend ledger against a user-configured budget; 90 / 30-day expiry flags. Skips cleanly with no budget.
- `task-update-reading-list` — Single canonical queue across books, articles, papers, posts.
- `task-log-conference-workshop` — Conference / workshop / meetup log with takeaways, contacts, follow-ups.
- `task-capture-note` — Atomic note capture with theme + source tags.
- `task-link-learning-to-domain` — Tags a learning item with the life domain it serves; writes a one-line application note to that domain.
- `task-mentor-mentee-log` *(v2)* — Per-meeting log for mentor / mentee / coaching relationships.
- `task-flag-falling-behind` — Behind-pace alert with recovery calculation.
- `task-log-completion` — Records a completed course, certification, or book.
- `task-update-open-loops` — Single write point for `open-loops.md`.
