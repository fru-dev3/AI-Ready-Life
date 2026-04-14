# AI Ready Life: Calendar — Quickstart

Welcome to your Calendar vault. This plugin bridges your calendar with every other domain in your life — pulling deadlines from Tax, Benefits, Estate, and Records into a unified view, and protecting your focus time against meeting creep.

## What's in this vault

- **config.md** — your calendar profile: primary calendar, work hours, focus preferences, domains to sync
- **state.md** — demo data (Alex Rivera) showing deadlines and focus time analysis
- **PROMPTS.md** — 30+ example prompts to get you started
- **00_current/** — active deadlines and this week's agenda
- **01_events/** — manually logged events and milestones
- **02_deadlines/** — cross-domain deadline registry
- **03_briefs/** — weekly agenda briefs the AI generates

## Step 1 — Fill in config.md

Open `config.md` and set your primary calendar, timezone, work hours, and focus block preferences. Add which domains you want deadline sync from — at minimum add `tax, benefits, estate, records`. These are the domains with hard external deadlines.

## Step 2 — Install the plugin

In Claude Code, add the Calendar plugin from GitHub:

```
/install github.com/fru-dev3/aireadyu-life/calendar
```

## Step 3 — Run your first skill

Open Claude and try one of these:

- "Build my weekly agenda"
- "What deadlines are coming up in the next 30 days?"
- "How much focus time did I have this week?"
- "Add the Q2 tax deadline to my deadlines list"

Claude will build your agenda from all active domains and surface any approaching deadlines.

## Tips

- **Deadlines beat appointments.** The most valuable thing Calendar does is pull hard deadlines from other domains before you forget them.
- **Focus time analysis is honest.** If your calendar is full of meetings and you wonder why nothing gets done, this skill will quantify it.
- **School calendar matters.** If you have kids, add your school district name — Claude knows the major school events.
- **Sync with your real calendar.** The Google Calendar integration lets Claude add events directly.

Time is your only non-renewable resource. Protect it deliberately.
