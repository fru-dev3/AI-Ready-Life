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

**Apps (data connectors — manual fallback when no native MCP connector available):**
- `app-gcalendar` — Google Calendar API. Fallback for users without a native Google Calendar MCP connector.
- `app-notion` — Notion API. Fallback for users without a native Notion MCP connector.

**Operations (user-facing routines):**
- `op-daily-brief` — 10-min start-of-day brief across all configured calendars: today's events, meeting-prep status, urgent deadlines (≤7d), today's protected blocks. Daily.
- `op-weekly-agenda` — Monday morning agenda builder; covers the 8–30 day deadline window, ranks priorities, places focus blocks. Weekly.
- `op-conflict-scan` — Cross-calendar double-booking + protected-block-violation detector across every configured calendar. User-triggered + called by daily/weekly ops.
- `op-time-allocation-review` — Monthly retrospective: hours allocated across time buckets vs. paragon balance; flags imbalance. Monthly.
- `op-quarterly-time-design-rebalance` — Big quarterly retro + redesign of protected blocks and targets. Quarterly.
- `op-recurring-event-audit` — Quarterly hygiene scan for "zombie" recurring events. Quarterly.
- `op-holiday-observance-sync` — Annual sync of federal + user-configured cultural/religious holidays as protected events. Annual + on-demand.
- `op-deadline-planning` — On-demand backward-planner from a deadline date.
- `op-focus-time-review` — Weekly focus time audit.

**Flows (multi-step internals called by ops):**
- `flow-protect-recurring-blocks` — Reads `recurring_blocks` config, writes consistently-named recurring protected events via `task-create-confirmed-event`.
- `flow-build-agenda` — Builds the week-ahead agenda; ranks items; proposes focus blocks.
- `flow-collect-deadlines` — Cross-plugin scan of `open-loops.md` for items with due dates ≤60d.
- `flow-analyze-focus-time` — Meeting-load vs. focus-block ratio across configured calendars.
- `flow-energy-aware-scheduling` *(v2)* — Scores candidate focus windows against chronotype + energy log.

**Tasks (atomic operations called by flows / ops):**
- `task-create-confirmed-event` — Single write-point for every agent-initiated event create/update; enforces approval + naming convention.
- `task-add-meeting-prep` — Drafts agenda + context for any meeting >30 min; writes to event description.
- `task-add-deadline` — Records a deadline to `00_current/` with description, due date, domain, effort, priority.
- `task-add-travel-buffer` — Pre-departure, transit, arrival, and (conditional) jet-lag buffers around a trip.
- `task-block-after-travel-recovery` *(v2)* — Recovery block after long-haul / extended travel.
- `task-track-pto-ooo` — PTO ledger, balance, use-it-or-lose-it surface (W-2 only; no-ops for contractors).
- `task-import-birthdays-from-social` — Imports birthdays from the social plugin roster as recurring all-day events.
- `task-decline-template` — Pre-built decline / counter-propose / async-instead / delegate / defer drafts. Never sends.
- `task-update-open-loops` — Single write point for `open-loops.md`; handles deadline clusters, focus deficits, unscheduled priorities, and approaching-deadline flags (≤7d, no prep).
