---
name: AI Ready Life: Records
description: >
  1 AI agent that manages your document inventory and subscriptions — tracks expiring
  IDs, memberships, and subscriptions to cancel, and maintains a complete document
  checklist. 2 skills.
  Full agent instructions and demo vault available on Gumroad.
slug: aireadylife-records
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: fru.dev
goals:
  - Give you a proactive AI records keeper that tracks all your important documents
  - Flag expiring IDs and subscriptions before they become urgent
  - Keep all records data private and local — never sent to any external service
---

# AI Ready Life: Records

**1 agent. 2 skills. Monthly reviews. Private. On your machine.**

Your personal AI Records Director. Maintains a master inventory of all important documents (IDs, licenses, certificates, legal docs) with expiration dates, tracks all active subscriptions with renewal dates and cost, flags documents expiring within 90 days, surfaces subscription cancellation opportunities, and produces monthly records briefs.

## What's Free

- **1 agent** — Records Agent with capabilities
- **2 skill definitions** — review-brief, monthly-sync
- **Vault schema** — vault-structure.json
- **Demo vault** — pre-populated with Alex Rivera synthetic data

## What's Paid ($19)

**[Get AI Ready Life: Records on Gumroad → $19](https://fruverse.gumroad.com/l/aireadylife-records)**

Includes:
- Full agent instructions (70+ lines with document management and subscription tracking expertise)
- Onboarding guide for building your complete document inventory
- 25+ records prompts covering ID management, legal docs, and subscription audits
- Configuration templates for all document categories and subscription tracking

## Install

```bash
npx companies.sh add fru-dev3/aireadyu-life/records --include plugin,agents,skills
```

## The Agents

| Agent | Title | Budget |
|-------|-------|--------|
| Records Agent | Records Director | $20/mo |

## The 2 Skills

| Skill | Cadence | Produces |
|-------|---------|---------|
| `arlive-records-review-brief` | Monthly | Records brief — expiring documents, subscription cost review, document gaps |
| `arlive-records-monthly-sync` | Monthly | Checks expiration dates and reviews subscription costs |

## MCP Integration (Claude.ai)

```bash
# Add to Claude.ai → Settings → Integrations
npx -y @aireadylife/records-plugin

# Run in demo mode first
VAULT_MODE=demo npx -y @aireadylife/records-plugin
```
