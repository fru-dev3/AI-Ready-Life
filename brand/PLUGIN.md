---
name: AI Ready Life: Brand
description: >
  2 AI agents — Chief of Staff + Brand Director. Consistent brand presence across all platforms,
  mention monitoring, analytics tracking, and monthly brand synthesis reports. 8 skills.
slug: aireadylife-brand
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: fru.dev
goals:
  - Maintain consistent brand presence across all social platforms
  - Monitor mentions and reputation in real time
  - Track analytics and surface brand health trends monthly
---

# AI Ready Life: Brand

**2 agents. 8 skills. Brand clarity every month.**

Know your brand health score. Catch inconsistent bios before a recruiter does. Surface every mention, track every metric, and get a unified cross-platform brand report every month.

## What's Free

- **2 agent definitions** — Chief of Staff + Brand Director
- **8 skill definitions** — analytics, mentions, profile consistency, monthly synthesis, and more
- **Vault schema** — vault-structure.json
- **Demo vault** — Alex Rivera synthetic brand state

## What's Paid ($29)

**[Get AI Ready Life: Brand on Gumroad → $29](https://frudev.gumroad.com/l/aireadylife-brand)**

Includes full agent instructions, platform-by-platform audit checklists, sentiment classification rules, brand scoring rubric, and 35+ brand management prompts.

## Install

```bash
npx companies.sh add fru-dev3/aireadyu-life/brand --include plugin,agents,skills
```

## MCP Integration

```bash
npx -y @aireadylife/brand-plugin
VAULT_MODE=demo npx -y @aireadylife/brand-plugin
```

## The 8 Skills

| Skill | Cadence | Produces |
|-------|---------|---------|
| `aireadylife-brand-review-brief` | Monthly | Brand brief — consistency score, mentions, analytics |
| `aireadylife-brand-analytics-review` | Monthly | Cross-platform follower, view, and engagement metrics |
| `aireadylife-brand-mention-review` | Weekly | Mention log with sentiment classification |
| `aireadylife-brand-profile-consistency-review` | Quarterly | Bio, headshot, and URL audit across all platforms |
| `aireadylife-brand-monthly-synthesis` | Monthly | Unified brand health score across all platforms |
| `aireadylife-brand-asset-review` | Quarterly | Headshots, logos, bio copy freshness check |
| `aireadylife-brand-guidelines-review` | Annual | Brand voice, visual identity, and guidelines audit |
| `aireadylife-brand-search-review` | Monthly | Search presence review — Google, LinkedIn, YouTube |
