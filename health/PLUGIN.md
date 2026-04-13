---
name: AI Ready Life: Health
description: >
  2 AI agents that manage your personal health — wellness tracking, lab review,
  medication monitoring, appointment management, and insurance/HSA oversight.
  Orchestrated by a Chief of Staff. Includes 11 health skills.
  Full agent instructions and demo vault available on Gumroad.
slug: aireadylife-health
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: fru.dev
goals:
  - Give you a proactive AI health partner that tracks your full wellness picture
  - Monitor labs, medications, and preventive care gaps so nothing falls through
  - Keep all health data private and local — never sent to any external service
---

# AI Ready Life: Health

**2 agents. 11 skills. Monthly reviews. Private. On your machine.**

Your personal AI health partner. The Health Agent tracks your wellness score, flags lab anomalies, monitors medication refills, watches your HSA balance, and schedules preventive care. The Chief of Staff coordinates with your other life plugins.

## What's Free

- **2 agents** — Chief of Staff + Health Agent with capabilities
- **11 skill definitions** — review-brief, monthly-sync, lab-review, medication-review, wellness-review, cost-review, anomaly-watch, appointment-review, preventive-care-review, insurance-readiness, document-completeness
- **Vault schema** — vault-structure.json
- **Demo vault** — pre-populated with Alex Rivera synthetic data

## What's Paid ($29)

**[Get AI Ready Life: Health on Gumroad → $29](https://fruverse.gumroad.com/l/aireadylife-health)**

Includes:
- Full agent instructions (100+ lines with health domain expertise)
- Onboarding guide for connecting your providers, labs, and insurance
- 50+ health prompts covering wellness, labs, medications, and preventive care
- Configuration templates for all major health portals

## Install

```bash
npx companies.sh add fru-dev3/aireadyu-life/health --include plugin,agents,skills
```

## The Agents

| Agent | Title | Budget |
|-------|-------|--------|
| Chief of Staff | Life Operations Director | $30/mo |
| Health Agent | Chief Medical Officer | $20/mo |

## The 11 Skills

| Skill | Cadence | Produces |
|-------|---------|---------|
| `arlive-health-review-brief` | Monthly | Health review brief |
| `arlive-health-monthly-sync` | Monthly | Refreshed vault |
| `arlive-health-lab-review` | On-demand | Lab analysis |
| `arlive-health-medication-review` | Monthly | Refill status |
| `arlive-health-wellness-review` | Monthly | Wellness score |
| `arlive-health-cost-review` | Monthly | Cost + HSA status |
| `arlive-health-anomaly-watch` | Weekly | Anomaly flags |
| `arlive-health-appointment-review` | Monthly | Upcoming care |
| `arlive-health-preventive-care-review` | Monthly | Gap analysis |
| `arlive-health-insurance-readiness` | Quarterly | Coverage review |
| `arlive-health-document-completeness` | Quarterly | Doc audit |

## MCP Integration (Claude.ai)

```bash
# Add to Claude.ai → Settings → Integrations
npx -y @aireadylife/health-plugin

# Run in demo mode first
VAULT_MODE=demo npx -y @aireadylife/health-plugin
```
