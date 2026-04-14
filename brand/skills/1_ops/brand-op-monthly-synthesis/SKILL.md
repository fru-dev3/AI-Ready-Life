---
name: arlive-brand-op-monthly-synthesis
type: op
cadence: monthly
description: >
  Monthly brand synthesis. Aggregates cross-platform analytics into a unified brand health score.
  Triggers: "brand synthesis", "brand score", "monthly brand report", "brand analytics summary".
---

# arlive-brand-monthly-synthesis

**Cadence:** Monthly (end of month)
**Produces:** Unified brand health score and cross-platform analytics synthesis

## What it does

Aggregates monthly metrics from all platforms (LinkedIn, Twitter/X, YouTube, newsletter). Computes a brand health score (0-100) based on: follower growth, engagement rate, profile consistency, content cadence, and mention sentiment. Highlights trends (up/down) vs prior month.

## Scoring Rubric

- Profile consistency (all platforms): 25 pts
- Content cadence (publishing regularly): 25 pts
- Follower growth (positive MoM): 25 pts
- Mention sentiment (% positive): 25 pts

## Vault Output

`vault/brand/01_analytics/synthesis-YYYY-MM.md`
