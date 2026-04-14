# AI Ready Life: Insurance — Quickstart

Welcome to your Insurance vault. Most people have no idea what they're actually covered for until they need to file a claim. This vault gives you a clear picture of every policy you own, when they renew, what they cover, and where the gaps are.

## What's in this vault

- **config.md** — your insurance profile: health, life, auto, home/renters, umbrella, disability policies
- **state.md** — demo data (Alex Rivera) showing a complete insurance portfolio with coverage analysis
- **PROMPTS.md** — 30+ example prompts to get you started
- **00_current/** — active coverage summary and upcoming renewals
- **01_health/** — health insurance details and claims
- **02_life/** — life insurance policy and beneficiary info
- **03_auto/** — auto policy details and vehicles covered
- **04_home-renters/** — home or renters policy details
- **05_umbrella/** — umbrella policy details
- **06_other/** — any additional policies

## Step 1 — Fill in config.md

Open `config.md` and fill in what you have. You don't need every field — start with carrier name, coverage amount, and renewal date for each policy type. The renewal dates are the most critical — missing a renewal can lead to coverage gaps.

## Step 2 — Install the plugin

In Claude Code, add the Insurance plugin from GitHub:

```
/install github.com/fru-dev3/aireadyu-life/insurance
```

## Step 3 — Run your first skill

Open Claude and try one of these:

- "Run my insurance coverage audit"
- "What renewals are coming up in the next 60 days?"
- "Do I have any coverage gaps?"
- "Build my coverage summary"

Claude will review your portfolio and flag anything approaching renewal, any coverage gaps, or any policies that look underpriced for your situation.

## Tips

- **Coverage gaps are invisible until you need coverage.** The audit skill is specifically designed to find them.
- **Renewal timing is 60 days.** Claude will flag any policy renewing within 60 days so you have time to shop.
- **Umbrella insurance is often missing.** If you own assets or have income above $100k, Claude will flag if you don't have it.
- **Beneficiary designations drift.** Life circumstances change — ask Claude to flag if beneficiaries haven't been reviewed recently.

You're already paying for insurance. Make sure it actually covers you.
