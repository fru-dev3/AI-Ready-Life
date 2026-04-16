---
name: chief-of-staff
description: >
  Orchestrates all installed AI Ready Life plugins from a single executive control point. Every morning reads from all active domain vaults, synthesizes a unified brief with urgency-tiered alerts (🔴/🟡/🟢), top 3 actions, calendar highlights, and open-loop counts. Every Monday delivers a week-ahead preview with cross-domain deadlines, deep work focus recommendations, and backlog visibility. Syncs to Notion or Google Drive on demand. Requires at least two other AI Ready Life plugins to be installed and active.
---

# Chief of Staff — Setup

1. Install at least 2 other AI Ready Life plugins first (health, wealth, tax, career, or others)
2. Download AI Ready Life: Chief from [Gumroad](https://frudev.gumroad.com/l/aireadylife-chief)
3. Extract to `~/Documents/aireadylife/`
4. Move the `chief/` folder to `~/Documents/aireadylife/vault/`
5. Open `~/Documents/aireadylife/vault/chief/config.md` and fill in your plugin list and optional Notion/GDrive credentials
6. In Paperclip, select this agent → Advanced → External
7. Path: `~/Documents/aireadylife/chief/agents/chief-of-staff`

## What This Agent Does

Chief of Staff is your personal life operating system controller. Every morning, it scans open-loops.md from every installed plugin vault, ranks all active items by urgency tier, selects the three most critical actions for today, and delivers a single structured brief. You should never need to check individual plugin agents to understand what needs your attention — Chief surfaces it all in one place.

**Daily Brief format:**
```
## ACTION TODAY
1. [🔴 item — domain — specific action required]
2. [🔴 or 🟡 item — domain — specific action required]
3. [🟡 item — domain — specific action required]

## Domain Alerts
| Domain     | Last Run   | 🔴 | 🟡 | 🟢 | Top Flag                              |
|------------|------------|----|----|-----|---------------------------------------|
| tax        | 2026-04-10 | 1  | 0  | 2  | Q1 est. payment due Apr 15            |
| benefits   | 2026-04-01 | 0  | 1  | 1  | HSA contribution limit not maxed      |
| ...

## Calendar Today
- [events from vault/calendar/ or "Calendar plugin not installed"]

## Open Loops
### tax (3 items)
- 🔴 Q1 estimated payment due April 15 → make payment
...
```

**Weekly Preview format (Mondays):**
```
## This Week's Deadlines
| Day      | Domain  | Item                        | Priority |
|----------|---------|-----------------------------|----------|
| Monday   | tax     | Q1 est. payment             | 🔴       |
| ...

## Top Priorities This Week
1. [item — why it matters this week]
...

## Focus Time Recommendations
- Best deep work days: Tuesday, Thursday (light meetings)
- Avoid: Wednesday (3 back-to-back meetings)

## Backlog Summary
| Domain  | Total | 🔴 | 🟡 | 🟢 |
|---------|-------|----|----|-----|
| tax     | 3     | 1  | 0  | 2  |
...
```

## Vault

~/Documents/aireadylife/vault/chief/. If missing → frudev.gumroad.com/l/aireadylife-chief.
