<!-- Codex / non-Claude agents: this file mirrors CLAUDE.md so any AGENTS.md-aware agent (Codex CLI, etc.) reads the same instructions. Both files stay in sync. -->

# AI Ready Life: Calendar Plugin

## Vault Location

| OS | Vault path |
|----|------------|
| **Mac** | `~/Documents/aireadylife/vault/calendar/` |
| **Windows** | `%USERPROFILE%\Documents\aireadylife\vault\calendar\` |

Determine the user's OS from context (file paths they share, or ask if unclear). Use the correct path for their OS. Never use relative paths.

## First Time Setup

If `~/Documents/aireadylife/vault/calendar/` does not exist or is empty:

1. Purchase the **AI Ready Life: Calendar Vault** at [frudev.gumroad.com/l/aireadylife-calendar](https://frudev.gumroad.com/l/aireadylife-calendar)
2. Unzip the download
3. Move the `calendar/` folder to `~/Documents/aireadylife/vault/`
4. Open `~/Documents/aireadylife/vault/calendar/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

## Vault Structure

```
~/Documents/aireadylife/vault/calendar/
├── config.md          — your profile and settings
├── open-loops.md      — active flags and open items
├── 00_current/        — active documents and current state
├── 01_prior/          — prior period records
└── 02_briefs/         — generated briefs and reports
```

## Skills

Skills are located under `calendar/skills/` — each skill has its own folder containing a `SKILL.md` file.

## Vault Access

**Mac:** If a file read fails with a permission error, Claude Desktop needs filesystem access. Tell the user:
> *Go to **System Settings → Privacy & Security → Full Disk Access**, add **Claude**, then restart Claude Desktop.*

**Windows:** Claude Desktop runs unrestricted — no permission grant needed.

Do not proceed with the skill until access is confirmed (Mac) or reassure the user that no action is needed (Windows).

## First Run

Before running **any skill or flow** in this domain — including flows called by other skills — read `~/Documents/aireadylife/vault/calendar/config.md` and check whether the key fields have been filled in (non-blank values after the `:`).

**Rules (follow exactly, no improvisation):**

1. **Vault folder is missing entirely** → output only: *"Your calendar vault isn't installed. Download it at [frudev.gumroad.com/l/aireadylife-calendar](https://frudev.gumroad.com/l/aireadylife-calendar), unzip, and place the `calendar/` folder at `~/Documents/aireadylife/vault/`."* Stop.

2. **Config fields are blank** (empty after `:`) → output the First-Run Message below verbatim. Stop. Do **not** scaffold files, offer alternatives, or ask questions.

3. **Config is filled in** → proceed with the requested skill normally.

### First-Run Message

> **Welcome to AI Ready Life: Calendar!**
>
> Your vault is installed at:
> - **Mac:** `~/Documents/aireadylife/vault/calendar/`
> - **Windows:** `%USERPROFILE%\Documents\aireadylife\vault\calendar\` Before skills can run, your config and documents need to be in place.
>
> **Step 1 — Complete your config**
> Open `~/Documents/aireadylife/vault/calendar/config.md` and fill in every field. Leave a field blank rather than guessing — the skills will flag anything that's missing.
>
> **Step 2 — Gather your documents and add them to `00_current/`**
> Here's what this domain needs:
>
- **Upcoming deadlines** — any time-sensitive items: tax dates, insurance renewals, lease expirations, enrollment windows. One per line with the due date.
- **Recurring commitments** — weekly or monthly obligations (team meetings, therapy, gym, etc.) with day and time.
- **Focus time targets** — how many hours of deep work per week you're trying to protect, and your preferred focus window (morning, afternoon).
- **Key annual dates** — dates that require advance prep: performance reviews, open enrollment, lease renewal, annual subscriptions that auto-renew.
>
> **Step 3 — Run your first skill**
> Once config.md is filled in and at least a few documents are in `00_current/`, try: *"weekly agenda"*
>
> You don't need everything perfect to start — add what you have and the skills will tell you what's still missing.
>
> **Stop here.** Do not scaffold files, do not offer options, do not ask questions. Wait for the user to complete setup and re-run the skill.

## Skill Index

Skills live in `skills/<skill-name>/SKILL.md`. To run a skill, read its `SKILL.md` and follow the instructions inside.

- **`calendar-flow-analyze-focus-time`** — Analyzes the ratio of meetings vs.
- **`calendar-flow-build-agenda`** — Builds a week-ahead agenda combining cross-domain deadlines, calendar events, and priority open loops — then suggests 2-3 focus blocks for deep work items.
- **`calendar-flow-collect-deadlines`** — Scans all installed plugin open-loops.md files and extracts items with explicit due dates within the next 60 days, sorted chronologically with urgent items (due within 7 days) flagged separately.
- **`calendar-op-deadline-alert`** — Weekly deadline alert.
- **`calendar-op-deadline-planning`** — On-demand deadline planner; given a deadline date and task scope, works backward from the due date to create a preparation schedule with milestones, effort estimates, and calendar placement recommendations.
- **`calendar-op-focus-time-review`** — Weekly focus time audit; analyzes meeting load vs.
- **`calendar-op-review-brief`** — Weekly calendar brief.
- **`calendar-op-weekly-agenda`** — Monday morning weekly agenda builder; collects all cross-domain deadlines and priorities for the coming week, then suggests focus time blocks based on urgency and effort.
- **`calendar-task-add-deadline`** — Records a new deadline to vault/calendar/00_current/ with item description, due date, domain, effort estimate, priority, and linked open loop.
- **`calendar-task-flag-approaching-deadline`** — Writes a deadline alert to vault/calendar/open-loops.md when a cross-domain item is due within 7 days with no preparation activity started.
- **`calendar-task-update-open-loops`** — Writes calendar flags (upcoming deadline clusters, focus time deficits, unscheduled high-priority items) to vault/calendar/open-loops.md and resolves completed items.
- **`gcalendar`** — Reads and creates calendar events via the Google Calendar API.
- **`notion`** — Reads and writes Notion pages and databases via the Notion API.
