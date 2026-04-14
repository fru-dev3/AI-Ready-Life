---
name: AI Ready Life: Career
description: >
  2 AI agents that manage your career — compensation benchmarking, job market scanning,
  application pipeline, skills gap analysis, and network outreach.
  Orchestrated by a Chief of Staff. Includes 10 career skills.
  Full agent instructions and demo vault available on Gumroad.
slug: aireadylife-career
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: fru.dev
goals:
  - Keep you informed about your market value and career trajectory at all times
  - Build and maintain an active professional network without manual effort
  - Surface the right opportunities before you need them
---

# AI Ready Life: Career

**2 agents. 10 skills. Monthly reviews. Private. On your machine.**

Your personal AI career partner. The Career Agent benchmarks your comp against market, scans for target roles, manages your application pipeline, identifies skills gaps, and prepares outreach for warm contacts.

## What's Free

- **2 agents** — Chief of Staff + Career Agent
- **10 skill definitions** — review-brief, monthly-sync, comp-review, market-review, application-review, skills-gap-review, network-review, outreach-review, income-review, document-review
- **Vault schema** — vault-structure.json
- **Demo vault** — Alex Rivera synthetic career data

## What's Paid ($29)

**[Get AI Ready Life: Career on Gumroad → $29](https://frudev.gumroad.com/l/aireadylife-career)**

## Install

```bash
npx companies.sh add fru-dev3/aireadyu-life/career --include plugin,agents,skills
```

## MCP Integration

```bash
npx -y @aireadylife/career-plugin
VAULT_MODE=demo npx -y @aireadylife/career-plugin
```
