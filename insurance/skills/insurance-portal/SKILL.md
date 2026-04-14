---
name: insurance-portal
type: app
description: >
  Accesses policy documents, coverage details, and renewal dates from any carrier's
  online portal via Playwright. Used by insurance-agent for coverage audits and
  renewal alerts. Configure your carrier portal URL in vault/insurance/config.md.
---

# Insurance Portal

**Auth:** Playwright + Chrome cookies (carrier-specific login)
**URL:** Configured per carrier in `vault/insurance/config.md`
**Configuration:** Set your carrier portal URL and login in `vault/insurance/config.md`

## Supported Carrier Types (common examples)

- Auto: Progressive, State Farm, GEICO, Allstate
- Home/Landlord: Nationwide, Obie, Hippo
- Umbrella: Various
- Life/Disability: Principal, Guardian, MetLife

## Data Available

- Policy documents (PDF — declarations page, full policy)
- Coverage limits and deductibles per policy
- Policy renewal dates and premium amounts
- Claims history and open claim status
- Premium payment history

## Configuration

Add to `vault/insurance/config.md`:
```
insurance_carriers:
  - name: Home Insurance
    portal_url: https://portal.YOURCARRIER.com
    chrome_profile: /Users/YOU/Library/Application Support/Google/Chrome/Default
  - name: Auto Insurance
    portal_url: https://www.YOURCARRIER.com/login
    chrome_profile: /Users/YOU/Library/Application Support/Google/Chrome/Default
```

## Used By

- `aireadylife-insurance-renewal-watch` — check upcoming renewal dates and flag premium changes
- `aireadylife-insurance-coverage-audit` — download and compare coverage limits across all policies

## Vault Output

`vault/insurance/policies/`
