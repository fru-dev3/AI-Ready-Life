<!-- Codex / non-Claude agents: this file mirrors CLAUDE.md so any AGENTS.md-aware agent (Codex CLI, etc.) reads the same instructions. Both files stay in sync. -->

# AI Ready Life: Chief Plugin

## Vault Location

| OS | Vault path |
|----|------------|
| **Mac** | `~/Documents/aireadylife/vault/chief/` |
| **Windows** | `%USERPROFILE%\Documents\aireadylife\vault\chief\` |

Determine the user's OS from context (file paths they share, or ask if unclear). Use the correct path for their OS. Never use relative paths.

## First Time Setup

If `~/Documents/aireadylife/vault/chief/` does not exist or is empty:

1. Purchase the **AI Ready Life: Chief Vault** at [frudev.gumroad.com/l/aireadylife-chief](https://frudev.gumroad.com/l/aireadylife-chief)
2. Unzip the download
3. Move the `chief/` folder to `~/Documents/aireadylife/vault/`
4. Open `~/Documents/aireadylife/vault/chief/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

## Vault Structure

```
~/Documents/aireadylife/vault/chief/
├── config.md          — your profile and settings
├── open-loops.md      — active flags and open items
├── 00_current/        — active documents and current state
├── 01_prior/          — prior period records
└── 02_briefs/         — generated briefs and reports
```

## Skills

Skills are located under `chief/skills/` — each skill has its own folder containing a `SKILL.md` file.

## Vault Access

**Mac:** If a file read fails with a permission error, Claude Desktop needs filesystem access. Tell the user:
> *Go to **System Settings → Privacy & Security → Full Disk Access**, add **Claude**, then restart Claude Desktop.*

**Windows:** Claude Desktop runs unrestricted — no permission grant needed.

Do not proceed with the skill until access is confirmed (Mac) or reassure the user that no action is needed (Windows).

## First Run

Before running **any skill or flow** in this domain — including flows called by other skills — read `~/Documents/aireadylife/vault/chief/config.md` and check whether the key fields have been filled in (non-blank values after the `:`).

**Rules (follow exactly, no improvisation):**

1. **Vault folder is missing entirely** → output only: *"Your chief vault isn't installed. Download it at [frudev.gumroad.com/l/aireadylife-chief](https://frudev.gumroad.com/l/aireadylife-chief), unzip, and place the `chief/` folder at `~/Documents/aireadylife/vault/`."* Stop.

2. **Config fields are blank** (empty after `:`) → output the First-Run Message below verbatim. Stop. Do **not** scaffold files, offer alternatives, or ask questions.

3. **Config is filled in** → proceed with the requested skill normally.

### First-Run Message

> **Welcome to AI Ready Life: Chief!**
>
> Your vault is installed at:
> - **Mac:** `~/Documents/aireadylife/vault/chief/`
> - **Windows:** `%USERPROFILE%\Documents\aireadylife\vault\chief\` Before skills can run, your config and documents need to be in place.
>
> **Step 1 — Complete your config**
> Open `~/Documents/aireadylife/vault/chief/config.md` and fill in every field. Leave a field blank rather than guessing — the skills will flag anything that's missing.
>
> **Step 2 — Gather your documents and add them to `00_current/`**
> Here's what this domain needs:
>
- **Other domain vaults** — Chief reads across all your installed domains. Set up at least one other domain vault first (health, wealth, or career are good starting points).
- **Priority domains** — note which domains are active so Chief knows where to look for open loops and alerts.
- **Brief schedule preference** — when you want to run your daily brief (morning, evening) and what format you prefer (bullet list vs. narrative).
>
> **Step 3 — Run your first skill**
> Once config.md is filled in and at least a few documents are in `00_current/`, try: *"daily brief"*
>
> You don't need everything perfect to start — add what you have and the skills will tell you what's still missing.
>
> **Stop here.** Do not scaffold files, do not offer options, do not ask questions. Wait for the user to complete setup and re-run the skill.

## Skill Index

Skills live in `skills/<skill-name>/SKILL.md`. To run a skill, read its `SKILL.md` and follow the instructions inside.

- **`chief-flow-build-daily-brief`** — Assembles the daily brief from domain alerts, calendar items, and open loops into a prioritized ACTION TODAY format with Top 3 callout, domain alert table, and full open-loops list.
- **`chief-flow-build-weekly-agenda`** — Builds a week-ahead view with all cross-domain deadlines, meetings, top priorities, and focus time block recommendations.
- **`chief-flow-collect-domain-alerts`** — Scans open-loops.md across all installed plugin vaults and collects all active flags sorted by priority and domain.
- **`chief-op-daily-brief`** — Generates today's prioritized brief: top 3 actions, domain alerts, calendar items, and open loops across all installed plugins.
- **`chief-op-review-brief`** — Daily morning executive brief.
- **`chief-op-system-health`** — Weekly system health check.
- **`chief-op-weekly-preview`** — Monday morning weekly preview covering this week's deadlines, cross-domain priorities, and recommended focus time.
- **`chief-task-check-open-loops`** — Reads all open-loops.md files across installed plugin vaults and returns a count and priority summary.
- **`chief-task-flag-urgent-item`** — Writes a cross-domain urgent flag to vault/chief/00_current/ when an item from any domain is 🔴 priority.
- **`chief-task-pull-domain-status`** — Reads the state.md file from a specified plugin vault and returns a summary of current domain status: last updated, wellness or score if present, and open item count.
- **`gdrive`** — Reads and writes files in configured Google Drive folders via the Drive API.
- **`notion`** — Reads and writes Notion pages and databases via the Notion API.
