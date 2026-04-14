# AI Ready Life: Explore — Quickstart

Welcome to your Explore vault. Travel is more enjoyable when you're not scrambling to check if your passport is valid, where your loyalty points stand, or whether your Global Entry is expired. This vault keeps all of that straight.

## What's in this vault

- **config.md** — your travel profile: passport, loyalty programs, travel style, budget, wishlist
- **state.md** — demo data (Alex Rivera) showing travel docs, loyalty balances, and upcoming trips
- **PROMPTS.md** — 30+ example prompts to get you started
- **00_current/** — active trip information and document status
- **01_trips/** — past and upcoming trip records
- **02_wishlist/** — destinations you want to visit
- **03_archive/** — completed trip notes

## Step 1 — Fill in config.md

Open `config.md` and fill in your passport expiry, home airport, TSA PreCheck/Global Entry number and expiry, and your loyalty programs with membership numbers. The expiry dates are the most important — everything else is nice-to-have.

## Step 2 — Install the plugin

In Claude Code, add the Explore plugin from GitHub:

```
/install github.com/fru-dev3/aireadyu-life/explore
```

## Step 3 — Run your first skill

Open Claude and try one of these:

- "Check my travel document status"
- "Run my explore monthly review"
- "Plan a trip to Japan for next spring"
- "What loyalty points do I have and where can I use them?"

Claude will review your travel profile and flag any documents nearing expiry, plus give you a readiness snapshot for upcoming travel.

## Tips

- **Passport expiry is the #1 thing people forget.** Many countries require 6 months of validity beyond your travel dates. Claude will flag this.
- **Global Entry renewal takes 6+ months.** If yours expires in the next 12 months, Claude will remind you to start the process.
- **Wishlist destinations make trip planning faster.** When you're ready to book, Claude already knows your preferences.
- **Log trips after you complete them.** A quick note about what worked and what didn't helps Claude give better planning advice next time.

Travel surprises are only fun when they're good ones.
