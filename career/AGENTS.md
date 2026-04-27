<!-- Codex / non-Claude agents: this file mirrors CLAUDE.md so any AGENTS.md-aware agent (Codex CLI, etc.) reads the same instructions. Both files stay in sync. -->

# AI Ready Life: Career Plugin

## Vault Location

| OS | Vault path |
|----|------------|
| **Mac** | `~/Documents/aireadylife/vault/career/` |
| **Windows** | `%USERPROFILE%\Documents\aireadylife\vault\career\` |

Determine the user's OS from context (file paths they share, or ask if unclear). Use the correct path for their OS. Never use relative paths.

## First Time Setup

If `~/Documents/aireadylife/vault/career/` does not exist or is empty:

1. Purchase the **AI Ready Life: Career Vault** at [frudev.gumroad.com/l/aireadylife-career](https://frudev.gumroad.com/l/aireadylife-career)
2. Unzip the download
3. Move the `career/` folder to `~/Documents/aireadylife/vault/`
4. Open `~/Documents/aireadylife/vault/career/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

## Vault Structure

```
~/Documents/aireadylife/vault/career/
├── config.md          — your profile and settings
├── open-loops.md      — active flags and open items
├── 00_current/        — active documents and current state
├── 01_prior/          — prior period records
└── 02_briefs/         — generated briefs and reports
```

## Skills

Skills are located under `career/skills/` — each skill has its own folder containing a `SKILL.md` file.

## Vault Access

**Mac:** If a file read fails with a permission error, Claude Desktop needs filesystem access. Tell the user:
> *Go to **System Settings → Privacy & Security → Full Disk Access**, add **Claude**, then restart Claude Desktop.*

**Windows:** Claude Desktop runs unrestricted — no permission grant needed.

Do not proceed with the skill until access is confirmed (Mac) or reassure the user that no action is needed (Windows).

## First Run

Before running **any skill or flow** in this domain — including flows called by other skills — read `~/Documents/aireadylife/vault/career/config.md` and check whether the key fields have been filled in (non-blank values after the `:`).

**Rules (follow exactly, no improvisation):**

1. **Vault folder is missing entirely** → output only: *"Your career vault isn't installed. Download it at [frudev.gumroad.com/l/aireadylife-career](https://frudev.gumroad.com/l/aireadylife-career), unzip, and place the `career/` folder at `~/Documents/aireadylife/vault/`."* Stop.

2. **Config fields are blank** (empty after `:`) → output the First-Run Message below verbatim. Stop. Do **not** scaffold files, offer alternatives, or ask questions.

3. **Config is filled in** → proceed with the requested skill normally.

### First-Run Message

> **Welcome to AI Ready Life: Career!**
>
> Your vault is installed at:
> - **Mac:** `~/Documents/aireadylife/vault/career/`
> - **Windows:** `%USERPROFILE%\Documents\aireadylife\vault\career\` Before skills can run, your config and documents need to be in place.
>
> **Step 1 — Complete your config**
> Open `~/Documents/aireadylife/vault/career/config.md` and fill in every field. Leave a field blank rather than guessing — the skills will flag anything that's missing.
>
> **Step 2 — Gather your documents and add them to `00_current/`**
> Here's what this domain needs:
>
- **Offer letter or pay stub** — to confirm your current base salary, bonus target, and equity grant details.
- **Job description** — your current role title and key responsibilities (copy/paste from your company's internal job posting or LinkedIn).
- **Skills inventory** — a list of your technical and domain skills, with rough proficiency level (beginner / proficient / expert).
- **Comp data (optional)** — any Levels.fyi, LinkedIn Salary, or Glassdoor data you've collected for your role and location.
- **Active applications (if job searching)** — company, role, date applied, current status, and recruiter contact for each.
>
> **Step 3 — Run your first skill**
> Once config.md is filled in and at least a few documents are in `00_current/`, try: *"career brief"*
>
> You don't need everything perfect to start — add what you have and the skills will tell you what's still missing.
>
> **Stop here.** Do not scaffold files, do not offer options, do not ask questions. Wait for the user to complete setup and re-run the skill.

## Skill Index

Skills live in `skills/<skill-name>/SKILL.md`. To run a skill, read its `SKILL.md` and follow the instructions inside.

**Apps (data connectors — fallback when no native MCP connector is available):**
- **`app-greenhouse.api`** — Tracks job application status, interview stages, offer details, and recruiter contacts from employer Greenhouse ATS candidate portals via Playwright.
- **`app-levels-fyi.portal`** — Scrapes compensation data by company, role, and level from Levels.fyi — the most accurate source for tech compensation benchmarking.
- **`app-linkedin.portal`** — Accesses LinkedIn for job market scanning, compensation research, professional network review, and recruiter message monitoring via Playwright with Chrome cookie session.

**Operations (user-facing routines):**
- **`op-review-brief`** — Single monthly entry point. Refreshes pay-stub data, pipeline freshness, recruiter touches, and document organization, then synthesizes market position, comp summary, skills-gap priorities, and 3-5 next actions into a dated brief.
- **`op-comp-review`** — Quarterly total comp benchmarking vs. market P25/P50/P75 for role, level, and metro.
- **`op-market-scan`** — Monthly job market scan: orchestrates `flow-scan-target-roles` and writes the market scan brief.
- **`op-weekly-market-pulse`** — Lightweight weekly scan: recruiter inbox sweep + tight-fit (fit ≥ 90, posted ≤ 7 days) role check + target-company posting-volume signal.
- **`op-network-review`** — Monthly professional network health check; calls `task-flag-stale-contact`.
- **`op-skills-gap-review`** — Quarterly skills gap analysis vs. recent market scan data; calls `flow-build-forward-skills-plan` annually.
- **`op-interview-prep`** — Per-interview packet: company snapshot, JD analysis, prepared questions, behavioral STAR bank pre-filled from achievements, comp prep.
- **`op-performance-review-prep`** — Pulls every achievement in the review period, drafts a competency-organized self-eval narrative, flags resume/LinkedIn refresh items.
- **`op-promotion-campaign`** — Active during a promotion cycle: visibility log, sponsor list, stretch projects, gap-vs-bar analysis, decision-timeline reminders.

**Flows (multi-step internals called by ops):**
- **`flow-build-comp-summary`** — Builds the total comp vs. market P25/P50/P75 comparison table.
- **`flow-build-skills-gap-summary`** — Reactive: compares current skills to today's target-role JDs.
- **`flow-build-forward-skills-plan`** — Forward-looking: projects 18-24 month skill demand from horizon-scan + frontier-company JDs and recommends 2-3 high-conviction bets.
- **`flow-review-pipeline`** — Audits active applications for staleness and stall signals.
- **`flow-scan-target-roles`** — Data-collection only: queries LinkedIn / Levels.fyi / Glassdoor and returns ranked qualifying postings + market statistics. Routing belongs to the calling op.
- **`flow-negotiation-prep`** — Moment-of-decision packet: BATNA, leverage, anchor/target/walk-away numbers, objection counters.

**Tasks (atomic operations called by ops / flows / on demand):**
- **`task-capture-achievement`** — Logs a dated STAR-format achievement; flags resume + LinkedIn refresh if either is >14 days stale.
- **`task-flag-stale-contact`** — Scans contacts for last_contact_date >90 days; flags with severity tier and suggested next action.
- **`task-parse-pay-stub`** — Extracts gross / net / withholdings / pre-tax / employer contributions from any payroll provider's stub; appends to log; flags anomalies.
- **`task-export-comp-to-wealth`** — Writes structured comp + YTD payload to wealth/benefits plugins so cross-agent feeds work without those plugins reading career internals.
- **`task-log-application`** — Records a job application (or pre-application watch) with comp, tech-stack match, contact, follow-up window.
- **`task-log-recruiter-touch`** — Light CRM row per recruiter touch with quality scoring and `keep_warm` follow-up cadence.
- **`task-draft-outreach-message`** — Drafts a personalized professional outreach for a specific contact and context.
- **`task-update-reference-list`** — Maintains references with vouch strength + last-consent date; flags stale or insufficient references before a search begins.
- **`task-snapshot-resume-linkedin`** — Versions resume + LinkedIn profile to `01_prior/snapshots/YYYY-MM-DD/` with section-level diff manifest.
- **`task-track-license-cert-renewal`** — Tracks licenses, certifications, and CEU credits; flags renewals at 90/60/30 days and CEU off-pace.
- **`task-flag-comp-gap`** — Writes a structured comp-gap flag to open-loops when current TC falls below market P50.
- **`task-update-open-loops`** — Single write point for `vault/career/open-loops.md`.
