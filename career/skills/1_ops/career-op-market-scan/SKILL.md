---
name: arlive-career-op-market-scan
type: op
cadence: monthly
description: >
  Monthly job market scan; searches target roles, companies, and compensation
  ranges to maintain current market awareness. Triggers: "market scan", "what
  jobs are out there", "check the job market for my role".
---

# arlive-career-market-scan

**Cadence:** Monthly (1st of month)
**Produces:** Market scan summary in vault/career/04_briefs/, interesting opportunity logs in vault/career/01_pipeline/

## What it does

Runs monthly to ensure you always have a current read on the external market for your target roles — whether or not you are actively looking. It calls `arlive-career-scan-target-roles` to search LinkedIn, Glassdoor, and other configured job boards for postings matching your target criteria: role titles, company tier preferences, tech stack requirements, and compensation minimums. The op summarizes what it finds: how many relevant openings exist, the compensation ranges being offered, the most common required skills, and any notable patterns (e.g., specific companies hiring aggressively, new role titles emerging in the market). Openings that meet all target criteria are logged to vault/career/01_pipeline/ as "watch" stage items. This monthly pulse ensures you have leverage context at performance review time and can move quickly when a strong opportunity appears.

## Calls

- **Flows:** `arlive-career-scan-target-roles`
- **Tasks:** `arlive-career-update-open-loops`

## Apps

LinkedIn, Glassdoor, Levels.fyi

## Vault Output

`vault/career/04_briefs/`
