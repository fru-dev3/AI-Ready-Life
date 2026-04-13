---
name: AI Ready Life: Calendar
description: >
  2 AI agents — Chief of Staff + Calendar Director. Protect focus time, surface deadlines
  before they're urgent, and align your weekly schedule with quarterly priorities. 8 skills.
slug: aireadylife-calendar
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: fru.dev
goals:
  - Protect focus time — flag when deep work blocks fall below weekly targets
  - Surface deadlines before they're urgent — 30-day rolling deadline registry across all domains
  - Align weekly schedule with quarterly priorities
---

# AI Ready Life: Calendar

**2 agents. 8 skills. Calendar clarity week by week.**

Stop being surprised by deadlines. Know your focus time health every week. Sync obligations from every life domain into one place before they become urgent.

## What's Free

- **2 agent definitions** — Chief of Staff + Calendar Director
- **8 skill definitions** — daily review, weekly review, deadline alerts, focus time audit, and more
- **Vault schema** — vault-structure.json
- **Demo vault** — Alex Rivera synthetic calendar state

## What's Paid ($29)

**[Get AI Ready Life: Calendar on Gumroad → $29](https://fruverse.gumroad.com/l/aireadylife-calendar)**

Includes full agent instructions, cross-domain deadline registry setup, focus time scoring rubric, quarterly alignment templates, and 35+ calendar management prompts.

## Install

```bash
npx companies.sh add fru-dev3/aireadyu-life/calendar --include plugin,agents,skills
```

## MCP Integration

```bash
npx -y @aireadylife/calendar-plugin
VAULT_MODE=demo npx -y @aireadylife/calendar-plugin
```

## The 8 Skills

| Skill | Cadence | Produces |
|-------|---------|---------|
| `arlive-calendar-review-brief` | Weekly | Weekly calendar brief — deadlines, focus health, flags |
| `arlive-calendar-daily-review` | Daily | Today's schedule review with priority alignment |
| `arlive-calendar-weekly-review` | Weekly | Week-ahead planning with deadline sync |
| `arlive-calendar-deadline-alert` | Weekly | 30-day rolling deadline alert from all installed plugins |
| `arlive-calendar-deadline-sync` | Weekly | Sync cross-domain deadlines into unified calendar |
| `arlive-calendar-deep-work-audit` | Weekly | Deep work block health check vs. weekly targets |
| `arlive-calendar-recurring-event-review` | Quarterly | Audit recurring events for continued relevance |
| `arlive-calendar-quarterly-alignment` | Quarterly | Align weekly calendar structure with quarterly goals |
