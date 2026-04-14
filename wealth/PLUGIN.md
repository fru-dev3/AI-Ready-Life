---
name: AI Ready Life: Wealth
description: >
  2 AI agents that manage your personal wealth — net worth tracking, investment
  performance, cash flow analysis, and estate planning oversight.
  Orchestrated by a Chief of Staff. Includes 21 wealth skills.
  Full agent instructions and demo vault available on Gumroad.
slug: aireadylife-wealth
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: fru.dev
goals:
  - Give you a proactive AI wealth partner that tracks your complete financial picture
  - Monitor net worth, cash flow, and investment performance month over month
  - Keep all financial data private and local — never sent to any external service
---

# AI Ready Life: Wealth

**2 agents. 21 skills. Monthly synthesis. Private. On your machine.**

Your personal AI wealth partner. The Wealth Agent tracks your net worth across all accounts, monitors investment performance, analyzes cash flow, flags unusual movements, and manages estate planning documents. The Chief of Staff coordinates with your other life plugins.

## What's Free

- **2 agents** — Chief of Staff + Wealth Agent with capabilities
- **21 skill definitions** — monthly-synthesis, review-brief, finance-daily-scan, finance-monthly-sync, estate-annual-review, liquidity-review, and 15 more
- **Vault schema** — vault-structure.json
- **Demo vault** — pre-populated with Alex Rivera synthetic data

## What's Paid ($29)

**[Get AI Ready Life: Wealth on Gumroad → $29](https://frudev.gumroad.com/l/aireadylife-wealth)**

Includes:
- Full agent instructions with wealth management expertise
- Onboarding guide for connecting your financial institutions
- 60+ wealth prompts covering investments, cash flow, estate, and planning
- Configuration templates for all major brokerages and banks

## Install

```bash
npx companies.sh add fru-dev3/aireadyu-life/wealth --include plugin,agents,skills
```

## The Agents

| Agent | Title | Budget |
|-------|-------|--------|
| Chief of Staff | Life Operations Director | $30/mo |
| Wealth Agent | Chief Capital Officer | $20/mo |

## MCP Integration (Claude.ai)

```bash
npx -y @aireadylife/wealth-plugin
VAULT_MODE=demo npx -y @aireadylife/wealth-plugin
```
