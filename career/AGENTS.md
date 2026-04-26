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

- **`career-flow-build-comp-summary`** — Builds a total compensation comparison table showing your current TC broken down by component (base, bonus, equity, benefits) versus market P25/P50/P75 for your role, level, and location.
- **`career-flow-build-skills-gap-summary`** — Compares the current skills inventory (with proficiency levels and recency) to target role requirements aggregated from recent market scan data.
- **`career-flow-review-pipeline`** — Reviews the active application pipeline for staleness and stall signals.
- **`career-flow-scan-target-roles`** — Searches LinkedIn Jobs, Glassdoor, and Levels.fyi for open roles matching your configured target criteria.
- **`career-op-comp-review`** — Quarterly total comp benchmarking vs.
- **`career-op-market-scan`** — Monthly job market scan searching for open roles matching your target criteria: role titles, company tier, tech stack, compensation minimums, and remote policy.
- **`career-op-monthly-sync`** — Full career data sync on the 1st of each month.
- **`career-op-network-review`** — Monthly professional network health check.
- **`career-op-review-brief`** — Monthly career review brief compiling market position, application pipeline status, comp vs.
- **`career-op-skills-gap-review`** — Quarterly skills gap analysis comparing your current skills inventory to target role requirements scraped from the monthly market scan.
- **`career-task-draft-outreach-message`** — Drafts a personalized professional outreach message for a specific contact, tailored to the context type (warm reconnect, referral request, networking maintenance, or intro request).
- **`career-task-flag-comp-gap`** — Writes a structured compensation gap flag to vault/career/open-loops.md when current TC falls below market P50 for role, level, and metro.
- **`career-task-log-application`** — Records a new job application (or pre-application watch item) to vault/career/00_current/ with full context: company, role, date, source, contact, comp range, tech stack, work arrangement, fit notes, and default follow-up window.
- **`career-task-update-open-loops`** — Maintains vault/career/open-loops.md as the canonical list of outstanding career action items.
- **`greenhouse`** — Tracks job application status, interview stages, offer details, and recruiter contacts from employer Greenhouse ATS candidate portals via Playwright.
- **`levels-fyi`** — Scrapes compensation data by company, role, and level from Levels.fyi — the most accurate source for tech compensation benchmarking.
- **`linkedin`** — Accesses LinkedIn for job market scanning, compensation research, professional network review, and recruiter message monitoring via Playwright with Chrome cookie session.
