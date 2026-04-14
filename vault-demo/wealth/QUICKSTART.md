# AI Ready Life: Wealth — Quickstart

Welcome to your Wealth vault. This is your personal financial command center — net worth tracking, investments, cash flow, debt, and estate planning in one place that your AI reads and reasons over.

## What's in this vault

- **config.md** — your financial profile: accounts, balances, allocation targets, liabilities
- **state.md** — demo data (Alex Rivera) showing a complete wealth snapshot
- **PROMPTS.md** — 30+ example prompts to get you started
- **00_current/** — your current net worth and cash flow snapshot
- **01_statements/** — monthly statements you paste or upload
- **02_investments/** — investment holdings, allocations, and performance notes
- **03_estate/** — will, trust, beneficiary designations
- **04_briefs/** — weekly and monthly wealth briefs the AI generates
- **05_archive/** — older snapshots and statements

## Step 1 — Fill in config.md

Open `config.md` and fill in what you know: checking/savings accounts (institution + last 4 digits), brokerage and retirement account balances, any loans, and your investment allocation target. Rough numbers are fine to start — the agent will help you refine them.

## Step 2 — Install the plugin

In Claude Code, add the Wealth plugin from GitHub:

```
/install github.com/fru-dev3/aireadyu-life/wealth
```

## Step 3 — Run your first skill

Open Claude and try one of these:

- "Run my wealth monthly review"
- "Build my net worth summary"
- "How is my cash flow looking?"
- "Summarize my investment performance"

Claude will read your config and state, then give you a complete financial picture with observations and action items.

## Tips

- **Update balances monthly.** Pull your account balances from your bank and brokerage apps once a month and update state.md. 15 minutes a month keeps everything current.
- **Track every liability.** Loans, credit card balances, and car payments matter for your net worth calculation.
- **Your allocation target is the north star.** Set it in config.md and the agent will flag when you drift.
- **Estate docs location matters.** Even just noting where your will lives helps the agent give complete advice.

Wealth clarity compounds just like money. Start with what you know and add more each month.
