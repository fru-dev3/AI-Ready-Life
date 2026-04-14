# AI Ready Life: Real Estate — Quickstart

Welcome to your Real Estate vault. Whether you're looking to buy your first home, analyzing investment properties, or just monitoring the market — this vault tracks listings, runs affordability analysis, and keeps your search organized.

## What's in this vault

- **config.md** — your real estate profile: intent, target markets, budget, pre-approval status, property criteria
- **state.md** — demo data (Alex Rivera) showing an active investment property search with market analysis
- **PROMPTS.md** — 30+ example prompts to get you started
- **00_current/** — active search summary and market snapshot
- **01_analysis/** — affordability and buy-vs-rent analyses
- **02_markets/** — market data by target city
- **03_saved-listings/** — properties you've saved and analyzed
- **04_briefs/** — monthly market briefs the AI generates

## Step 1 — Fill in config.md

Open `config.md` and fill in your intent (buy / invest / monitor), target markets, budget range, and down payment available. If you have a pre-approval, add the amount, lender, and expiry date. For investment searches, add your target cap rate and cash-on-cash return.

## Step 2 — Install the plugin

In Claude Code, add the Real Estate plugin from GitHub:

```
/install github.com/fru-dev3/aireadyu-life/real-estate
```

## Step 3 — Run your first skill

Open Claude and try one of these:

- "Run my real estate monthly review"
- "Scan the market in [city] for investment properties"
- "Run a buy vs. rent analysis for my situation"
- "Analyze this listing: [address or Redfin/Zillow link]"

Claude will run the analysis using your config data and give you a clear recommendation.

## Tips

- **Pre-approval expiry matters.** Claude will flag when yours is approaching expiration (60 days out).
- **Buy vs. rent is personal.** The skill uses your actual numbers — income, savings rate, target market — not generic calculators.
- **Log listings as you find them.** Paste a listing summary into Claude and ask it to "save this listing" — it'll add it to your saved list with key metrics.
- **Market scans happen monthly.** Once a month, ask Claude to scan your target markets and summarize what's changed.

Real estate is one of the biggest financial decisions you'll make. Your AI should be in the room for it.
