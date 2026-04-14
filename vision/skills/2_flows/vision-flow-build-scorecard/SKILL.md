---
name: arlive-vision-flow-build-scorecard
type: flow
trigger: called-by-op
description: >
  Assembles a domain-by-domain life scorecard with score (1-10), trend indicator,
  open loop count, and 1-line status per installed plugin. Scores are derived from
  open loop velocity and milestone activity.
---

# arlive-vision-build-scorecard

**Trigger:** Called by `arlive-vision-monthly-scorecard`
**Produces:** A structured scorecard object with per-domain scores, trend indicators, and status notes returned to the calling op for report formatting.

## What it does

Collects data from every installed plugin vault to build the monthly life scorecard. For each installed plugin domain (health, wealth, tax, career, estate, insurance, content, calendar), reads the `open-loops.md` file to get two counts: items added this month (new flags surfaced) and items resolved this month (flags marked complete). The resolution ratio is the primary scoring input — a domain resolving more loops than it accumulates is trending positively. Reads `vault/vision/00_goals/` for any milestones logged in the current month per domain — each logged milestone adds positive weight to the score. For domains with active OKRs, checks the current key result progress percentages from the most recent `arlive-vision-score-domain-progress` run. Combines these inputs into a 1-10 score using a weighted formula: resolution ratio (50% weight), OKR pace (30% weight), milestone count (20% weight). Calculates trend by comparing this month's score to last month's: +1 or more = improving (↑), within 1 point = stable (→), -1 or more = declining (↓). Generates a 1-line status note for each domain that explains the score in plain language. Returns the full scorecard data structure to the calling op.

## Steps

1. Read `open-loops.md` from each installed plugin vault
2. Count items added this month and items resolved this month per domain
3. Read `vault/vision/00_goals/` for milestones logged in current month, categorized by domain
4. Pull current OKR progress percentages from vault/vision/01_okrs/ for each domain
5. Calculate per-domain score using weighted formula: resolution ratio (50%), OKR pace (30%), milestones (20%)
6. Compare to prior month scores and assign trend indicators (↑ → ↓)
7. Generate 1-line plain-language status note per domain
8. Return full scorecard data structure to calling op

## Apps

vault file system

## Vault Output

`vault/vision/02_scorecard/`
