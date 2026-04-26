<!-- Codex / non-Claude agents: this file mirrors CLAUDE.md so any AGENTS.md-aware agent (Codex CLI, etc.) reads the same instructions. Both files stay in sync. -->

# AI Ready Life: Real Estate Plugin

## Vault Location

| OS | Vault path |
|----|------------|
| **Mac** | `~/Documents/aireadylife/vault/real-estate/` |
| **Windows** | `%USERPROFILE%\Documents\aireadylife\vault\real-estate\` |

Determine the user's OS from context (file paths they share, or ask if unclear). Use the correct path for their OS. Never use relative paths.

## First Time Setup

If `~/Documents/aireadylife/vault/real-estate/` does not exist or is empty:

1. Purchase the **AI Ready Life: Real Estate Vault** at [frudev.gumroad.com/l/aireadylife-real-estate](https://frudev.gumroad.com/l/aireadylife-real-estate)
2. Unzip the download
3. Move the `real-estate/` folder to `~/Documents/aireadylife/vault/`
4. Open `~/Documents/aireadylife/vault/real-estate/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

## Vault Structure

```
~/Documents/aireadylife/vault/real-estate/
├── config.md          — your profile and settings
├── open-loops.md      — active flags and open items
├── 00_current/        — active documents and current state
├── 01_prior/          — prior period records
└── 02_briefs/         — generated briefs and reports
```

## Skills

Skills are located under `real-estate/skills/` — each skill has its own folder containing a `SKILL.md` file.

## Vault Access

**Mac:** If a file read fails with a permission error, Claude Desktop needs filesystem access. Tell the user:
> *Go to **System Settings → Privacy & Security → Full Disk Access**, add **Claude**, then restart Claude Desktop.*

**Windows:** Claude Desktop runs unrestricted — no permission grant needed.

Do not proceed with the skill until access is confirmed (Mac) or reassure the user that no action is needed (Windows).

## First Run

Before running **any skill or flow** in this domain — including flows called by other skills — read `~/Documents/aireadylife/vault/real-estate/config.md` and check whether the key fields have been filled in (non-blank values after the `:`).

**Rules (follow exactly, no improvisation):**

1. **Vault folder is missing entirely** → output only: *"Your real-estate vault isn't installed. Download it at [frudev.gumroad.com/l/aireadylife-real-estate](https://frudev.gumroad.com/l/aireadylife-real-estate), unzip, and place the `real-estate/` folder at `~/Documents/aireadylife/vault/`."* Stop.

2. **Config fields are blank** (empty after `:`) → output the First-Run Message below verbatim. Stop. Do **not** scaffold files, offer alternatives, or ask questions.

3. **Config is filled in** → proceed with the requested skill normally.

### First-Run Message

> **Welcome to AI Ready Life: Real Estate!**
>
> Your vault is installed at:
> - **Mac:** `~/Documents/aireadylife/vault/real-estate/`
> - **Windows:** `%USERPROFILE%\Documents\aireadylife\vault\real-estate\` Before skills can run, your config and documents need to be in place.
>
> **Step 1 — Complete your config**
> Open `~/Documents/aireadylife/vault/real-estate/config.md` and fill in every field. Leave a field blank rather than guessing — the skills will flag anything that's missing.
>
> **Step 2 — Gather your documents and add them to `00_current/`**
> Here's what this domain needs:
>
- **Target area** — city, zip codes, or neighborhoods you're looking in.
- **Budget and down payment** — maximum purchase price and available down payment amount.
- **Pre-approval letter (if available)** — lender, pre-approved amount, and expiration date.
- **Wishlist criteria** — must-haves and nice-to-haves: bedrooms, bathrooms, lot size, school district, commute limits.
- **Active listings (if tracking)** — addresses or Zillow/Redfin links for any properties you're already watching.
- **Current housing cost** — monthly rent or mortgage payment, so buy vs. rent analysis has a baseline.
>
> **Step 3 — Run your first skill**
> Once config.md is filled in and at least a few documents are in `00_current/`, try: *"market scan"*
>
> You don't need everything perfect to start — add what you have and the skills will tell you what's still missing.
>
> **Stop here.** Do not scaffold files, do not offer options, do not ask questions. Wait for the user to complete setup and re-run the skill.

## Skill Index

Skills live in `skills/<skill-name>/SKILL.md`. To run a skill, read its `SKILL.md` and follow the instructions inside.

- **`real-estate-flow-build-affordability-analysis`** — Calculates home affordability based on income, debts, down payment savings, and current mortgage rates using 28/36 DTI rules.
- **`real-estate-flow-scan-market-listings`** — Searches configured target neighborhoods for active listings matching criteria and summarizes market stats including median price, active inventory, average days on market, price-to-rent ratio, and months of supply.
- **`real-estate-op-affordability-review`** — On-demand affordability analysis that calculates max purchase price, monthly PITI payment, required down payment, PMI exposure, and break-even horizon for buying vs.
- **`real-estate-op-market-scan`** — Monthly market scan for target neighborhoods tracking median price, inventory, days on market, price/sqft, months of supply, and price-to-rent ratio.
- **`real-estate-op-monthly-sync`** — Full real estate data sync on the 1st of each month.
- **`real-estate-op-review-brief`** — Monthly real estate review brief.
- **`real-estate-task-log-listing`** — Saves a listing of interest to vault/real-estate/00_current/ with address, price, beds/baths, sqft, price/sqft, days on market, Zestimate, list-to-Zestimate ratio, user notes, Zillow/Redfin link, and status.
- **`real-estate-task-run-buy-vs-rent`** — Runs a time-value-adjusted buy vs.
- **`real-estate-task-update-open-loops`** — Writes all real-estate flags (market shifts, affordability changes, buy-window signals, interesting listings) to ~/Documents/aireadylife/vault/real-estate/open-loops.md and resolves items that are no longer relevant.
- **`redfin`** — Pulls active listings, comparable sales, market statistics, and property estimates from Redfin via web research.
- **`zillow`** — Fetches Zestimate property valuations, active listings, rental estimates, and market trend data from Zillow via web research.
