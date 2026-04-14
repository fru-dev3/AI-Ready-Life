---
name: AI Ready Life: Vision
description: >
  2 AI agents focused on your life vision — quarterly planning, goal tracking,
  13-domain life scorecard, and strategic alignment between your calendar and
  your priorities. 8 skills.
  Full agent instructions and demo vault available on Gumroad.
slug: aireadylife-vision
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: fru.dev
goals:
  - Give you a proactive AI strategic partner that keeps your life vision front and center
  - Run quarterly planning, goal tracking, and 13-domain life scorecard reviews
  - Keep all vision and goal data private and local — never sent to any external service
---

# AI Ready Life: Vision

**2 agents. 8 skills. Quarterly planning. Private. On your machine.**

Your personal AI Chief Strategy Officer. Maintains your life vision document and quarterly OKRs, produces a monthly 13-domain life scorecard (career, health, wealth, relationships, personal growth, etc.), checks alignment between how you're spending time and your stated priorities, surfaces the delta between goals and current trajectory, and runs quarterly planning sessions. The most strategic of all life plugins.

## What's Free

- **2 agents** — Chief of Staff + Vision Agent with capabilities
- **8 skill definitions** — review-brief, quarterly-planning, alignment-review, annual-review, goal-gap-review, monthly-review, weekly-checkin, life-vision-refresh
- **Vault schema** — vault-structure.json
- **Demo vault** — pre-populated with Alex Rivera synthetic data

## What's Paid ($29)

**[Get AI Ready Life: Vision on Gumroad → $29](https://fruverse.gumroad.com/l/aireadylife-vision)**

Includes:
- Full agent instructions (120+ lines with strategic planning and life design expertise)
- Onboarding guide for building your life vision document and first quarterly OKRs
- 60+ vision prompts covering life scorecard, goal alignment, and quarterly planning
- Configuration templates for 13-domain scorecard, OKR framework, and alignment reviews

## Install

```bash
npx companies.sh add fru-dev3/aireadyu-life/vision --include plugin,agents,skills
```

## The Agents

| Agent | Title | Budget |
|-------|-------|--------|
| Chief of Staff | Life Operations Director | $30/mo |
| Vision Agent | Chief Strategy Officer | $20/mo |

## The 8 Skills

| Skill | Cadence | Produces |
|-------|---------|---------|
| `aireadylife-vision-review-brief` | Monthly | Vision brief — 13-domain scorecard, top 3 at-risk goals, alignment flags |
| `aireadylife-vision-quarterly-planning` | Quarterly | Structured quarterly review and OKRs for next quarter |
| `aireadylife-vision-alignment-review` | Monthly | Calendar vs. priorities gap analysis |
| `aireadylife-vision-annual-review` | Annual | Full year-in-review and 1-year vision reset |
| `aireadylife-vision-goal-gap-review` | Monthly | Goal trajectory analysis — on track vs. at-risk goals |
| `aireadylife-vision-monthly-review` | Monthly | Monthly life scorecard across all 13 domains |
| `aireadylife-vision-weekly-checkin` | Weekly | Weekly pulse — top priorities and progress |
| `aireadylife-vision-life-vision-refresh` | Quarterly | Values and vision document review and update |

## MCP Integration (Claude.ai)

```bash
# Add to Claude.ai → Settings → Integrations
npx -y @aireadylife/vision-plugin

# Run in demo mode first
VAULT_MODE=demo npx -y @aireadylife/vision-plugin
```
