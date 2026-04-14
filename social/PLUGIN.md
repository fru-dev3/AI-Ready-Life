---
name: AI Ready Life: Social
description: >
  1 AI agent that manages your personal relationships — birthday and milestone
  tracking, relationship health scores, check-in reminders, and outreach queue.
  3 skills.
  Full agent instructions and demo vault available on Gumroad.
slug: aireadylife-social
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: fru.dev
goals:
  - Give you a proactive AI social partner that keeps your important relationships healthy
  - Never miss a birthday or milestone again — get timely reminders with context
  - Keep all relationship data private and local — never sent to any external service
---

# AI Ready Life: Social

**1 agent. 3 skills. Weekly outreach queue. Private. On your machine.**

Your personal AI Social Director. Maintains a relationship CRM for important personal and professional contacts, tracks birthdays and major milestones, scores relationship health by recency of contact, surfaces weekly outreach suggestions (who you haven't connected with in a while), and produces weekly social briefs in Ben's morning brief.

## What's Free

- **1 agent** — Social Agent with capabilities
- **3 skill definitions** — review-brief, monthly-sync, weekly-review
- **Vault schema** — vault-structure.json
- **Demo vault** — pre-populated with Alex Rivera synthetic data

## What's Paid ($19)

**[Get AI Ready Life: Social on Gumroad → $19](https://frudev.gumroad.com/l/aireadylife-social)**

Includes:
- Full agent instructions (80+ lines with relationship management and social coordination expertise)
- Onboarding guide for building your contact list and configuring relationship tiers
- 30+ social prompts covering birthdays, relationship health, and outreach strategies
- Configuration templates for contact tiers, milestone tracking, and check-in cadence

## Install

```bash
npx companies.sh add fru-dev3/aireadyu-life/social --include plugin,agents,skills
```

## The Agents

| Agent | Title | Budget |
|-------|-------|--------|
| Social Agent | Social Director | $20/mo |

## The 3 Skills

| Skill | Cadence | Produces |
|-------|---------|---------|
| `aireadylife-social-review-brief` | Weekly | Social brief — upcoming birthdays, relationship health flags, outreach suggestions |
| `aireadylife-social-monthly-sync` | Monthly | Reviews relationship health scores and identifies who needs a check-in |
| `aireadylife-social-weekly-review` | Weekly | This week's outreach queue and upcoming social commitments |

## MCP Integration (Claude.ai)

```bash
# Add to Claude.ai → Settings → Integrations
npx -y @aireadylife/social-plugin

# Run in demo mode first
VAULT_MODE=demo npx -y @aireadylife/social-plugin
```
