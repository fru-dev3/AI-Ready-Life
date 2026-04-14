---
name: AI Ready Life: Content
description: >
  2 AI agents that manage your content business — YouTube analytics, newsletter metrics,
  LinkedIn growth, Gumroad revenue, SEO priorities, and publishing schedule.
  10 skills. Built for solo content creators.
slug: aireadylife-content
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: fru.dev
goals:
  - Give you a single view of all content revenue and growth across every platform
  - Surface SEO and thumbnail opportunities to improve every video
  - Keep your publishing schedule filled and never let a week go dark
---

# AI Ready Life: Content

**2 agents. 10 skills. Weekly and monthly reviews. For solo content creators.**

Tracks YouTube channels, newsletters, LinkedIn, and digital product revenue in one place.

## What's Free

- **2 agents** — Chief of Staff + Content Agent
- **10 skills** — review-brief, monthly-synthesis, audience-review, revenue-review, seo-review, schedule-review, thumbnail-review, newsletter-review, linkedin-review, weekly-review
- **Vault schema** + **Demo vault** (Alex Rivera YouTube + newsletter data)

## What's Paid ($29)

**[Get AI Ready Life: Content on Gumroad → $29](https://frudev.gumroad.com/l/aireadylife-content)**

Includes:
- Full agent instructions with content domain expertise
- Onboarding guide for connecting YouTube, Beehiiv, LinkedIn, and Gumroad
- 50+ content prompts covering analytics, SEO, thumbnails, and revenue
- Configuration templates for all major content platforms

## Install

```bash
npx companies.sh add fru-dev3/aireadyu-life/content --include plugin,agents,skills
```

## The Agents

| Agent | Title | Budget |
|-------|-------|--------|
| Chief of Staff | Life Operations Director | $30/mo |
| Content Agent | Content Director | $20/mo |

## The 10 Skills

| Skill | Cadence | Produces |
|-------|---------|---------|
| `aireadylife-content-review-brief` | Monthly | Content review brief |
| `aireadylife-content-monthly-synthesis` | Monthly | Revenue + growth synthesis |
| `aireadylife-content-audience-review` | Monthly | Audience growth analysis |
| `aireadylife-content-revenue-review` | Monthly | Revenue breakdown |
| `aireadylife-content-seo-review` | Monthly | SEO + title opportunities |
| `aireadylife-content-schedule-review` | Weekly | Publishing schedule health |
| `aireadylife-content-thumbnail-review` | On-demand | Thumbnail CTR audit |
| `aireadylife-content-newsletter-review` | Monthly | Newsletter metrics |
| `aireadylife-content-linkedin-review` | Monthly | LinkedIn growth review |
| `aireadylife-content-weekly-review` | Weekly | 7-day performance + gaps |

## MCP Integration (Claude.ai)

```bash
# Run in demo mode first
VAULT_MODE=demo npx -y @aireadylife/content-plugin

# Add to Claude.ai → Settings → Integrations
npx -y @aireadylife/content-plugin
```
