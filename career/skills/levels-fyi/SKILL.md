---
name: levels-fyi
type: app
description: >
  Scrapes compensation data by company, role, and level from Levels.fyi. Used by
  career-agent for compensation benchmarking and offer evaluation. No authentication
  required. Configure target role in vault/career/config.md.
---

# Levels.fyi

**Auth:** None (public web scrape)
**URL:** https://www.levels.fyi
**Configuration:** Set target role and companies in `vault/career/config.md`

## Data Available

- Total compensation by company, role, and level (p50 / p75 / p90)
- Compensation breakdown: base salary, annual bonus, equity (RSU)
- Job postings with reported comp data
- Year-over-year comp trend by role
- Company-specific level ladders (L3–L7+)
- Location-adjusted comp comparisons

## Configuration

Add to `vault/career/config.md`:
```
levels_target_role: Senior Software Engineer
levels_target_companies: [Google, Meta, Amazon, Microsoft, Snowflake]
levels_location: Remote
```

## Key URLs

```
https://www.levels.fyi/t/software-engineer?company=Snowflake
https://www.levels.fyi/comp.html
```

## Used By

- `aireadylife-career-comp-review` — benchmark current comp against market p50/p75
- `aireadylife-career-build-comp-summary` — generate formatted compensation analysis report

## Vault Output

`vault/career/comp/`
