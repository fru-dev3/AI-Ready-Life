---
name: AI Ready Life: Learning
description: >
  1 AI agent that manages your skill development — active courses, reading list,
  certifications, and learning goals. 3 skills.
  Full agent instructions and demo vault available on Gumroad.
slug: aireadylife-learning
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: fru.dev
goals:
  - Give you a proactive AI learning partner that tracks your full skill development picture
  - Monitor course progress, certifications, and reading list so nothing falls behind
  - Keep all learning data private and local — never sent to any external service
---

# AI Ready Life: Learning

**1 agent. 3 skills. Weekly reviews. Private. On your machine.**

Your personal AI Chief Learning Officer. The Learning Agent tracks active courses and their progress, maintains your reading list, monitors certification timelines, reviews learning goals quarterly, and surfaces learning updates in Ben's morning brief. Connects to the Career plugin for skills gap context.

## What's Free

- **1 agent** — Learning Agent with capabilities
- **3 skill definitions** — review-brief, monthly-sync, weekly-review
- **Vault schema** — vault-structure.json
- **Demo vault** — pre-populated with Alex Rivera synthetic data

## What's Paid ($19)

**[Get AI Ready Life: Learning on Gumroad → $19](https://frudev.gumroad.com/l/aireadylife-learning)**

Includes:
- Full agent instructions (80+ lines with learning management and skill development expertise)
- Onboarding guide for connecting your course platforms and certification trackers
- 30+ learning prompts covering courses, books, certifications, and goal-setting
- Configuration templates for all major learning platforms

## Install

```bash
npx companies.sh add fru-dev3/aireadyu-life/learning --include plugin,agents,skills
```

## The Agents

| Agent | Title | Budget |
|-------|-------|--------|
| Learning Agent | Chief Learning Officer | $20/mo |

## The 3 Skills

| Skill | Cadence | Produces |
|-------|---------|---------|
| `aireadylife-learning-review-brief` | Weekly | Learning brief — active courses progress, current book, cert timeline |
| `aireadylife-learning-monthly-sync` | Monthly | Synced course progress and monthly learning goals review |
| `aireadylife-learning-weekly-review` | Weekly | Weekly learning check-in — study time, progress toward goals |

## MCP Integration (Claude.ai)

```bash
# Add to Claude.ai → Settings → Integrations
npx -y @aireadylife/learning-plugin

# Run in demo mode first
VAULT_MODE=demo npx -y @aireadylife/learning-plugin
```
