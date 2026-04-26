<!-- Codex / non-Claude agents: this file mirrors CLAUDE.md so any AGENTS.md-aware agent (Codex CLI, etc.) reads the same instructions. Both files stay in sync. -->

# AI Ready Life: Intel Plugin

## Vault Location

| OS | Vault path |
|----|------------|
| **Mac** | `~/Documents/aireadylife/vault/intel/` |
| **Windows** | `%USERPROFILE%\Documents\aireadylife\vault\intel\` |

Determine the user's OS from context (file paths they share, or ask if unclear). Use the correct path for their OS. Never use relative paths.

## First Time Setup

If `~/Documents/aireadylife/vault/intel/` does not exist or is empty:

1. Purchase the **AI Ready Life: Intel Vault** at [frudev.gumroad.com/l/aireadylife-intel](https://frudev.gumroad.com/l/aireadylife-intel)
2. Unzip the download
3. Move the `intel/` folder to `~/Documents/aireadylife/vault/`
4. Open `~/Documents/aireadylife/vault/intel/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

## Vault Structure

```
~/Documents/aireadylife/vault/intel/
├── config.md          — your profile and settings
├── open-loops.md      — active flags and open items
├── 00_current/        — active documents and current state
├── 01_prior/          — prior period records
└── 02_briefs/         — generated briefs and reports
```

## Skills

Skills are located under `intel/skills/` — each skill has its own folder containing a `SKILL.md` file.

## Vault Access

**Mac:** If a file read fails with a permission error, Claude Desktop needs filesystem access. Tell the user:
> *Go to **System Settings → Privacy & Security → Full Disk Access**, add **Claude**, then restart Claude Desktop.*

**Windows:** Claude Desktop runs unrestricted — no permission grant needed.

Do not proceed with the skill until access is confirmed (Mac) or reassure the user that no action is needed (Windows).

## First Run

Before running **any skill or flow** in this domain — including flows called by other skills — read `~/Documents/aireadylife/vault/intel/config.md` and check whether the key fields have been filled in (non-blank values after the `:`).

**Rules (follow exactly, no improvisation):**

1. **Vault folder is missing entirely** → output only: *"Your intel vault isn't installed. Download it at [frudev.gumroad.com/l/aireadylife-intel](https://frudev.gumroad.com/l/aireadylife-intel), unzip, and place the `intel/` folder at `~/Documents/aireadylife/vault/`."* Stop.

2. **Config fields are blank** (empty after `:`) → output the First-Run Message below verbatim. Stop. Do **not** scaffold files, offer alternatives, or ask questions.

3. **Config is filled in** → proceed with the requested skill normally.

### First-Run Message

> **Welcome to AI Ready Life: Intel!**
>
> Your vault is installed at:
> - **Mac:** `~/Documents/aireadylife/vault/intel/`
> - **Windows:** `%USERPROFILE%\Documents\aireadylife\vault\intel\` Before skills can run, your config and documents need to be in place.
>
> **Step 1 — Complete your config**
> Open `~/Documents/aireadylife/vault/intel/config.md` and fill in every field. Leave a field blank rather than guessing — the skills will flag anything that's missing.
>
> **Step 2 — Gather your documents and add them to `00_current/`**
> Here's what this domain needs:
>
- **Watch topics** — list of subjects you want to track (e.g., AI regulation, interest rates, a specific industry, a company). One per line.
- **Source list** — publications, newsletters, podcasts, or feeds you follow. Include URL or name.
- **Keywords or signals** — specific terms, tickers, or names you want flagged when they appear in coverage.
- **Research questions** — any open questions you're trying to answer through ongoing monitoring.
>
> **Step 3 — Run your first skill**
> Once config.md is filled in and at least a few documents are in `00_current/`, try: *"intel brief"*
>
> You don't need everything perfect to start — add what you have and the skills will tell you what's still missing.
>
> **Stop here.** Do not scaffold files, do not offer options, do not ask questions. Wait for the user to complete setup and re-run the skill.

## Skill Index

Skills live in `skills/<skill-name>/SKILL.md`. To run a skill, read its `SKILL.md` and follow the instructions inside.

- **`feedly`** — Reads RSS feed articles and trending topics from Feedly via API or Playwright.
- **`intel-flow-build-news-digest`** — Pulls news from configured RSS feeds and sources, filters to priority topics, deduplicates, and formats as a scannable daily digest.
- **`intel-flow-build-topic-summary`** — Aggregates recent coverage on a specific topic into a structured summary: current state, key players, recent developments, and open questions.
- **`intel-op-daily-briefing`** — Generates a daily news digest filtered to configured priority topics and sources.
- **`intel-op-review-brief`** — Daily morning intelligence brief.
- **`intel-op-source-scan`** — Weekly source health audit.
- **`intel-op-topic-deep-dive`** — On-demand deep dive on a specific topic that pulls recent coverage, identifies key voices, and summarizes the state of play.
- **`intel-task-flag-priority-story`** — Writes a flag to vault/intel/open-loops.md when a story on a configured priority topic appears from a high-credibility source, with headline, source, summary, why it matters, and action needed.
- **`intel-task-log-source`** — Adds a new news source to vault/intel/00_current/ with name, URL/feed, type, topic tags, and credibility rating.
- **`intel-task-update-open-loops`** — Writes all intel flags (breaking priority stories, source gaps, follow-up items) to vault/intel/open-loops.md and resolves completed items.
- **`pocket`** — Accesses saved articles and reading queue from Pocket (Mozilla) via OAuth API.
