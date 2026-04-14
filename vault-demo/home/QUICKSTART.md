# AI Ready Life: Home — Quickstart

Welcome to your Home vault. Whether you own or rent, this vault tracks maintenance schedules, home expenses, seasonal tasks, contractor contacts, and your home warranty — so your home runs smoothly instead of surprising you with expensive problems.

## What's in this vault

- **config.md** — your home profile: property details, landlord or mortgage info, HOA, contractors, home warranty
- **state.md** — demo data (Alex Rivera) showing a complete home maintenance picture
- **PROMPTS.md** — 30+ example prompts to get you started
- **00_current/** — active maintenance schedule and expense summary
- **01_maintenance/** — maintenance logs and work orders
- **02_expenses/** — home expense tracker
- **03_seasonal/** — seasonal maintenance checklists (spring, summer, fall, winter)
- **04_contractors/** — contractor contact list and job history

## Step 1 — Fill in config.md

Open `config.md` and fill in whether you own or rent, your address, and a few key details about your home (year built, square footage). Add your landlord or mortgage info. If you have a home warranty, add the provider and phone number — you'll want that when something breaks at 10pm.

## Step 2 — Install the plugin

In Claude Code, add the Home plugin from GitHub:

```
/install github.com/fru-dev3/aireadyu-life/home
```

## Step 3 — Run your first skill

Open Claude and try one of these:

- "Build my home maintenance schedule"
- "Run my home weekly review"
- "What seasonal maintenance should I do this month?"
- "Log a home expense"

Claude will generate a maintenance schedule based on your home's age and type, and flag any overdue items.

## Tips

- **HVAC filter age matters.** Add your filter size and last service date — Claude will remind you every 3 months.
- **Contractor list saves money.** Pre-vetted contractors you add to config.md mean you're not Googling in a panic when something breaks.
- **Log expenses as you go.** Tracking home expenses throughout the year makes tax time easier if you own.
- **Seasonal checklists are built-in.** Ask Claude "what should I do this fall?" and it will generate a home-specific list.

A well-maintained home is worth more and costs less to own. This vault helps you stay ahead.
