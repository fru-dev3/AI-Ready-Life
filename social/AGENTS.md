<!-- Codex / non-Claude agents: this file mirrors CLAUDE.md so any AGENTS.md-aware agent (Codex CLI, etc.) reads the same instructions. Both files stay in sync. -->

# AI Ready Life: Social Plugin

## Vault Location

| OS | Vault path |
|----|------------|
| **Mac** | `~/Documents/aireadylife/vault/social/` |
| **Windows** | `%USERPROFILE%\Documents\aireadylife\vault\social\` |

Determine the user's OS from context (file paths they share, or ask if unclear). Use the correct path for their OS. Never use relative paths.

## First Time Setup

If `~/Documents/aireadylife/vault/social/` does not exist or is empty:

1. Purchase the **AI Ready Life: Social Vault** at [frudev.gumroad.com/l/aireadylife-social](https://frudev.gumroad.com/l/aireadylife-social)
2. Unzip the download
3. Move the `social/` folder to `~/Documents/aireadylife/vault/`
4. Open `~/Documents/aireadylife/vault/social/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

## Vault Structure

```
~/Documents/aireadylife/vault/social/
├── config.md                    — your profile and settings
├── open-loops.md                — active flags and open items
├── 00_current/
│   ├── contacts.md              — relationship roster (vault file convention; no skill)
│   ├── occasions.md             — gift/event occasions (weddings, baby showers, etc.)
│   ├── gifts.md                 — gift-planning ledger
│   ├── new-people.md            — recently-met people pending follow-up
│   ├── introductions.md         — intros made between contacts (social-capital ledger)
│   ├── outreach-goal.md         — current weekly outreach target
│   ├── last-signals.md          — last-contact dates derived from Gmail / Calendar
│   ├── cards.md                 — handwritten card sending ledger (optional)
│   └── ...
├── 01_interactions/             — per-contact interaction logs ({contact-slug}.md)
├── 01_prior/                    — prior period records (archived briefs, met-once archive)
└── 02_briefs/                   — generated briefs and reports
```

### Vault File Convention

Some plugin features live as **vault files** rather than skills. The contact roster is the canonical example: `00_current/contacts.md` is a structured markdown file the user maintains (or imports from iOS / Google Contacts), not a skill. Skills read it; the user writes it. The same applies to `occasions.md`, `groups` config entries, and `home_base` — small, hand-edited reference data. If a feature is read-only reference state with no automation, ship it as a vault file in `00_current/` and document the schema here, not as a skill folder.

## Skills

Skills are located under `social/skills/` — each skill has its own folder containing a `SKILL.md` file.

## Vault Access

**Mac:** If a file read fails with a permission error, Claude Desktop needs filesystem access. Tell the user:
> *Go to **System Settings → Privacy & Security → Full Disk Access**, add **Claude**, then restart Claude Desktop.*

**Windows:** Claude Desktop runs unrestricted — no permission grant needed.

Do not proceed with the skill until access is confirmed (Mac) or reassure the user that no action is needed (Windows).

## First Run

Before running **any skill or flow** in this domain — including flows called by other skills — read `~/Documents/aireadylife/vault/social/config.md` and check whether the key fields have been filled in (non-blank values after the `:`).

**Rules (follow exactly, no improvisation):**

1. **Vault folder is missing entirely** → output only: *"Your social vault isn't installed. Download it at [frudev.gumroad.com/l/aireadylife-social](https://frudev.gumroad.com/l/aireadylife-social), unzip, and place the `social/` folder at `~/Documents/aireadylife/vault/`."* Stop.

2. **Config fields are blank** (empty after `:`) → output the First-Run Message below verbatim. Stop. Do **not** scaffold files, offer alternatives, or ask questions.

3. **Config is filled in** → proceed with the requested skill normally.

### First-Run Message

> **Welcome to AI Ready Life: Social!**
>
> Your vault is installed at:
> - **Mac:** `~/Documents/aireadylife/vault/social/`
> - **Windows:** `%USERPROFILE%\Documents\aireadylife\vault\social\` Before skills can run, your config and documents need to be in place.
>
> **Step 1 — Complete your config**
> Open `~/Documents/aireadylife/vault/social/config.md` and fill in every field. Leave a field blank rather than guessing — the skills will flag anything that's missing.
>
> **Step 2 — Gather your documents and add them to `00_current/`**
> Here's what this domain needs:
>
- **Key contacts list** — for each person you want to track: full name, relationship (friend, mentor, colleague, family), and last time you connected.
- **Upcoming birthdays and anniversaries** — name, date, and relationship. Check your phone contacts or Facebook for dates.
- **Contacts to reconnect with** — anyone you've been meaning to reach out to but haven't in 3+ months.
- **Outreach notes** — for anyone you want to stay close to: what to talk about, shared interests, or where they are in their career.
>
> **Step 3 — Run your first skill**
> Once config.md is filled in and at least a few documents are in `00_current/`, try: *"relationship health check"*
>
> You don't need everything perfect to start — add what you have and the skills will tell you what's still missing.
>
> **Stop here.** Do not scaffold files, do not offer options, do not ask questions. Wait for the user to complete setup and re-run the skill.

## Skill Index

Skills live in `skills/<skill-name>/SKILL.md`. To run a skill, read its `SKILL.md` and follow the instructions inside.

**Apps (data connectors — fallback when no native MCP connector available):**
- `app-linkedin.portal` — LinkedIn connections, profile data, messaging via Playwright with Chrome cookies. (Native MCP connectors handle Gmail and Calendar; iOS / Google Contacts are read directly into `contacts.md` as a vault file.)

**Operations (user-facing routines):**
- `op-relationship-review` — Monthly: from-scratch health recalculation, vault-hygiene scan, 30-day birthday forward scan, outstanding follow-up review, structural-pattern observations, monthly outreach plan. (Absorbs the previous `op-monthly-sync`.)
- `op-family-relationships-review` — Weekly review of family-tier contacts (partner, parents, children, siblings, extended). Tighter cadence thresholds than friends/professional.
- `op-local-community-review` — Monthly review of geographically-local contacts within a configurable radius. Surfaces upcoming local events and recommends one community-presence action.
- `op-birthday-watch` — Weekly 14-day birthday/milestone scan with suggested actions.
- `op-review-brief` — Weekly social brief: top 5 outreach actions, outreach-goal progress, unanswered close-circle messages, reciprocity flags.

**Flows (multi-step internals called by ops):**
- `flow-build-outreach-queue` — Prioritized outreach list (birthdays in 14 days, overdue relationships, warm reconnect opportunities).
- `flow-build-relationship-health-summary` — Health table for all tracked contacts: last contact, health status, tier.
- `flow-group-circle-management` *(v2)* — Group-level cadence vs individual-level for named groups (book club, peer group, etc.). Only runs when `groups` configured.

**Tasks (atomic operations called by flows / ops):**
- `task-pull-relationship-signals-from-gmail-calendar` — Pulls last-email and last-meeting timestamps via native Gmail + Calendar connectors; merges with manual interaction log.
- `task-log-interaction` — Records a manual interaction (in-person, phone, text) when no native signal exists.
- `task-schedule-social-commitment` — Writes a Calendar event for a planned outreach (call, coffee, meal) so social time is calendared.
- `task-flag-overdue-contact` — Writes overdue-contact flag to `open-loops.md` with tier-specific thresholds and reconnect hook.
- `task-flag-unanswered-close-circle-message` — Daily Gmail scan; flags inbound messages from Tier 1 / family-immediate older than 24h with no reply.
- `task-detect-reciprocity-gap` — Scans interaction log; flags contacts where last 3+ interactions were other-initiated or ask-only.
- `task-plan-special-occasion-gift` — Surfaces upcoming gift occasions with budget, ideas, status; flags shipping-deadline risks.
- `task-log-introduction-made` — Records introductions made between contacts; tallies intros made vs received as a reciprocity signal.
- `task-set-weekly-outreach-goal` — Sets weekly outreach target by channel; tracks progress against Gmail + Calendar + manual signals.
- `task-log-new-person-met` — Captures new acquaintances with auto-decay if not followed up; auto-promote on reciprocated follow-up.
- `task-track-card-note-sending` *(v2)* — Tracks owed thank-you / condolence / holiday cards; surfaces missing addresses pre-November.
- `task-update-open-loops` — Single write point for `open-loops.md`.
