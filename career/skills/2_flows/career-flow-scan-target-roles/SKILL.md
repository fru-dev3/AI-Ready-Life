---
name: aireadylife-career-flow-scan-target-roles
type: flow
trigger: called-by-op
description: >
  Searches job boards for roles matching your configured target criteria and returns
  salary ranges, required skills, and company information.
---

# aireadylife-career-scan-target-roles

**Trigger:** Called by `aireadylife-career-market-scan`
**Produces:** Market scan results in vault/career/04_briefs/ with top matching roles and compensation data

## What it does

Reads target role search criteria from vault/career/00_resume/ — which stores your target role titles, level (IC4/Staff/Senior, etc.), tech stack requirements, company tier preferences (FAANG, Series B+, Fortune 500, etc.), and compensation minimums — and executes searches across configured job boards. LinkedIn Jobs is the primary source; Glassdoor, Indeed, and Levels.fyi are supplementary for compensation data. The flow filters results to roles matching at least 70% of your criteria and extracts: company name, role title, level, location/remote policy, compensation range (stated or estimated), required skills, and posting date. Results are de-duplicated and ranked by fit score. Roles that meet all criteria are flagged for the op to log to vault/career/01_pipeline/ as "watch" stage items.

## Steps

1. Read target role criteria from vault/career/00_resume/ (titles, level, stack, comp floor)
2. Search LinkedIn Jobs, Glassdoor, and Levels.fyi for matching postings
3. Filter to roles matching at least 70% of configured criteria
4. Extract comp range, required skills, company info, and posting date for each match
5. Rank by fit score and flag top matches for pipeline logging

## Apps

LinkedIn, Glassdoor, Levels.fyi

## Vault Output

`vault/career/01_pipeline/`
