---
name: arlive-career-comp-review
type: op
cadence: quarterly
description: >
  Quarterly total comp vs. market benchmarking; compares current TC to market
  P25/P50/P75 for role, level, and location. Triggers: "comp review", "am I paid
  fairly", "check my salary vs market".
---

# arlive-career-comp-review

**Cadence:** Quarterly (1st of Jan, Apr, Jul, Oct)
**Produces:** Comp benchmarking summary in vault/career/04_briefs/, comp gap flags in vault/career/open-loops.md

## What it does

Runs quarterly to give a clear, data-backed picture of where your total compensation sits relative to the current market for your role, level, and geography. It calls `arlive-career-build-comp-summary` to read your current TC breakdown (base salary, annual bonus target, RSU/equity value, benefits) from vault/career/02_compensation/ and compares it to market data from Levels.fyi, Glassdoor, Blind, and LinkedIn Salary for your specific role and metro area. The output shows your TC relative to market P25, P50, and P75. When your TC falls below market P50, `arlive-career-flag-comp-gap` is called to log the gap amount, the recommended market range, and an action plan (negotiate at next review, explore the market, or target a promotion to increase level). This quarterly cadence catches market drift before it compounds into a large gap.

## Calls

- **Flows:** `arlive-career-build-comp-summary`
- **Tasks:** `arlive-career-flag-comp-gap`, `arlive-career-update-open-loops`

## Apps

Levels.fyi, Glassdoor, LinkedIn Salary

## Vault Output

`vault/career/04_briefs/`
