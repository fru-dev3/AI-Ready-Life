<!-- Codex / non-Claude agents: this file mirrors CLAUDE.md so any AGENTS.md-aware agent (Codex CLI, etc.) reads the same instructions. Both files stay in sync. -->

# AI Ready Life: Wealth Plugin

## Vault Location

| OS | Vault path |
|----|------------|
| **Mac** | `~/Documents/aireadylife/vault/wealth/` |
| **Windows** | `%USERPROFILE%\Documents\aireadylife\vault\wealth\` |

Determine the user's OS from context (file paths they share, or ask if unclear). Use the correct path for their OS. Never use relative paths.

## First Time Setup

If `~/Documents/aireadylife/vault/wealth/` does not exist or is empty:

1. Purchase the **AI Ready Life: Wealth Vault** at [frudev.gumroad.com/l/aireadylife-wealth](https://frudev.gumroad.com/l/aireadylife-wealth)
2. Unzip the download
3. Move the `wealth/` folder to `~/Documents/aireadylife/vault/`
4. Open `~/Documents/aireadylife/vault/wealth/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

## Vault Structure

```
~/Documents/aireadylife/vault/wealth/
├── config.md          — your profile and settings
├── open-loops.md      — active flags and open items
├── 00_current/        — active documents and current state
├── 01_prior/          — prior period records
└── 02_briefs/         — generated briefs and reports
```

## Skills

Skills are located under `wealth/skills/` — each skill has its own folder containing a `SKILL.md` file.

## Vault Access

**Mac:** If a file read fails with a permission error, Claude Desktop needs filesystem access. Tell the user:
> *Go to **System Settings → Privacy & Security → Full Disk Access**, add **Claude**, then restart Claude Desktop.*

**Windows:** Claude Desktop runs unrestricted — no permission grant needed.

Do not proceed with the skill until access is confirmed (Mac) or reassure the user that no action is needed (Windows).

## First Run

Before running **any skill or flow** in this domain — including flows called by other skills — read `~/Documents/aireadylife/vault/wealth/config.md` and check whether the key fields have been filled in (non-blank values after the `:`).

**Rules (follow exactly, no improvisation):**

1. **Vault folder is missing entirely** → output only: *"Your wealth vault isn't installed. Download it at [frudev.gumroad.com/l/aireadylife-wealth](https://frudev.gumroad.com/l/aireadylife-wealth), unzip, and place the `wealth/` folder at `~/Documents/aireadylife/vault/`."* Stop.

2. **Config fields are blank** (empty after `:`) → output the First-Run Message below verbatim. Stop. Do **not** scaffold files, offer alternatives, or ask questions.

3. **Config is filled in** → proceed with the requested skill normally.

### First-Run Message

> **Welcome to AI Ready Life: Wealth!**
>
> Your vault is installed at:
> - **Mac:** `~/Documents/aireadylife/vault/wealth/`
> - **Windows:** `%USERPROFILE%\Documents\aireadylife\vault\wealth\` Before skills can run, your config and documents need to be in place.
>
> **Step 1 — Complete your config**
> Open `~/Documents/aireadylife/vault/wealth/config.md` and fill in every field. Leave a field blank rather than guessing — the skills will flag anything that's missing.
>
> **Step 2 — Gather your documents and add them to `00_current/`**
> Here's what this domain needs:
>
- **Bank statements** — checking, savings, and high-yield savings accounts. Most recent month. Institution name, account last 4, and current balance.
- **Investment statements** — 401k, Roth IRA, Traditional IRA, brokerage. Most recent. Balance and account type for each.
- **Debt statements** — mortgage, auto loan, student loans, and any credit cards you track. Outstanding balance and interest rate for each.
- **Pay stub** — most recent, to confirm gross income, net pay, and any benefit deductions.
- **Real estate info** — estimated market value and outstanding mortgage balance for any property you own.
>
> **Step 3 — Run your first skill**
> Once config.md is filled in and at least a few documents are in `00_current/`, try: *"net worth review"*
>
> You don't need everything perfect to start — add what you have and the skills will tell you what's still missing.
>
> **Stop here.** Do not scaffold files, do not offer options, do not ask questions. Wait for the user to complete setup and re-run the skill.

## Skill Index

Skills live in `skills/<skill-name>/SKILL.md`. To run a skill, read its `SKILL.md` and follow the instructions inside.

- **`fidelity`** — Accesses brokerage and retirement account data from Fidelity Investments via Playwright with Chrome cookie authentication.
- **`m1-finance`** — Accesses automated investment portfolio data from M1 Finance via Playwright with Chrome cookie authentication.
- **`monarch-money`** — Pulls transaction history, spending by category, budget vs.
- **`wealth-flow-analyze-investment-performance`** — Reviews all investment accounts — 401k, Roth IRA, Traditional IRA, HSA (invested), taxable brokerage — and calculates 30-day and YTD returns per account.
- **`wealth-flow-build-cash-flow-summary`** — Summarizes all income and expenses for the month, compares each expense category to its configured budget target, and flags categories more than 20% over budget.
- **`wealth-flow-build-debt-summary`** — Builds a debt table with outstanding balance, interest rate, minimum monthly payment, projected payoff date at current pace, and total remaining interest cost for each loan.
- **`wealth-flow-build-net-worth-summary`** — Aggregates all asset balances and outstanding liabilities into a net worth table with month-over-month delta for each line item.
- **`wealth-op-cash-flow-review`** — Monthly income vs.
- **`wealth-op-debt-review`** — Quarterly debt review.
- **`wealth-op-investment-review`** — Monthly investment performance review.
- **`wealth-op-monthly-synthesis`** — Full monthly wealth synthesis.
- **`wealth-op-net-worth-review`** — Monthly net worth snapshot.
- **`wealth-op-review-brief`** — Monthly wealth review brief.
- **`wealth-task-extract-account-balance`** — Reads a specific account's current balance, prior-period balance, and institution name from vault/wealth/00_current/ and returns the structured record to the calling flow.
- **`wealth-task-flag-budget-variance`** — Writes a flag to vault/wealth/open-loops.md when an expense category exceeds its monthly budget by more than 20%.
- **`wealth-task-flag-savings-milestone`** — Writes a positive milestone flag to vault/wealth/open-loops.md when an account or metric crosses a meaningful financial threshold: emergency fund reaching 3 or 6 months, invested assets crossing $50k/$100k/$250k/$500k, a debt fully paid off, or a savings account hitting a configured target.
- **`wealth-task-update-open-loops`** — The single write point for vault/wealth/open-loops.md.
