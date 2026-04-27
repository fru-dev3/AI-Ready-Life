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
> Open `~/Documents/aireadylife/vault/tax/config.md` and fill in every field that applies to you. Leave a field blank rather than guessing — the skills will flag anything that's missing. Self-employment, rental, equity comp, and entity sections are optional; complete only what applies.
>
> **Step 2 — Gather your documents and add them to `00_current/`**
> Here's what this domain needs:
>
- **Prior year tax return** — your most recent federal and state return (PDF from your tax software or accountant). Used for safe-harbor calculations.
- **W-2s and 1099s** — from all income sources. Download from your employer portal, brokerage, freelance platforms, or banks.
- **HSA / 401k / IRA contribution statements** — total YTD contributions (from your custodian or W-2 Box 12).
- **Charitable donation receipts** — any letter or receipt for donations over $250.
- **Mortgage interest statement (Form 1098)** — from your lender if you own a home.
- **Quarterly estimated payment receipts** — if you make estimated payments, your confirmation numbers.
- **Optional (if applicable):** Schedule C records (self-employed), Schedule E records (rental property), K-1s (partnership / S-corp), equity-comp confirmations (RSU vest, ESPP, ISO).
>
> **Step 3 — Run your first skill**
> Once config.md is filled in and at least a few documents are in `00_current/`, try: *"tax deadline watch"*
>
> You don't need everything perfect to start — add what you have and the skills will tell you what's still missing.
>
> **Stop here.** Do not scaffold files, do not offer options, do not ask questions. Wait for the user to complete setup and re-run the skill.

## Skill Index

Skills live in `skills/<skill-name>/SKILL.md`. To run a skill, read its `SKILL.md` and follow the instructions inside.

**Apps (data connectors — fallback when no native MCP connector available):**
- `app-irs.portal` — IRS.gov account transcripts, payment history, notices, and Direct Pay via Playwright with ID.me authentication. Optional fallback.
- `app-turbotax.portal` — TurboTax Online prior-year returns, AGI, and filing status via Playwright. Optional.
- `app-quickbooks` — QuickBooks Online P&L, Balance Sheet, and transaction-level expenses via Playwright. Optional (self-employed / business users).

**Operations (user-facing routines):**
- `op-deadline-watch` — Monthly deadline monitor; flags all federal, state, and entity tax obligations due within 30 days.
- `op-quarterly-estimate` — Quarterly estimated tax calculation using safe-harbor and current-year actual methods.
- `op-deduction-review` — Monthly deduction capture and categorization with documentation check.
- `op-document-sync` — As-received tax document intake and completeness tracking (active Jan–Apr 15).
- `op-year-end-planning-sweep` — Annual Nov 1 sweep: retirement-max status, charitable bunching, FSA use-it-or-lose-it, RMDs, Roth conversion windows, itemize-vs-standard projection.
- `op-cpa-packet` — Compiles the complete tax-prep packet (W-2s, 1099s, 1098s, 1095s, K-1s, summaries) by January 31.
- `op-cpa-touchpoints` — Schedules and prepares Q3 projection, Q4 year-end planning, and post-filing strategy debrief with your CPA.
- `op-review-brief` — Monthly tax review brief: YTD liability, payments, next deadline, and prioritized action items.
- `op-entity-compliance` — *(advanced/optional)* Quarterly entity compliance check for active LLCs and S-corps.

**Flows (multi-step internals called by ops):**
- `flow-build-estimate` — Projects current quarter's estimated payment using safe-harbor (100%/110% prior year) and current-year actual methods.
- `flow-safe-harbor-calc` — Standalone safe-harbor target calculator (100% prior-year liability, 110% if AGI >$150k); used by `flow-build-estimate`.
- `flow-document-completeness` — Checks expected tax documents against files received in vault.
- `flow-review-deductions` — Scans transactions and receipts for deductible expenses, classifies, and computes YTD totals.
- `flow-equity-comp-tax-events` — *(advanced/optional)* RSU vest, ISO exercise (AMT), and ESPP qualifying-vs-disqualifying disposition tax modeling.
- `flow-tax-loss-harvesting-scan` — *(advanced/optional)* Scans taxable-account positions for >$1k unrealized losses and wash-sale-safe replacements.
- `flow-rental-property-summary` — *(advanced/optional)* Schedule E aggregator across rental properties: income, depreciation, passive-loss carryforward.

**Tasks (atomic operations called by flows / ops):**
- `task-extract-income-ytd` — Reads YTD income totals across all source types and returns a structured breakdown.
- `task-log-deductible-expense` — Records a deductible expense with category, IRS basis, and documentation reference.
- `task-track-charitable-giving` — Logs cash and non-cash donations year-round; flags receipt requirements at $250 / $500 / $5,000 thresholds.
- `task-flag-1099-issuer-pending` — Maintains a registry of expected 1099 issuers; flags missing 1099s after Feb 15.
- `task-track-retirement-contribution-limits` — Tracks YTD 401k / IRA / HSA / FSA contributions against current-year limits + catch-up.
- `task-track-home-office` — Records square footage, qualifying-use percentage, and direct/indirect expenses month by month.
- `task-track-state-residency` — *(advanced/optional)* Days-per-state tracker for multistate workers, snowbirds, recent movers.
- `task-update-open-loops` — Single write point for `open-loops.md`. Also handles approaching-deadline flag entries.
