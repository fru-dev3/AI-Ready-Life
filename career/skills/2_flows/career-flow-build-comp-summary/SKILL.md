---
name: arlive-career-flow-build-comp-summary
type: flow
trigger: called-by-op
description: >
  Builds a total comp comparison showing your current TC vs. market P25/P50/P75
  for your role, level, and location.
---

# arlive-career-build-comp-summary

**Trigger:** Called by `arlive-career-comp-review`
**Produces:** Comp benchmarking table in vault/career/02_compensation/ with current TC and market percentile position

## What it does

Reads your current compensation breakdown from vault/career/02_compensation/ — base salary, annual bonus (target and actual), RSU grant value annualized, any signing bonus amortized, and key benefits (401k match value, health insurance premium value, other significant perks). Total compensation is calculated as the annualized sum of all components. Market benchmark data for your current role title, level, company tier, and metro area is pulled from configured sources (Levels.fyi for tech roles, Glassdoor for general, LinkedIn Salary for cross-validation). The flow outputs a comparison table showing your TC against P25, P50, and P75 for the market, identifies your percentile position, and calculates the gap or premium vs. P50. A time series of prior quarterly benchmarks is appended to show whether your market position has been improving or eroding.

## Steps

1. Read current comp breakdown from vault/career/02_compensation/
2. Calculate total annual compensation (base + bonus + equity + benefits value)
3. Pull market benchmark data for role, level, and metro area from configured sources
4. Calculate market P25, P50, P75 for total comp
5. Identify your percentile position and compute gap/premium vs. P50

## Apps

Levels.fyi, Glassdoor, LinkedIn Salary

## Vault Output

`vault/career/02_compensation/`
