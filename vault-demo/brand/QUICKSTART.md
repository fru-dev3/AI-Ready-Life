# AI Ready Life: Brand — Quickstart

Welcome to your Brand vault. Whether you're building a personal brand alongside your career or running a full creator business, this vault tracks your analytics, mentions, profile consistency, and growth in one place.

## What's in this vault

- **config.md** — your brand profile: handles, website, channels, newsletter, keywords to monitor
- **state.md** — demo data (Alex Rivera) showing brand analytics across multiple channels
- **PROMPTS.md** — 30+ example prompts to get you started
- **00_current/** — your active brand snapshot and metrics
- **01_analytics/** — analytics reports and performance data
- **02_mentions/** — brand mentions and press coverage
- **03_briefs/** — monthly brand briefs the AI generates

## Step 1 — Fill in config.md

Open `config.md` and fill in your handles, website URL, social profiles, and newsletter details. Add your primary brand keywords — these are the terms you want to be known for. The more specific you are, the better the agent's monitoring and analysis.

## Step 2 — Install the plugin

In Claude Code, add the Brand plugin from GitHub:

```
/install github.com/fru-dev3/aireadyu-life/brand
```

## Step 3 — Run your first skill

Open Claude and try one of these:

- "Run my monthly brand review"
- "Check my profile consistency across channels"
- "Build my analytics summary"
- "What brand opportunities am I missing?"

Claude will audit your presence, flag inconsistencies, and give you a brand brief with growth observations.

## Tips

- **Profile consistency is easy to break.** Headshots, bios, and handle names drift over time. Ask Claude to audit quarterly.
- **Mention monitoring needs keywords.** The more specific your `monitoring_keywords` in config.md, the better the signal-to-noise ratio.
- **Subscriber count updates drive trend analysis.** Update your newsletter count monthly so Claude can surface growth or churn trends.
- **Benchmarks help.** Add 2-3 peers to `benchmark_accounts` and Claude will contextualize your growth.

Your brand compounds over time. Track it like an asset.
