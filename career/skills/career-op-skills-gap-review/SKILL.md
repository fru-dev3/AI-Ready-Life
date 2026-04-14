---
name: aireadylife-career-op-skills-gap-review
type: op
cadence: quarterly
description: >
  Quarterly skills gap analysis; compares your current skills inventory to target
  role requirements and identifies priority learning areas. Triggers: "skills gap
  review", "what should I be learning", "career development check".
---

# aireadylife-career-skills-gap-review

**Cadence:** Quarterly (1st of Jan, Apr, Jul, Oct)
**Produces:** Skills gap summary in vault/career/03_skills/, learning priority flags in vault/career/open-loops.md

## What it does

Runs quarterly to keep your skills development intentionally aligned with the roles you are targeting, rather than learning reactively or by chance. It calls `aireadylife-career-build-skills-gap-summary` to compare your current skills inventory (stored in vault/career/03_skills/ with proficiency levels and recency) against the requirements most frequently listed in target role postings identified during the monthly market scan. The output ranks the top 3-5 skill gaps by two dimensions: how often the skill appears in target role postings (demand) and how long it would realistically take to reach working proficiency (time to close). The quarterly cadence prevents the list from changing so fast it loses focus while keeping it fresh enough to reflect actual market shifts.

## Calls

- **Flows:** `aireadylife-career-build-skills-gap-summary`
- **Tasks:** `aireadylife-career-update-open-loops`

## Apps

None

## Vault Output

`vault/career/03_skills/`
