---
name: AI Ready Life: Ben
description: >
  1 AI agent — your personal Chief of Staff. Orchestrates all other life plugins,
  synthesizes daily briefs across every domain, syncs Notion tasks, and monitors
  the health of your entire AI life OS. 4 skills. Requires other plugins to be meaningful.
slug: aireadylife-ben
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: fru.dev
goals:
  - Give you a single daily executive briefing across every domain of your life
  - Orchestrate all other AI Ready Life plugins into a coherent system
  - Surface what matters, suppress what doesn't, and keep your day on track
---

# AI Ready Life: Ben

**1 agent. 4 skills. Daily briefs. The control plane for your entire AI life OS.**

Ben is your Chief of Staff. Every morning he pulls from all installed life plugins, synthesizes a unified brief, and tells you exactly what needs your attention. Every evening he closes the loop.

## What's Free

- **1 agent** — Chief of Staff with full orchestration capabilities
- **4 skill definitions** — morning-brief, evening-brief, notion-sync, system-health
- **Vault schema** — vault-structure.json
- **Demo vault** — Alex Rivera synthetic morning brief

## What's Paid ($29)

**[Get AI Ready Life: Ben on Gumroad → $29](https://fruverse.gumroad.com/l/aireadylife-ben)**

Includes full agent instructions, domain alert routing rules, Notion sync configuration, and 30+ orchestration prompts.

**Note:** Install other plugins first — Ben's value scales with how many domains are active.

## Install

```bash
npx companies.sh add fru-dev3/aireadyu-life/ben --include plugin,agents,skills
```

## MCP Integration

```bash
npx -y @aireadylife/ben-plugin
VAULT_MODE=demo npx -y @aireadylife/ben-plugin
```

## The 4 Skills

| Skill | Cadence | Produces |
|-------|---------|---------|
| `arlive-ben-morning-brief` | Daily 7am | Executive AM brief across all domains |
| `arlive-ben-evening-brief` | Daily 8pm | Day close + next-day prep |
| `arlive-ben-notion-sync` | Daily | Notion task sync from all agents |
| `arlive-ben-system-health` | Weekly | Agent health + vault completeness check |
