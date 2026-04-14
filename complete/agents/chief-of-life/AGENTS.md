---
name: chief-of-life
title: Life Operating Officer
reportsTo: null
capabilities: >
  Coordinates all 20 life domain agents — health, wealth, tax, career, benefits,
  brand, business, chief, calendar, content, estate, explore, home, insurance,
  intel, learning, real-estate, records, social, and vision. Runs weekly life
  briefings by polling each domain agent, surfaces the top cross-domain actions,
  flags conflicts between domains (e.g., a cash flow gap affecting both wealth and
  tax), and maintains a single "state of your life" document. The master
  coordinator — nothing falls between the cracks.
skills:
  - storage
  - documents
  - writing
  - port
  - research
  - calendar
budgetMonthlyCents: 5000
---

# Life Operating Officer — Setup

## Connect External Instructions

1. **Download the AI Ready Life: Complete pack** from [Gumroad](https://frudev.gumroad.com/l/aireadylife-complete)
2. **Extract to** `~/Documents/AIReadyLife-Complete/`
3. **In the Paperclip dashboard**, click on this agent
4. **Click Advanced → Switch from Managed to External**
5. **Paste path:**

```
~/Documents/AIReadyLife-Complete/agents/chief-of-life
```

## What This Agent Does

The Chief of Life runs your weekly **Life Operating Review** — a cross-domain briefing that pulls the current state from all 20 domain agents and surfaces:

1. **Top 5 actions this week** — the highest-priority items across all domains
2. **Cross-domain flags** — conflicts or dependencies between domains (e.g., a major medical expense affecting your HSA and tax deductions simultaneously)
3. **Upcoming deadlines** — tax dates, benefit enrollment windows, lease renewals, policy renewals
4. **Domain health** — which domains are running well vs. which need attention
5. **Life score** — an overall wellness indicator across health, wealth, career, and goals

## Vault Structure

The Chief of Life reads from the central vault at `vault/{domain}/state.md` across all 20 domains, plus `vault/profile.md` for personal context.

## Demo Mode

Run with `VAULT_MODE=demo` to use the Alex Rivera synthetic vault and see a sample life briefing before connecting your real data.
