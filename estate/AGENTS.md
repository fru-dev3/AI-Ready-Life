<!-- Codex / non-Claude agents: this file mirrors CLAUDE.md so any AGENTS.md-aware agent (Codex CLI, etc.) reads the same instructions. Both files stay in sync. -->

# AI Ready Life: Estate Plugin

## Vault Location

| OS | Vault path |
|----|------------|
| **Mac** | `~/Documents/aireadylife/vault/estate/` |
| **Windows** | `%USERPROFILE%\Documents\aireadylife\vault\estate\` |

Determine the user's OS from context (file paths they share, or ask if unclear). Use the correct path for their OS. Never use relative paths.

## First Time Setup

If `~/Documents/aireadylife/vault/estate/` does not exist or is empty:

1. Purchase the **AI Ready Life: Estate Vault** at [frudev.gumroad.com/l/aireadylife-estate](https://frudev.gumroad.com/l/aireadylife-estate)
2. Unzip the download
3. Move the `estate/` folder to `~/Documents/aireadylife/vault/`
4. Open `~/Documents/aireadylife/vault/estate/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

## Vault Structure

```
~/Documents/aireadylife/vault/estate/
├── config.md          — your profile and settings
├── open-loops.md      — active flags and open items
├── 00_current/        — active documents and current state
├── 01_prior/          — prior period records
└── 02_briefs/         — generated briefs and reports
```

## Skills

Skills are located under `estate/skills/` — each skill has its own folder containing a `SKILL.md` file.

## Vault Access

**Mac:** If a file read fails with a permission error, Claude Desktop needs filesystem access. Tell the user:
> *Go to **System Settings → Privacy & Security → Full Disk Access**, add **Claude**, then restart Claude Desktop.*

**Windows:** Claude Desktop runs unrestricted — no permission grant needed.

Do not proceed with the skill until access is confirmed (Mac) or reassure the user that no action is needed (Windows).

## First Run

Before running **any skill or flow** in this domain — including flows called by other skills — read `~/Documents/aireadylife/vault/estate/config.md` and check whether the key fields have been filled in (non-blank values after the `:`).

**Rules (follow exactly, no improvisation):**

1. **Vault folder is missing entirely** → output only: *"Your estate vault isn't installed. Download it at [frudev.gumroad.com/l/aireadylife-estate](https://frudev.gumroad.com/l/aireadylife-estate), unzip, and place the `estate/` folder at `~/Documents/aireadylife/vault/`."* Stop.

2. **Config fields are blank** (empty after `:`) → output the First-Run Message below verbatim. Stop. Do **not** scaffold files, offer alternatives, or ask questions.

3. **Config is filled in** → proceed with the requested skill normally.

### First-Run Message

> **Welcome to AI Ready Life: Estate!**
>
> Your vault is installed at:
> - **Mac:** `~/Documents/aireadylife/vault/estate/`
> - **Windows:** `%USERPROFILE%\Documents\aireadylife\vault\estate\` Before skills can run, your config and documents need to be in place.
>
> **Step 1 — Complete your config**
> Open `~/Documents/aireadylife/vault/estate/config.md` and fill in every field. Leave a field blank rather than guessing — the skills will flag anything that's missing.
>
> **Step 2 — Gather your documents and add them to `00_current/`**
> Here's what this domain needs:
>
- **Lease agreements** — current lease for each rental property. Tenant name, monthly rent, lease start and end dates.
- **Mortgage statements** — outstanding balance, interest rate, monthly payment, and lender for each property loan.
- **Income and expense records** — rent collected and operating expenses (repairs, insurance, property tax, management fees) YTD.
- **Maintenance log** — open maintenance requests with property, issue, date opened, and current status.
- **Property details** — address, purchase price, purchase date, and estimated current value for each property.
>
> **Step 3 — Run your first skill**
> Once config.md is filled in and at least a few documents are in `00_current/`, try: *"estate portfolio review"*
>
> You don't need everything perfect to start — add what you have and the skills will tell you what's still missing.
>
> **Stop here.** Do not scaffold files, do not offer options, do not ask questions. Wait for the user to complete setup and re-run the skill.

## Skill Index

Skills live in `skills/<skill-name>/SKILL.md`. To run a skill, read its `SKILL.md` and follow the instructions inside.

- **`appfolio`** — Downloads owner statements, lease documents, maintenance requests, and tenant ledgers from an AppFolio owner portal via Playwright.
- **`estate-flow-analyze-cash-flow`** — Detailed cash flow analysis per rental property: gross rent, vacancy loss, all operating expenses, NOI, debt service, net cash flow, cash-on-cash return, and expense ratio.
- **`estate-flow-build-portfolio-summary`** — Generates a complete portfolio snapshot: all properties with address, purchase price, current value, equity, outstanding mortgage balance, monthly cash flow, cap rate, and cash-on-cash return.
- **`estate-flow-check-maintenance-schedule`** — Reviews all open maintenance items and upcoming seasonal tasks across all rental properties against the current date.
- **`estate-op-cash-flow-review`** — Monthly cash flow review run after rent collection.
- **`estate-op-maintenance-review`** — Monthly maintenance review across all rental properties.
- **`estate-op-portfolio-review`** — Quarterly portfolio performance review: cap rates, cash-on-cash return, equity positions, depreciation schedule, hold vs.
- **`estate-op-review-brief`** — Monthly portfolio review brief.
- **`estate-op-tenant-review`** — Monthly tenant review: lease expiration countdown, rent payment history, security deposit tracking, vacancy planning, and renewal decision workflow.
- **`estate-task-flag-maintenance-item`** — Writes a maintenance flag to open-loops.md and creates a detailed maintenance item record in vault/estate/00_current/.
- **`estate-task-log-expense`** — Records a rental property expense to vault/estate/00_current/ with property address, date, vendor, IRS-standard expense category, amount, notes, and receipt reference.
- **`estate-task-update-open-loops`** — Writes estate flags (overdue maintenance, lease expirations, cash flow anomalies, vacancy risks, property tax deadlines, CapEx approaching) to open-loops.md and resolves completed items.
- **`stessa`** — Accesses rental income, expense tracking, cash flow reports, and property valuations from Stessa via Playwright.
- **`zillow`** — Fetches Zestimate property valuations, rental estimates, and market trend data from Zillow via web research.
