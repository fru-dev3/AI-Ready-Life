---
name: AI Ready Life: Tax
description: >
  2 AI agents that manage your personal tax picture — deadline tracking, estimate
  calculations, deduction reviews, entity compliance, and accountant readiness.
  Orchestrated by a Chief of Staff. Includes 10 tax skills.
  Full agent instructions and demo vault available on Gumroad.
slug: aireadylife-tax
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: fru.dev
goals:
  - Keep you ahead of every tax deadline with no surprises
  - Maximize legitimate deductions through year-round tracking
  - Keep your accountant ready with organized documents at filing time
---

# AI Ready Life: Tax

**2 agents. 10 skills. Year-round tracking. Private. On your machine.**

Your personal AI tax partner. The Tax Agent monitors all deadlines, calculates quarterly estimates, reviews deductions, checks entity compliance, and prepares your accountant package at filing time.

## What's Free

- **2 agents** — Chief of Staff + Tax Agent
- **10 skill definitions** — review-brief, deadline-watch, document-sync, entity-compliance, filing-readiness, estimate-review, deduction-review, payment-watch, accountant-readiness, year-close
- **Vault schema** — vault-structure.json
- **Demo vault** — Alex Rivera synthetic tax data

## What's Paid ($29)

**[Get AI Ready Life: Tax on Gumroad → $29](https://frudev.gumroad.com/l/aireadylife-tax)**

## Install

```bash
npx companies.sh add fru-dev3/aireadyu-life/tax --include plugin,agents,skills
```

## MCP Integration

```bash
npx -y @aireadylife/tax-plugin
VAULT_MODE=demo npx -y @aireadylife/tax-plugin
```
