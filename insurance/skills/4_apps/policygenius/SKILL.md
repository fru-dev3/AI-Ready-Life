---
name: policygenius
type: app
description: >
  Accesses insurance comparison quotes for term life, disability, and umbrella
  policies on PolicyGenius. Used by insurance-agent for shopping new coverage
  during audits. Configure in vault/insurance/config.md.
---

# PolicyGenius

**Auth:** Manual or Playwright (quote forms do not require login)
**URL:** https://www.policygenius.com
**Configuration:** Set coverage targets in `vault/insurance/config.md`

## Data Available

- Term life insurance quotes (multiple carriers, 10/20/30-year terms)
- Disability income insurance quotes
- Umbrella liability quotes
- Homeowners and renters insurance quotes
- Side-by-side carrier comparison (premium, A.M. Best rating, features)
- Educational content on coverage recommendations by life stage

## Configuration

Add to `vault/insurance/config.md`:
```
policygenius_target_life_coverage: 1000000
policygenius_target_term_years: 20
policygenius_target_disability: true
```

## Notes

- No API available; use Playwright to navigate quote flows or read comparison pages
- Quotes require DOB, health class, and coverage amount inputs

## Used By

- `arlive-insurance-coverage-audit` — compare existing coverage against market rates and alternatives

## Vault Output

`vault/insurance/quotes/`
