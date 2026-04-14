# AI Ready Life: Health — Quickstart

Welcome to your Health vault. This is where your medical life lives — labs, medications, appointments, HSA, preventive care, and wellness data all in one place that your AI actually reads.

## What's in this vault

- **config.md** — your health profile: insurance, doctor, medications, conditions, goals
- **state.md** — demo data (Alex Rivera) showing what a full health state looks like
- **PROMPTS.md** — 30+ example prompts to get you started
- **00_current/** — your active health snapshot
- **01_labs/** — lab results you upload or paste in
- **02_visits/** — visit notes and after-visit summaries
- **03_briefs/** — weekly and monthly health briefs the AI generates
- **04_archive/** — older records, sorted by year

## Step 1 — Fill in config.md

Open `config.md` and fill in your details: insurance carrier, primary care doctor, current medications, known conditions, and health goals. This takes about 10 minutes. You don't need everything — fill what you know and leave the rest blank. The agent will tell you what's missing.

## Step 2 — Install the plugin

In Claude Code, add the Health plugin from GitHub:

```
/install github.com/fru-dev3/aireadyu-life/health
```

Or if you're using the full AI Ready Life repo, it's already included.

## Step 3 — Run your first skill

Open Claude and try one of these:

- "Run my health weekly review"
- "Check my medication refill dates"
- "Am I up to date on preventive care?"
- "Review my latest labs"

Claude will read your config.md and state.md, then give you a personalized health brief.

## Tips

- **Add labs as you get them.** Drop a PDF or paste the text into `01_labs/` with a date in the filename (e.g., `2026-03-labs.md`).
- **Log visits after appointments.** A quick paste of your after-visit summary into `02_visits/` keeps your record complete.
- **Your HSA balance matters.** Keep it updated in config.md — the agent tracks it against your deductible progress.
- **Medications drive refill alerts.** The more complete your med list, the smarter the refill reminders.

Your Health AI is only as smart as the data you give it. Start simple, add more over time.
