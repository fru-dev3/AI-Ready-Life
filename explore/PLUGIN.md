---
name: AI Ready Life: Explore
description: >
  1 AI agent that manages your travel and adventure life — trip planning, passport
  and document status, travel wishlist, and upcoming adventure prep. 2 skills.
slug: aireadylife-explore
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: fru.dev
goals:
  - Never let an expired passport or visa sneak up on you
  - Keep your travel wishlist organized and financially connected to your wealth plan
  - Surface upcoming trips early enough to plan properly
---

# AI Ready Life: Explore

**1 agent. 2 skills. Travel and adventure management.**

Tracks passport status, upcoming trips, travel wishlist, and travel document readiness.

## What's Free

- **1 agent** — Explore Agent (Adventure Director)
- **2 skills** — review-brief, monthly-sync
- **Vault schema** + **Demo vault** (Alex Rivera travel data)

## What's Paid ($19)

**[Get AI Ready Life: Explore on Gumroad → $19](https://fruverse.gumroad.com/l/aireadylife-explore)**

Includes:
- Full agent instructions with travel domain expertise
- Onboarding guide for loading passports, visas, and trip bookings
- 30+ travel prompts covering trip planning, packing, and document checks
- Configuration templates for solo, couple, and family travel setups

## Install

```bash
npx companies.sh add fru-dev3/aireadyu-life/explore --include plugin,agents,skills
```

## The Agent

| Agent | Title | Budget |
|-------|-------|--------|
| Explore Agent | Adventure Director | $15/mo |

## The 2 Skills

| Skill | Cadence | Produces |
|-------|---------|---------|
| `arlive-explore-review-brief` | Monthly | Explore review brief |
| `arlive-explore-monthly-sync` | Monthly | Document expiry + trip alerts |

## MCP Integration (Claude.ai)

```bash
VAULT_MODE=demo npx -y @aireadylife/explore-plugin
```
