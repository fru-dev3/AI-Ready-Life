<!-- Codex / non-Claude agents: this file mirrors CLAUDE.md so any AGENTS.md-aware agent (Codex CLI, etc.) reads the same instructions. Both files stay in sync. -->

# AI Ready Life: Content Plugin

## Vault Location

| OS | Vault path |
|----|------------|
| **Mac** | `~/Documents/aireadylife/vault/content/` |
| **Windows** | `%USERPROFILE%\Documents\aireadylife\vault\content\` |

Determine the user's OS from context (file paths they share, or ask if unclear). Use the correct path for their OS. Never use relative paths.

## First Time Setup

If `~/Documents/aireadylife/vault/content/` does not exist or is empty:

1. Purchase the **AI Ready Life: Content Vault** at [frudev.gumroad.com/l/aireadylife-content](https://frudev.gumroad.com/l/aireadylife-content)
2. Unzip the download
3. Move the `content/` folder to `~/Documents/aireadylife/vault/`
4. Open `~/Documents/aireadylife/vault/content/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

## Vault Structure

```
~/Documents/aireadylife/vault/content/
├── config.md          — your profile and settings
├── open-loops.md      — active flags and open items
├── 00_current/        — active documents and current state
├── 01_prior/          — prior period records
└── 02_briefs/         — generated briefs and reports
```

## Skills

Skills are located under `content/skills/` — each skill has its own folder containing a `SKILL.md` file.

## Vault Access

**Mac:** If a file read fails with a permission error, Claude Desktop needs filesystem access. Tell the user:
> *Go to **System Settings → Privacy & Security → Full Disk Access**, add **Claude**, then restart Claude Desktop.*

**Windows:** Claude Desktop runs unrestricted — no permission grant needed.

Do not proceed with the skill until access is confirmed (Mac) or reassure the user that no action is needed (Windows).

## First Run

Before running **any skill or flow** in this domain — including flows called by other skills — read `~/Documents/aireadylife/vault/content/config.md` and check whether the key fields have been filled in (non-blank values after the `:`).

**Rules (follow exactly, no improvisation):**

1. **Vault folder is missing entirely** → output only: *"Your content vault isn't installed. Download it at [frudev.gumroad.com/l/aireadylife-content](https://frudev.gumroad.com/l/aireadylife-content), unzip, and place the `content/` folder at `~/Documents/aireadylife/vault/`."* Stop.

2. **Config fields are blank** (empty after `:`) → output the First-Run Message below verbatim. Stop. Do **not** scaffold files, offer alternatives, or ask questions.

3. **Config is filled in** → proceed with the requested skill normally.

### First-Run Message

> **Welcome to AI Ready Life: Content!**
>
> Your vault is installed at:
> - **Mac:** `~/Documents/aireadylife/vault/content/`
> - **Windows:** `%USERPROFILE%\Documents\aireadylife\vault\content\` Before skills can run, your config and documents need to be in place.
>
> **Step 1 — Complete your config**
> Open `~/Documents/aireadylife/vault/content/config.md` and fill in every field. Leave a field blank rather than guessing — the skills will flag anything that's missing.
>
> **Step 2 — Gather your documents and add them to `00_current/`**
> Here's what this domain needs:
>
- **Channel or publication list** — for each platform: name, URL, current subscriber/follower count, and publishing cadence target.
- **Revenue breakdown** — earnings by source (AdSense, sponsorships, affiliate, digital products, newsletter) for the current year.
- **Analytics export** — YouTube Studio CSV, Beehiiv analytics, or Google Analytics for the past 90 days.
- **Content pipeline** — list of posts, videos, or articles in progress, scheduled, or recently published.
- **SEO targets (optional)** — keyword targets or topics you're trying to rank for.
>
> **Step 3 — Run your first skill**
> Once config.md is filled in and at least a few documents are in `00_current/`, try: *"content brief"*
>
> You don't need everything perfect to start — add what you have and the skills will tell you what's still missing.
>
> **Stop here.** Do not scaffold files, do not offer options, do not ask questions. Wait for the user to complete setup and re-run the skill.

## Skill Index

Skills live in `skills/<skill-name>/SKILL.md`. To run a skill, read its `SKILL.md` and follow the instructions inside.

- **`beehiiv`** — Queries newsletter subscriber and revenue metrics from Beehiiv via their API.
- **`content-flow-analyze-channel-performance`** — Builds a cross-channel performance dashboard with 30-day totals per platform, MoM comparisons, and flags for channels underperforming vs.
- **`content-flow-build-revenue-summary`** — Aggregates revenue from all content channels into a single monthly summary with MoM comparison, identifying the top channel and flagging declines >20%.
- **`content-flow-build-seo-summary`** — Summarizes keyword rankings, search impressions, and top content performance; identifies quick-win keywords (positions 4-15), ranking drops, and top 3 optimization opportunities.
- **`content-op-channel-review`** — Monthly cross-channel performance review; subscriber growth, video views, newsletter opens, and product sales all in one brief.
- **`content-op-revenue-review`** — Monthly revenue review across all content channels: YouTube AdSense, newsletter sponsorships and paid tiers, and digital product sales (Gumroad).
- **`content-op-review-brief`** — Monthly content review brief.
- **`content-op-seo-review`** — Monthly SEO health check; reviews keyword rankings, search impressions, top-performing content, and quick-win optimization opportunities.
- **`content-op-weekly-review`** — Weekly content performance review.
- **`content-task-flag-seo-gap`** — Writes a flag to vault/content/open-loops.md when a content piece drops in ranking or a high-value keyword has no content coverage.
- **`content-task-log-revenue`** — Records a revenue event to vault/content/ with: platform, amount, date, type (AdSense, sponsorship, product sale, subscription).
- **`content-task-update-open-loops`** — Writes all content flags (revenue dips, SEO gaps, publishing misses, channel anomalies) to vault/content/open-loops.md and resolves completed items.
- **`gumroad`** — Queries product sales and revenue data from Gumroad via their API.
- **`youtube`** — Queries YouTube channel analytics (views, watch time, subscribers, revenue) via the YouTube Data API v3.
