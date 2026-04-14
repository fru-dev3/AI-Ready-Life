---
name: AI Ready Life: Intel
description: >
  1 AI agent that scans your curated news sources daily — AI, tech, finance,
  and world news filtered to your interests. Produces morning and evening
  intelligence briefs. 3 skills.
  Full agent instructions and demo vault available on Gumroad.
slug: aireadylife-intel
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: fru.dev
goals:
  - Give you a proactive AI news partner that filters the signal from the noise
  - Produce morning and evening intelligence briefs tailored to your interest lens
  - Keep all source config and briefs private and local — never sent to any external service
---

# AI Ready Life: Intel

**1 agent. 3 skills. Daily briefs. Private. On your machine.**

Your personal AI intelligence director. The Intel Agent scans 20+ curated RSS feeds, newsletters, and web sources daily — filtering AI, tech, finance, career, and world news through your personal interest lens. Produces a morning brief of top 5-8 stories and an evening wrap-up. Tracks multi-day story threads so you never lose context.

## What's Free

- **1 agent** — Intel Agent with capabilities
- **3 skill definitions** — review-brief, morning-brief, source-scan
- **Vault schema** — vault-structure.json
- **Demo vault** — pre-populated with Alex Rivera synthetic data

## What's Paid ($19)

**[Get AI Ready Life: Intel on Gumroad → $19](https://fruverse.gumroad.com/l/aireadylife-intel)**

Includes:
- Full agent instructions (80+ lines with news curation and filtering expertise)
- Onboarding guide for configuring your source list and interest lens
- 30+ intel prompts covering briefs, source management, and story tracking
- Configuration templates for topic filters, source categories, and brief format

## Install

```bash
npx companies.sh add fru-dev3/aireadyu-life/intel --include plugin,agents,skills
```

## The Agents

| Agent | Title | Budget |
|-------|-------|--------|
| Intel Agent | Intelligence Director | $20/mo |

## The 3 Skills

| Skill | Cadence | Produces |
|-------|---------|---------|
| `aireadylife-intel-morning-brief` | Daily | Morning intelligence brief — top stories filtered to user's interest lens |
| `aireadylife-intel-evening-brief` | Daily | Evening wrap-up brief — day's developments and story updates |
| `aireadylife-intel-source-scan` | Weekly | Source health audit — stale or low-quality source flags |

## MCP Integration (Claude.ai)

```bash
# Add to Claude.ai → Settings → Integrations
npx -y @aireadylife/intel-plugin

# Run in demo mode first
VAULT_MODE=demo npx -y @aireadylife/intel-plugin
```
