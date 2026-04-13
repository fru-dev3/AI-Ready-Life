---
name: AI Ready Life: Home
description: >
  1 AI agent that manages your home — maintenance tracking, home expenses,
  seasonal task lists, and household organization. 3 skills.
slug: aireadylife-home
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: fru.dev
goals:
  - Keep home maintenance proactive so nothing becomes an expensive emergency
  - Track home expenses separately from general spending
  - Seasonal task lists so the right things get done at the right time
---

# AI Ready Life: Home

**1 agent. 3 skills. Home and household management.**

Tracks maintenance, home expenses, and seasonal tasks for renters and homeowners alike.

## What's Free

- **1 agent** — Household Director
- **3 skills** — review-brief, monthly-sync, weekly-review
- **Vault schema** + **Demo vault** (Alex Rivera Austin renter data)

## What's Paid ($19)

**[Get AI Ready Life: Home on Gumroad → $19](https://fruverse.gumroad.com/l/aireadylife-home)**

Includes:
- Full agent instructions with home management domain expertise
- Onboarding guide for renters and homeowners
- 30+ home prompts covering maintenance, expenses, and seasonal prep
- Configuration templates for renter and owner setups

## Install

```bash
npx companies.sh add fru-dev3/aireadyu-life/home --include plugin,agents,skills
```

## The Agent

| Agent | Title | Budget |
|-------|-------|--------|
| Home Agent | Household Director | $15/mo |

## The 3 Skills

| Skill | Cadence | Produces |
|-------|---------|---------|
| `arlive-home-review-brief` | Weekly (when flagged) | Home brief |
| `arlive-home-monthly-sync` | Monthly | Maintenance + expense review |
| `arlive-home-weekly-review` | Weekly | Open items + seasonal tasks |

## MCP Integration (Claude.ai)

```bash
VAULT_MODE=demo npx -y @aireadylife/home-plugin
```
