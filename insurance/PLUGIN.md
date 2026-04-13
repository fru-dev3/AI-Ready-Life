---
name: AI Ready Life: Insurance
description: >
  2 AI agents that manage all your insurance policies — health, life, auto, home/renters,
  umbrella, and more. Renewal tracking, coverage gap analysis, and claims management.
  9 skills.
slug: aireadylife-insurance
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: fru.dev
goals:
  - Never let an insurance policy lapse or renew without review
  - Identify coverage gaps before you need the insurance
  - Track all premiums in one place to find optimization opportunities
---

# AI Ready Life: Insurance

**2 agents. 9 skills. All policies in one place.**

Tracks every policy, monitors renewals, surfaces coverage gaps, and manages claims.

## What's Free

- **2 agents** — Chief of Staff + Insurance Agent
- **9 skills** — review-brief, coverage-review, claims-review, renewal-watch, gap-review, cost-review, property-review, document-completeness, monthly-sync
- **Vault schema** + **Demo vault** (Alex Rivera full policy set)

## What's Paid ($29)

**[Get AI Ready Life: Insurance on Gumroad → $29](https://fruverse.gumroad.com/l/aireadylife-insurance)**

Includes:
- Full agent instructions with insurance domain expertise
- Onboarding guide for loading all policy types
- 40+ insurance prompts covering coverage gaps, renewals, and claims
- Configuration templates for individual and family setups

## Install

```bash
npx companies.sh add fru-dev3/aireadyu-life/insurance --include plugin,agents,skills
```

## The Agents

| Agent | Title | Budget |
|-------|-------|--------|
| Chief of Staff | Life Operations Director | $30/mo |
| Insurance Agent | Chief Risk Officer | $20/mo |

## The 9 Skills

| Skill | Cadence | Produces |
|-------|---------|---------|
| `arlive-insurance-review-brief` | Monthly | Insurance review brief |
| `arlive-insurance-coverage-review` | Annually | Full coverage adequacy review |
| `arlive-insurance-claims-review` | Monthly | Active claims status |
| `arlive-insurance-renewal-watch` | Monthly | Policies renewing within 60 days |
| `arlive-insurance-gap-review` | Annually | Coverage gap analysis |
| `arlive-insurance-cost-review` | Annually | Premium optimization review |
| `arlive-insurance-property-review` | Annually | Property coverage audit |
| `arlive-insurance-document-completeness` | Quarterly | Policy document audit |
| `arlive-insurance-monthly-sync` | Monthly | Vault refresh |

## MCP Integration (Claude.ai)

```bash
VAULT_MODE=demo npx -y @aireadylife/insurance-plugin
```
