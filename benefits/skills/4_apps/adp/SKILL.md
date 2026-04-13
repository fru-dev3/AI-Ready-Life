---
name: adp
type: app
description: >
  Accesses pay stubs, W-2, and benefits elections from ADP Workforce Now or
  MyADP via Playwright. Used by benefits-agent for payroll verification and
  year-end document retrieval. Configure in vault/benefits/config.md.
---

# ADP

**Auth:** Playwright + Chrome cookies
**URL:** https://workforcenow.adp.com (or https://my.adp.com)
**Configuration:** Set your ADP portal URL in `vault/benefits/config.md`

## Data Available

- Pay stubs (PDF per pay period)
- YTD earnings breakdown (gross, net, taxes withheld)
- 401k contribution rate and YTD deductions
- Benefits deductions per paycheck
- W-2 (available January each year)
- Direct deposit split and bank details

## Configuration

Add to `vault/benefits/config.md`:
```
adp_portal_url: https://workforcenow.adp.com
adp_username: YOUR_ADP_USERNAME
adp_chrome_profile: /Users/YOU/Library/Application Support/Google/Chrome/Default
```

## Export Path

- Pay stubs: Pay → Pay Statements → Download PDF
- W-2: Tax → W-2 Statements → Download PDF → save to `vault/benefits/tax-docs/`

## Used By

- `arlive-benefits-401k-review` — verify 401k deductions match elected rate
- `arlive-benefits-coverage-review` — confirm benefit deductions are correct per plan

## Vault Output

`vault/benefits/payroll/`
