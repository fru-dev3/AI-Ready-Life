# AI Ready Life: Chief — Quickstart

Welcome to your Chief of Staff vault. Chief is your daily briefing system — it pulls status from all your active domain plugins, surfaces what needs your attention, and keeps you oriented across every area of your life.

## What's in this vault

- **config.md** — your Chief profile: timezone, active domains, top priorities, brief schedule
- **state.md** — demo data (Alex Rivera) showing a daily brief with cross-domain alerts
- **PROMPTS.md** — 30+ example prompts to get you started
- **00_current/** — today's brief and active open loops
- **01_briefs/** — historical daily and weekly briefs
- **02_archive/** — older briefs by month

## Step 1 — Fill in config.md

Open `config.md` and set your timezone, your daily brief time, and the list of active domains (only include domains where you've installed the plugin and filled in config). Add your top 3-5 priorities for the quarter — Chief uses these to flag what's most relevant.

## Step 2 — Install the plugin

In Claude Code, add the Chief plugin from GitHub:

```
/install github.com/fru-dev3/aireadyu-life/chief
```

## Step 3 — Run your first skill

Open Claude and try one of these:

- "Run my daily brief"
- "What needs my attention today?"
- "Build my weekly agenda"
- "What open loops are unresolved across all domains?"

Claude will pull status from every active domain and give you a unified brief — alerts, deadlines, and priorities in one place.

## Tips

- **Chief is most powerful with multiple domains.** The more plugins you have installed, the richer the cross-domain picture.
- **Set your top priorities.** Chief uses them to surface the most relevant items from each domain every day.
- **Daily briefs compound.** The more consistently you run them, the better Claude gets at what matters to you.
- **Open loops are tracked here.** Ask Chief to "check all open loops" and it'll pull the unresolved list from every domain.

Chief is the connective tissue between all your other plugins. Install it last, use it daily.
