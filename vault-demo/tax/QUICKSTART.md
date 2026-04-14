# AI Ready Life: Tax — Quickstart

Welcome to your Tax vault. This is where deadlines, estimates, deductions, entity compliance, and document checklists live — so your AI can keep you ahead of the IRS instead of scrambling to catch up.

## What's in this vault

- **config.md** — your tax profile: filing status, employer, CPA, business entities, payment methods
- **state.md** — demo data (Alex Rivera) showing a complete tax state with deadlines and estimates
- **PROMPTS.md** — 30+ example prompts to get you started
- **00_current/** — current year tax snapshot and active deadlines
- **01_federal/** — federal documents, returns, and correspondence
- **02_state/** — state tax documents and returns
- **03_entities/** — LLC and business entity filings
- **04_briefs/** — tax briefings the AI generates
- **05_archive/** — prior year returns and documents

## Step 1 — Fill in config.md

Open `config.md` and fill in your filing status, state, employer name, CPA contact, and any business entities you have. If you have LLCs or S-corps, list them. This is the most important config in the system — accurate info here prevents missed deadlines.

## Step 2 — Install the plugin

In Claude Code, add the Tax plugin from GitHub:

```
/install github.com/fru-dev3/aireadyu-life/tax
```

## Step 3 — Run your first skill

Open Claude and try one of these:

- "What are my upcoming tax deadlines?"
- "Check my document completeness for this tax season"
- "Estimate my Q2 quarterly payment"
- "Review deductions I might be missing"

Claude will build a personalized deadline list and flag anything that needs your attention.

## Tips

- **Deadlines are the whole point.** Keep your entity list accurate in config.md — each entity has its own filing calendar.
- **Log deductible expenses as they happen.** Ask Claude to "log a deductible expense" after any business purchase.
- **Quarterly estimates matter most if you're self-employed.** Set up your Q dates and payment method in config.md.
- **Share your CPA's contact.** When you ask Claude to draft a question for your CPA, it'll know who to address.

Tax stress is almost always caused by surprises. This vault eliminates the surprises.
