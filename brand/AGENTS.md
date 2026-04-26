<!-- Codex / non-Claude agents: this file mirrors CLAUDE.md so any AGENTS.md-aware agent (Codex CLI, etc.) reads the same instructions. Both files stay in sync. -->

# AI Ready Life: Brand Plugin

## Vault Location

| OS | Vault path |
|----|------------|
| **Mac** | `~/Documents/aireadylife/vault/brand/` |
| **Windows** | `%USERPROFILE%\Documents\aireadylife\vault\brand\` |

Determine the user's OS from context (file paths they share, or ask if unclear). Use the correct path for their OS. Never use relative paths.

## First Time Setup

If `~/Documents/aireadylife/vault/brand/` does not exist or is empty:

1. Purchase the **AI Ready Life: Brand Vault** at [frudev.gumroad.com/l/aireadylife-brand](https://frudev.gumroad.com/l/aireadylife-brand)
2. Unzip the download
3. Move the `brand/` folder to `~/Documents/aireadylife/vault/`
4. Open `~/Documents/aireadylife/vault/brand/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

## Vault Structure

```
~/Documents/aireadylife/vault/brand/
├── config.md          — your profile and settings
├── open-loops.md      — active flags and open items
├── 00_current/        — active documents and current state
├── 01_prior/          — prior period records
└── 02_briefs/         — generated briefs and reports
```

## Skills

Skills are located under `brand/skills/` — each skill has its own folder containing a `SKILL.md` file.

## Vault Access

**Mac:** If a file read fails with a permission error, Claude Desktop needs filesystem access. Tell the user:
> *Go to **System Settings → Privacy & Security → Full Disk Access**, add **Claude**, then restart Claude Desktop.*

**Windows:** Claude Desktop runs unrestricted — no permission grant needed.

Do not proceed with the skill until access is confirmed (Mac) or reassure the user that no action is needed (Windows).

## First Run

Before running **any skill or flow** in this domain — including flows called by other skills — read `~/Documents/aireadylife/vault/brand/config.md` and check whether the key fields have been filled in (non-blank values after the `:`).

**Rules (follow exactly, no improvisation):**

1. **Vault folder is missing entirely** → output only: *"Your brand vault isn't installed. Download it at [frudev.gumroad.com/l/aireadylife-brand](https://frudev.gumroad.com/l/aireadylife-brand), unzip, and place the `brand/` folder at `~/Documents/aireadylife/vault/`."* Stop.

2. **Config fields are blank** (empty after `:`) → output the First-Run Message below verbatim. Stop. Do **not** scaffold files, offer alternatives, or ask questions.

3. **Config is filled in** → proceed with the requested skill normally.

### First-Run Message

> **Welcome to AI Ready Life: Brand!**
>
> Your vault is installed at:
> - **Mac:** `~/Documents/aireadylife/vault/brand/`
> - **Windows:** `%USERPROFILE%\Documents\aireadylife\vault\brand\` Before skills can run, your config and documents need to be in place.
>
> **Step 1 — Complete your config**
> Open `~/Documents/aireadylife/vault/brand/config.md` and fill in every field. Leave a field blank rather than guessing — the skills will flag anything that's missing.
>
> **Step 2 — Gather your documents and add them to `00_current/`**
> Here's what this domain needs:
>
- **Platform handles** — your username on LinkedIn, Twitter/X, Instagram, TikTok, YouTube, or wherever you publish. Include the full URL.
- **Follower counts** — current counts per platform. A screenshot or manual note is fine.
- **Recent analytics export (optional)** — LinkedIn Creator Analytics, Twitter Analytics, or YouTube Studio CSV for the past 90 days.
- **Bio copy** — your current bio as it appears on your primary platform. Used for consistency audits.
- **Content cadence goal** — how often you intend to publish per platform (e.g., LinkedIn: 3x/week, newsletter: 2x/month).
>
> **Step 3 — Run your first skill**
> Once config.md is filled in and at least a few documents are in `00_current/`, try: *"brand brief"*
>
> You don't need everything perfect to start — add what you have and the skills will tell you what's still missing.
>
> **Stop here.** Do not scaffold files, do not offer options, do not ask questions. Wait for the user to complete setup and re-run the skill.

## Skill Index

Skills live in `skills/<skill-name>/SKILL.md`. To run a skill, read its `SKILL.md` and follow the instructions inside.

- **`brand-flow-analyze-mentions`** — Scans recent brand mentions for sentiment, source type, and context.
- **`brand-flow-build-analytics-summary`** — Compiles cross-platform analytics: followers, growth, engagement rate, and impressions per platform with month-over-month deltas and top-performing content identified.
- **`brand-flow-check-profile-consistency`** — Compares brand profile elements (bio, headshot, handle, URL) across all platforms to the master brand profile and flags any discrepancies.
- **`brand-op-content-review`** — Monthly content output review that tracks publishing cadence vs goal, cross-platform performance, and top-performing content.
- **`brand-op-monthly-synthesis`** — Monthly brand synthesis.
- **`brand-op-profile-audit`** — Quarterly audit of brand profile consistency across platforms (LinkedIn, Twitter/X, GitHub, YouTube, personal site).
- **`brand-op-review-brief`** — Monthly brand brief.
- **`brand-task-flag-profile-inconsistency`** — Writes a flag to vault/brand/open-loops.md when a platform profile field diverges from the master brand profile.
- **`brand-task-log-mention`** — Records a brand mention to vault/brand/00_current/ with platform, author, date, sentiment, content summary, and link.
- **`brand-task-update-open-loops`** — Writes all brand flags (profile inconsistencies, content gaps, unanswered mentions, publishing cadence misses) to vault/brand/open-loops.md.
- **`google-analytics`** — Queries GA4 website analytics via the Google Analytics Data API for traffic, engagement, and audience data.
- **`linkedin`** — Reads LinkedIn profile and post analytics for brand consistency auditing and audience engagement review via Playwright.
- **`twitter`** — Pulls follower count, impressions, and mention data from Twitter/X via Playwright.
