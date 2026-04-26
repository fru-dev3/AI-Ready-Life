<!-- Codex / non-Claude agents: this file mirrors CLAUDE.md so any AGENTS.md-aware agent (Codex CLI, etc.) reads the same instructions. Both files stay in sync. -->

# AI Ready Life: Tax Plugin

## Vault Location

| OS | Vault path |
|----|------------|
| **Mac** | `~/Documents/aireadylife/vault/tax/` |
| **Windows** | `%USERPROFILE%\Documents\aireadylife\vault\tax\` |

Determine the user's OS from context (file paths they share, or ask if unclear). Use the correct path for their OS. Never use relative paths.

## First Time Setup

If `~/Documents/aireadylife/vault/tax/` does not exist or is empty:

1. Purchase the **AI Ready Life: Tax Vault** at [frudev.gumroad.com/l/aireadylife-tax](https://frudev.gumroad.com/l/aireadylife-tax)
2. Unzip the download
3. Move the `tax/` folder to `~/Documents/aireadylife/vault/`
4. Open `~/Documents/aireadylife/vault/tax/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

## Vault Structure

```
~/Documents/aireadylife/vault/tax/
├── config.md          — your profile and settings
├── open-loops.md      — active flags and open items
├── 00_current/        — active documents and current state
├── 01_prior/          — prior period records
└── 02_briefs/         — generated briefs and reports
```

## Skills

Skills are located under `tax/skills/` — each skill has its own folder containing a `SKILL.md` file.

## Vault Access

**Mac:** If a file read fails with a permission error, Claude Desktop needs filesystem access. Tell the user:
> *Go to **System Settings → Privacy & Security → Full Disk Access**, add **Claude**, then restart Claude Desktop.*

**Windows:** Claude Desktop runs unrestricted — no permission grant needed.

Do not proceed with the skill until access is confirmed (Mac) or reassure the user that no action is needed (Windows).

## First Run

Before running **any skill or flow** in this domain — including flows called by other skills — read `~/Documents/aireadylife/vault/tax/config.md` and check whether the key fields have been filled in (non-blank values after the `:`).

**Rules (follow exactly, no improvisation):**

1. **Vault folder is missing entirely** → output only: *"Your tax vault isn't installed. Download it at [frudev.gumroad.com/l/aireadylife-tax](https://frudev.gumroad.com/l/aireadylife-tax), unzip, and place the `tax/` folder at `~/Documents/aireadylife/vault/`."* Stop.

2. **Config fields are blank** (empty after `:`) → output the First-Run Message below verbatim. Stop. Do **not** scaffold files, offer alternatives, or ask questions.

3. **Config is filled in** → proceed with the requested skill normally.

### First-Run Message

> **Welcome to AI Ready Life: Tax!**
>
> Your vault is installed at:
> - **Mac:** `~/Documents/aireadylife/vault/tax/`
> - **Windows:** `%USERPROFILE%\Documents\aireadylife\vault\tax\` Before skills can run, your config and documents need to be in place.
>
> **Step 1 — Complete your config**
> Open `~/Documents/aireadylife/vault/tax/config.md` and fill in every field. Leave a field blank rather than guessing — the skills will flag anything that's missing.
>
> **Step 2 — Gather your documents and add them to `00_current/`**
> Here's what this domain needs:
>
- **Prior year tax return** — your most recent federal and state return (PDF from your tax software or accountant).
- **W-2 or 1099s** — from all income sources. Download from your employer portal, brokerage, or freelance platforms.
- **HSA contribution statement** — total contributions for the year (from your HSA custodian or W-2 Box 12 code W).
- **Charitable donation receipts** — any letter or receipt for donations over $250.
- **Business expense records** — if self-employed or a freelancer, receipts or summaries by category.
- **Mortgage interest statement (Form 1098)** — from your lender if you own a home.
- **Quarterly estimated payment receipts** — if you pay estimated taxes, your payment confirmations.
>
> **Step 3 — Run your first skill**
> Once config.md is filled in and at least a few documents are in `00_current/`, try: *"tax deadline watch"*
>
> You don't need everything perfect to start — add what you have and the skills will tell you what's still missing.
>
> **Stop here.** Do not scaffold files, do not offer options, do not ask questions. Wait for the user to complete setup and re-run the skill.

## Skill Index

Skills live in `skills/<skill-name>/SKILL.md`. To run a skill, read its `SKILL.md` and follow the instructions inside.

- **`irs`** — Accesses IRS.gov for account transcripts (payments applied, balance due, prior year tax summary), IRS Direct Pay for estimated tax payments (1040-ES), and notice/letter downloads via Playwright with ID.me authentication.
- **`quickbooks`** — Pulls Profit & Loss reports, Balance Sheet, and transaction-level expense data from QuickBooks Online via Playwright with Intuit account authentication.
- **`tax-flow-build-deadline-list`** — Builds a prioritized list of all tax deadlines falling within the next 90 days, sorted by days remaining.
- **`tax-flow-build-estimate`** — Projects the current quarter's estimated federal tax payment by aggregating YTD income across all sources (W-2 wages, 1099-NEC, rental, capital gains, dividends, business income), subtracting YTD withholding and prior estimated payments, and running both the safe harbor method (110% of prior year liability if AGI >$150k) and the actual current-year liability method.
- **`tax-flow-document-completeness`** — Checks the expected tax document checklist for the current tax year against files actually received in vault/tax/00_current/ and flags anything expected but not yet received.
- **`tax-flow-review-deductions`** — Scans transaction records and vault documents in vault/tax/00_current/ for deductible expenses, classifies each against IRS deduction categories (home office simplified or actual method, business expenses, charitable contributions, medical expenses >7.5% AGI, vehicle business use at 70 cents/mile for 2025), verifies documentation reference exists for each item, computes YTD totals per category, and flags categories running more than 20% behind prior year same-period pace.
- **`tax-op-deadline-watch`** — Monthly tax deadline monitor.
- **`tax-op-deduction-review`** — Monthly deduction review.
- **`tax-op-document-sync`** — Tax document intake op, active January through April 15.
- **`tax-op-entity-compliance`** — Quarterly entity compliance check for all active LLCs and S-corps.
- **`tax-op-quarterly-estimate`** — Calculates the current quarter's estimated federal tax payment.
- **`tax-op-review-brief`** — Monthly tax review brief.
- **`tax-task-extract-income-ytd`** — Reads YTD income totals from vault/tax/ across all income source types and returns a structured breakdown for use by estimated tax flows.
- **`tax-task-flag-approaching-deadline`** — Writes a deadline alert to vault/tax/open-loops.md when a tax deadline is within 30 days.
- **`tax-task-log-deductible-expense`** — Records a deductible expense to vault/tax/00_current/ with all metadata required to support the deduction at filing: date, vendor/payee, amount, deduction category (home office, vehicle/mileage, business expense, charitable, medical), IRS basis for deductibility, supporting document reference, business purpose note (for meals/travel), and tax year.
- **`tax-task-update-open-loops`** — The single write point for vault/tax/open-loops.md.
- **`turbotax`** — Accesses TurboTax Online for prior year return downloads (PDF), current year filing status, imported W-2 and 1099 data summary, estimated refund or amount owed, and key return metrics (AGI, effective tax rate, total deductions).
