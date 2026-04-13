---
name: AI Ready Life: Benefits
description: >
  2 AI agents — Chief of Staff + Benefits Director. Maximize your 401k match,
  HSA triple-tax advantage, and coverage optimization. 10 skills covering
  401k, HSA, health/dental/vision, open enrollment, and total compensation.
slug: aireadylife-benefits
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: fru.dev
goals:
  - Maximize 401k employer match — never leave free money on the table
  - Capture the HSA triple-tax advantage through proactive contribution and investment tracking
  - Optimize coverage (health, dental, vision, life) relative to actual utilization and cost
---

# AI Ready Life: Benefits

**2 agents. 10 skills. Benefits clarity year-round.**

Stop guessing whether you're capturing your full employer match. Know your HSA balance and investment threshold at all times. Get open enrollment prep before the window opens.

## What's Free

- **2 agent definitions** — Chief of Staff + Benefits Director
- **10 skill definitions** — 401k, HSA, coverage, enrollment, total comp, and more
- **Vault schema** — vault-structure.json
- **Demo vault** — Alex Rivera synthetic benefits state

## What's Paid ($29)

**[Get AI Ready Life: Benefits on Gumroad → $29](https://fruverse.gumroad.com/l/aireadylife-benefits)**

Includes full agent instructions, 401k match calculation rules, HSA investment threshold logic, coverage comparison templates, and 40+ benefits prompts.

## Install

```bash
npx companies.sh add fru-dev3/aireadyu-life/benefits --include plugin,agents,skills
```

## MCP Integration

```bash
npx -y @aireadylife/benefits-plugin
VAULT_MODE=demo npx -y @aireadylife/benefits-plugin
```

## The 10 Skills

| Skill | Cadence | Produces |
|-------|---------|---------|
| `arlive-benefits-review-brief` | Monthly | Benefits brief — 401k status, HSA balance, coverage flags |
| `arlive-benefits-401k-review` | Monthly | 401k contribution rate, match capture, YTD, allocation |
| `arlive-benefits-hsa-review` | Monthly | HSA balance, investment threshold, YTD contributions |
| `arlive-benefits-coverage-review` | Quarterly | Coverage adequacy review vs. actual utilization |
| `arlive-benefits-annual-enrollment` | Annual | Open enrollment preparation and comparison |
| `arlive-benefits-contribution-review` | Quarterly | Optimize contribution rates across all benefit accounts |
| `arlive-benefits-open-enrollment-watch` | Oct-Nov | Monitor and alert when enrollment window opens |
| `arlive-benefits-monthly-sync` | Monthly | Sync benefit account balances from statements |
| `arlive-benefits-document-completeness` | Annual | Verify all benefit documents are stored in vault |
| `arlive-benefits-total-comp-review` | Annual | Full total compensation analysis including all benefits |
