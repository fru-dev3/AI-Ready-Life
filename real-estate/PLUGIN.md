---
name: AI Ready Life: Real Estate
description: >
  1 AI agent focused on real estate market research — home purchase analysis,
  buy vs. rent decisions, market trends, and portfolio expansion strategy. 3 skills.
  Full agent instructions and demo vault available on Gumroad.
slug: aireadylife-realestate
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: fru.dev
goals:
  - Give you a proactive AI real estate analyst that monitors your target markets
  - Run buy vs. rent analysis and property evaluation to support smart acquisition decisions
  - Keep all market data and analysis private and local — never sent to any external service
---

# AI Ready Life: Real Estate

**1 agent. 3 skills. Monthly market updates. Private. On your machine.**

Your personal AI Real Estate Analyst. Monitors housing market trends in your target markets, runs buy vs. rent analysis for your current situation, tracks affordability metrics, evaluates potential investment properties against cash flow criteria, and surfaces market insights relevant to portfolio expansion decisions. Distinct from the Estate plugin (which manages existing rental properties) — this plugin is for research, acquisition strategy, and market intelligence.

## What's Free

- **1 agent** — Real Estate Agent with capabilities
- **3 skill definitions** — review-brief, monthly-sync, weekly-review
- **Vault schema** — vault-structure.json
- **Demo vault** — pre-populated with Alex Rivera synthetic data

## What's Paid ($19)

**[Get AI Ready Life: Real Estate on Gumroad → $19](https://frudev.gumroad.com/l/aireadylife-realestate)**

Includes:
- Full agent instructions (80+ lines with real estate analysis and market research expertise)
- Onboarding guide for configuring target markets and acquisition criteria
- 30+ real estate prompts covering market analysis, buy vs. rent, and property evaluation
- Configuration templates for portfolio strategy and target market criteria

## Install

```bash
npx companies.sh add fru-dev3/aireadyu-life/real-estate --include plugin,agents,skills
```

## The Agents

| Agent | Title | Budget |
|-------|-------|--------|
| Real Estate Agent | Real Estate Analyst | $20/mo |

## The 3 Skills

| Skill | Cadence | Produces |
|-------|---------|---------|
| `aireadylife-realestate-review-brief` | Monthly | Real estate brief — market conditions, portfolio expansion opportunities, buy vs. rent update |
| `aireadylife-realestate-monthly-sync` | Monthly | Pulls market data for target markets and updates affordability analysis |
| `aireadylife-realestate-weekly-review` | Weekly | Weekly market pulse — rate changes, new listings in target criteria |

## MCP Integration (Claude.ai)

```bash
# Add to Claude.ai → Settings → Integrations
npx -y @aireadylife/realestate-plugin

# Run in demo mode first
VAULT_MODE=demo npx -y @aireadylife/realestate-plugin
```
