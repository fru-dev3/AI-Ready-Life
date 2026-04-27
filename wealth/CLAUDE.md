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

**Apps (data connectors — fallback when no native MCP connector available):**
- `app-fidelity.portal` — 401(k) / brokerage / retirement data from Fidelity via Playwright + Chrome cookie auth.
- `app-m1-finance.portal` — Pies / positions / portfolio from M1 Finance via Playwright.
- `app-monarch-money` — Transactions / spend / budget from Monarch (fallback when Plaid native connector isn't available).

**Operations (user-facing routines):**
- `op-net-worth-review` — Monthly net worth snapshot with MoM delta and account-level flags.
- `op-cash-flow-review` — Monthly income vs expense review with category variance and runway.
- `op-investment-review` — Monthly + quarterly investment performance, allocation drift, concentration, benchmarks.
- `op-debt-review` — Quarterly debt review with payoff projections and rate-opportunity check.
- `op-monthly-synthesis` — Full monthly wealth process: runs every flow fresh, produces deep briefs.
- `op-review-brief` — Lightweight current-state snapshot (read-only; no recomputation). For "where do I stand right now."
- `op-subscription-audit` — Annual subscription review. Detects from records-plugin / transactions / manual. Recommends cancels.
- `op-accountant-packet` — Year-end tax-prep packet (W-2s, 1099s, 1098s, K-1s, summaries). Cross-domain with tax.
- `op-estate-plan-review` — Annual estate-plan freshness check (will, beneficiaries, directives, POAs).

**Flows (multi-step internals called by ops):**
- `flow-build-net-worth-summary` — Categorized net-worth table with per-account MoM deltas.
- `flow-build-cash-flow-summary` — Income / expense / category / variance summary.
- `flow-build-debt-summary` — Debt table with payoff projections.
- `flow-analyze-investment-performance` — Per-account returns over multiple periods.
- `flow-flag-account-anomalies` — >5% MoM balance changes or >$500 unrecognized transactions.
- `flow-calculate-emergency-fund-runway` — Liquid balance ÷ trailing burn → months of runway vs floor.
- `flow-separate-income-streams` — W-2 / self-employment / rental / investment / other, with volatility flags.
- `flow-benchmark-investment-returns` — Per-account return vs reference benchmark with alpha and underperformance flag.
- `flow-asset-allocation-drift` — Current allocation vs target; rebalance recommendations.
- `flow-retirement-on-track` — Deterministic retirement-readiness projection with three remedies.
- `flow-concentration-risk` — Single positions >10% (>5% for employer stock) flagged.
- `flow-tax-efficient-account-placement` — Bonds / REITs / growth in the right tax bucket; relocation recommendations.

**Tasks (atomic operations called by flows / ops):**
- `task-extract-account-balance` — Reads one account's balance + prior period.
- `task-flag-budget-variance` — Flag when category exceeds monthly budget >20%.
- `task-flag-rate-opportunity` — Combined cash-drag + mortgage-refi + balance-transfer scanner; quantified annual savings.
- `task-track-credit-score` — Logs scores per bureau; flags >20-point drops.
- `task-update-open-loops` — Single write point for `open-loops.md`.
