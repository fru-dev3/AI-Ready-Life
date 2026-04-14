---
name: AI Ready Life: Estate
description: >
  2 AI agents that manage your rental property portfolio — cash flow tracking,
  tenant management, maintenance, insurance, property tax, and investment performance.
  13 skills. For individual real estate investors.
slug: aireadylife-estate
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: fru.dev
goals:
  - Know your exact cash flow and equity position for every property at all times
  - Never miss a property tax deadline, insurance renewal, or lease expiration
  - Keep maintenance organized so small issues don't become expensive emergencies
---

# AI Ready Life: Estate

**2 agents. 13 skills. Weekly syncs. For rental property investors.**

Tracks cash flow, maintenance, tenant status, insurance, and property tax across your entire rental portfolio.

## What's Free

- **2 agents** — Chief of Staff + Estate Agent
- **13 skills** — review-brief, monthly-synthesis, cash-flow-review, maintenance-review, tenant-review, valuation-review, insurance-review, property-tax-watch, tax-readiness, document-completeness-review, monthly-sync, portfolio-review, weekly-sync
- **Vault schema** + **Demo vault** (Alex Rivera single-property portfolio)

## What's Paid ($29)

**[Get AI Ready Life: Estate on Gumroad → $29](https://fruverse.gumroad.com/l/aireadylife-estate)**

Includes:
- Full agent instructions with real estate domain expertise
- Onboarding guide for connecting properties, servicers, and tenant management
- 50+ real estate prompts covering cash flow, maintenance, and tax readiness
- Configuration templates for single-property to multi-property portfolios

## Install

```bash
npx companies.sh add fru-dev3/aireadyu-life/estate --include plugin,agents,skills
```

## The Agents

| Agent | Title | Budget |
|-------|-------|--------|
| Chief of Staff | Life Operations Director | $30/mo |
| Estate Agent | Real Estate Portfolio Manager | $20/mo |

## The 13 Skills

| Skill | Cadence | Produces |
|-------|---------|---------|
| `aireadylife-estate-review-brief` | Monthly | Portfolio review brief |
| `aireadylife-estate-monthly-synthesis` | Monthly | Cash flow + equity synthesis |
| `aireadylife-estate-cash-flow-review` | Monthly | NOI and net cash flow per property |
| `aireadylife-estate-maintenance-review` | Monthly | Open maintenance items |
| `aireadylife-estate-tenant-review` | Monthly | Payment history + lease alerts |
| `aireadylife-estate-valuation-review` | Quarterly | Market value + equity update |
| `aireadylife-estate-insurance-review` | Annually | Coverage adequacy review |
| `aireadylife-estate-property-tax-watch` | Monthly | Upcoming tax deadlines |
| `aireadylife-estate-tax-readiness` | Annually | Schedule E prep checklist |
| `aireadylife-estate-document-completeness-review` | Quarterly | Document audit |
| `aireadylife-estate-monthly-sync` | Monthly | Vault refresh |
| `aireadylife-estate-portfolio-review` | Quarterly | Portfolio performance |
| `aireadylife-estate-weekly-sync` | Weekly | Rent + maintenance status |

## MCP Integration (Claude.ai)

```bash
VAULT_MODE=demo npx -y @aireadylife/estate-plugin
```
