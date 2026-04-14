---
name: AI Ready Life: Complete
description: >
  All 20 domain plugins in one bundle — health, wealth, tax, career, benefits,
  brand, business, chief, calendar, content, estate, explore, home, insurance,
  intel, learning, real-estate, records, social, and vision. Coordinated by a
  Chief of Life agent. 21 agents, 260+ skills, one vault.
slug: aireadylife-complete
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: fru.dev
goals:
  - Give you a complete AI operating system for your personal life
  - Coordinate across every life domain so nothing gets siloed or missed
  - One Chief of Life agent knows the state of your entire life at all times
---

# AI Ready Life: Complete

**21 agents. 260+ skills. All 20 domains. One vault.**

The complete AI operating system for your personal life. Every domain — health, wealth, tax, career, benefits, brand, business, personal, calendar, content, estate, travel, home, insurance, intelligence, learning, real estate, records, social, and vision — managed by a dedicated AI agent and coordinated by your Chief of Life.

## What's Free

- **21 agent definitions** — Chief of Life + 20 domain agents
- **260+ skill definitions** — ops, flows, tasks, and app integrations for every domain
- **Vault schema** — vault-structure.json for all 20 domains
- **Demo vault** — Alex Rivera synthetic data across all domains

## What's Paid ($199)

**[Get AI Ready Life: Complete on Gumroad → $199](https://fruverse.gumroad.com/l/aireadylife-complete)**

Everything from all 20 individual plugins, plus:
- Full agent instructions for all 21 agents (2,000+ lines of domain expertise)
- Cross-domain coordination playbook for the Chief of Life
- Onboarding guide for connecting all apps and portals
- 1,000+ prompts covering every life domain
- Configuration templates for 60+ apps and portals

**Save $381 vs. buying all 20 individual plugins separately** (value: $580 at $29 each)

## All 20 Domains

| Domain | Skills | Description |
|--------|--------|-------------|
| Health | 17 | Wellness, labs, medications, appointments, insurance |
| Wealth | 17 | Net worth, investments, cash flow, estate planning |
| Tax | 17 | Deadlines, estimates, deductions, filing, entity compliance |
| Career | 17 | Compensation, job search, market scanning, skills gaps |
| Benefits | 16 | Open enrollment, HSA, 401k, equity, ESPP |
| Brand | 15 | Online presence, reputation, content performance |
| Business | 13 | P&L, invoicing, contractors, entity management |
| Personal (Ben) | 12 | Inbox, tasks, personal admin, priorities |
| Calendar | 13 | Event intelligence, deadlines, scheduling |
| Content | 13 | Publishing, analytics, audience growth |
| Estate | 13 | Rental properties, leases, maintenance, cash flow |
| Travel (Explore) | 11 | Trip planning, visa tracking, loyalty rewards |
| Home | 12 | Maintenance, contractors, home value tracking |
| Insurance | 12 | Policy coverage, renewals, claims tracking |
| Intelligence | 11 | News monitoring, research, market signals |
| Learning | 11 | Courses, reading, skill development |
| Real Estate | 11 | Market data, mortgage tracking, home search |
| Records | 11 | Document vault, password health, data organization |
| Social | 11 | Relationships, outreach, network health |
| Vision | 12 | Goals, OKRs, annual review, life planning |

## The Chief of Life

The Chief of Life is your master coordinator. Every week it polls all 20 domain agents, surfaces the most important actions across your entire life, and ensures nothing slips through the cracks between domains.

| Agent | Title | Budget |
|-------|-------|--------|
| Chief of Life | Life Operating Officer | $50/mo |
| Health Agent | Chief Medical Officer | $20/mo |
| Wealth Agent | Chief Financial Officer | $20/mo |
| Tax Agent | Chief Tax Officer | $20/mo |
| Career Agent | Chief Career Officer | $20/mo |
| Benefits Agent | Benefits Director | $15/mo |
| Brand Agent | Brand Director | $15/mo |
| Business Agent | Business Director | $15/mo |
| Ben Agent | Personal Chief of Staff | $15/mo |
| Calendar Agent | Calendar Director | $15/mo |
| Content Agent | Content Director | $15/mo |
| Estate Agent | Estate Manager | $15/mo |
| Explore Agent | Travel Director | $10/mo |
| Home Agent | Home Manager | $10/mo |
| Insurance Agent | Insurance Director | $10/mo |
| Intel Agent | Intelligence Director | $10/mo |
| Learning Agent | Learning Director | $10/mo |
| Real Estate Agent | Real Estate Director | $10/mo |
| Records Agent | Records Director | $10/mo |
| Social Agent | Social Director | $10/mo |
| Vision Agent | Vision Director | $10/mo |

## MCP Integration (Claude.ai)

```bash
# Add to Claude.ai → Settings → Integrations
npx -y @aireadylife/complete-plugin

# Run in demo mode first
VAULT_MODE=demo npx -y @aireadylife/complete-plugin
```

## Install

```bash
npx companies.sh add fru-dev3/aireadyu-life/complete --include plugin,agents,skills
```
