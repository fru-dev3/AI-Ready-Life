---
name: arlive-career-build-skills-gap-summary
type: flow
trigger: called-by-op
description: >
  Compares the current skills inventory to target role requirements and identifies
  the top 3-5 priority skills ranked by market demand and time to close.
---

# arlive-career-build-skills-gap-summary

**Trigger:** Called by `arlive-career-skills-gap-review`
**Produces:** Skills gap analysis in vault/career/03_skills/ with prioritized learning recommendations

## What it does

Reads the current skills inventory from vault/career/03_skills/ — which stores each skill with a self-assessed proficiency level (beginner/working/proficient/expert), years of experience, and recency of use — and reads the target role requirements compiled from the most recent market scan results in vault/career/. For each required skill listed in target role postings, the flow checks whether it appears in the inventory and at what proficiency. Skills that are absent or below "working" proficiency are classified as gaps. Each gap is scored by two dimensions: demand frequency (how often it appears across target postings, expressed as a percentage) and estimated time to working proficiency based on the nature of the skill. The top 3-5 gaps ranked by demand-times-urgency are output as a prioritized learning list with suggested resources (course platforms, projects, certifications).

## Steps

1. Read skills inventory from vault/career/03_skills/ with proficiency levels
2. Read target role requirements from market scan results in vault/career/
3. Identify gaps: required skills absent or below working proficiency
4. Score each gap by demand frequency across target postings
5. Rank top 3-5 gaps by demand score and output with learning resource suggestions

## Apps

None

## Vault Output

`vault/career/03_skills/`
