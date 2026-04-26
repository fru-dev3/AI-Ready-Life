<!-- Codex / non-Claude agents: this file mirrors CLAUDE.md so any AGENTS.md-aware agent (Codex CLI, etc.) reads the same instructions. Both files stay in sync. -->

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

- **`coursera`** — Tracks enrolled course progress, completion percentages, certificate status, and upcoming assignment deadlines on Coursera via Playwright with Chrome cookie session.
- **`kindle`** — Accesses Kindle reading progress and highlights via Amazon's Manage Content page or Goodreads RSS sync.
- **`learning-flow-build-progress-summary`** — Reads all active learning items from vault, calculates completion percentage vs.
- **`learning-flow-build-reading-summary`** — Reads the reading list and completion log to produce a reading progress summary: books completed YTD (count and titles), current book with percentage complete and projected completion date at current pace, books/month pace vs.
- **`learning-op-goal-review`** — Quarterly learning goal alignment review evaluating whether the active learning portfolio is pointed at career and life vision priorities for the next quarter.
- **`learning-op-monthly-sync`** — Full learning data sync on the 1st of each month.
- **`learning-op-progress-review`** — Monthly learning progress review checking all active courses and certifications for completion pace vs.
- **`learning-op-review-brief`** — Weekly learning brief compiling active course progress with pace status, current book chapter and reading pace vs.
- **`learning-task-flag-falling-behind`** — Writes a behind-pace flag to vault/learning/open-loops.md when a learning item's completion percentage is more than 15 percentage points behind the time-elapsed percentage.
- **`learning-task-log-completion`** — Records a completed course, certification, or book to vault/learning/01_prior/ with full context: title, type, platform, completion date, estimated hours invested, 1-3 key takeaways in plain language (Feynman-style), personal rating (1-5), and any credential earned with ID or URL.
- **`learning-task-update-open-loops`** — Maintains vault/learning/open-loops.md as the canonical list of outstanding learning action items.
