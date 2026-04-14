---
name: AI Ready Life: Business
description: >
  2 AI agents — Chief of Staff + Chief Corporate Officer. Track LLC/entity revenue and expenses,
  stay ahead of compliance deadlines, and keep your books organized. 10 skills.
slug: aireadylife-business
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: fru.dev
goals:
  - Track LLC and entity revenue and expenses with monthly P&L clarity
  - Stay ahead of compliance deadlines — annual reports, registered agent, EIN docs
  - Keep books organized and tax-ready throughout the year
---

# AI Ready Life: Business

**2 agents. 10 skills. Business operations clarity.**

Never miss an LLC annual report. Know your P&L every month. Stay ahead of compliance before deadlines sneak up.

## What's Free

- **2 agent definitions** — Chief of Staff + Chief Corporate Officer
- **10 skill definitions** — revenue, expenses, compliance, payroll, contracts, and more
- **Vault schema** — vault-structure.json
- **Demo vault** — Alex Rivera Consulting LLC synthetic state

## What's Paid ($29)

**[Get AI Ready Life: Business on Gumroad → $29](https://fruverse.gumroad.com/l/aireadylife-business)**

Includes full agent instructions, P&L templates, compliance calendar by state, S-corp election analysis rules, and 40+ business management prompts.

## Install

```bash
npx companies.sh add fru-dev3/aireadyu-life/business --include plugin,agents,skills
```

## MCP Integration

```bash
npx -y @aireadylife/business-plugin
VAULT_MODE=demo npx -y @aireadylife/business-plugin
```

## The 10 Skills

| Skill | Cadence | Produces |
|-------|---------|---------|
| `aireadylife-business-review-brief` | Monthly | Business brief — revenue, expenses, P&L, compliance |
| `aireadylife-business-revenue-review` | Monthly | Revenue by stream, invoicing status, YTD totals |
| `aireadylife-business-expense-review` | Monthly | Expenses by category, deductibility review |
| `aireadylife-business-compliance-review` | Quarterly | Annual report deadlines, registered agent status |
| `aireadylife-business-tax-readiness` | Quarterly | Estimated tax set-aside, quarterly payment prep |
| `aireadylife-business-monthly-synthesis` | Monthly | Full P&L synthesis with compliance calendar check |
| `aireadylife-business-annual-filing-watch` | Jan-Apr | Monitor state annual report and federal filing deadlines |
| `aireadylife-business-banking-review` | Monthly | Business account reconciliation and cash flow review |
| `aireadylife-business-contract-review` | Quarterly | Active contract status, renewal dates, SOW milestones |
| `aireadylife-business-payroll-review` | Monthly | Owner distributions, contractor payments, 1099 prep |
