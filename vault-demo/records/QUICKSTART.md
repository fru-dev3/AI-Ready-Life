# AI Ready Life: Records — Quickstart

Welcome to your Records vault. Expiring passports, lapsed subscriptions, lost legal documents — these are the kinds of problems that are completely avoidable with a simple system. This vault is that system.

## What's in this vault

- **config.md** — your records profile: government IDs, subscriptions, legal document locations, password manager
- **state.md** — demo data (Alex Rivera) showing a complete records picture with expiry dates and subscription list
- **PROMPTS.md** — 25+ example prompts to get you started
- **00_current/** — active document status and expiry alerts
- **01_ids/** — government ID records and expiry tracking
- **02_subscriptions/** — subscription inventory
- **03_legal/** — legal document index (locations, not copies)
- **04_archive/** — expired or cancelled items

## Step 1 — Fill in config.md

Open `config.md` and fill in your passport expiry, driver's license expiry and state, Global Entry / TSA PreCheck number and expiry, and your subscription list. You don't need to add every subscription on day one — add the ones that come to mind and add more as you remember them.

## Step 2 — Install the plugin

In Claude Code, add the Records plugin from GitHub:

```
/install github.com/fru-dev3/aireadyu-life/records
```

## Step 3 — Run your first skill

Open Claude and try one of these:

- "Run my document audit"
- "What IDs are expiring in the next 12 months?"
- "Review my subscriptions"
- "Check my expiring documents"

Claude will review your records state and flag anything expiring, any subscriptions that look redundant, and any legal documents that might need updating.

## Tips

- **Passport needs 6 months of validity.** Set the expiry date and Claude will flag when you need to renew based on your travel plans.
- **Subscription creep is real.** Most people are paying for 2-3 services they don't actively use. Claude will surface them.
- **Legal document locations matter.** You don't store the will itself here — just where it lives. That's enough for Claude to flag if it's outdated.
- **Global Entry renewal takes months.** Claude will remind you to apply early.

Records are boring until they matter. Keep them current and they never become urgent.
