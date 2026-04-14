# AI Ready Life: Estate — Quickstart

Welcome to your Estate vault. If you own rental properties, this vault tracks cash flow, maintenance schedules, tenant status, insurance renewals, and portfolio performance — so your rental business runs on autopilot instead of in your head.

## What's in this vault

- **config.md** — your portfolio profile: properties, mortgages, rents, property managers, insurance
- **state.md** — demo data (Alex Rivera) showing a two-property rental portfolio with full data
- **PROMPTS.md** — 30+ example prompts to get you started
- **00_current/** — active portfolio snapshot and cash flow summary
- **01_properties/** — individual property records and documents
- **02_tenants/** — tenant information and lease tracking
- **03_maintenance/** — maintenance logs and scheduled tasks
- **04_insurance/** — policy details and renewal tracking
- **05_briefs/** — monthly portfolio briefs the AI generates

## Step 1 — Fill in config.md

Open `config.md` and fill in each property: address, purchase price, current value, mortgage balance and rate, monthly rent, and property manager. Even rough numbers give the agent what it needs to calculate cash flow and cap rate.

## Step 2 — Install the plugin

In Claude Code, add the Estate plugin from GitHub:

```
/install github.com/fru-dev3/aireadyu-life/estate
```

## Step 3 — Run your first skill

Open Claude and try one of these:

- "Run my estate monthly review"
- "Build my portfolio cash flow summary"
- "What maintenance is coming up?"
- "Review my tenant status"

Claude will give you a complete portfolio brief with cash flow analysis, maintenance flags, and tenant status.

## Tips

- **Cash flow is the scoreboard.** Keep rent and mortgage amounts current in config.md for accurate monthly calculations.
- **Log maintenance expenses.** Ask Claude to "log a maintenance expense" after every repair to track actual spend vs. reserve.
- **Lease end dates are critical.** Add them in config.md so Claude flags renewal conversations 90 days out.
- **Insurance renewals sneak up.** The agent monitors renewal dates and alerts you 60 days before.

Rental properties are a business. Your vault makes them feel like one.
