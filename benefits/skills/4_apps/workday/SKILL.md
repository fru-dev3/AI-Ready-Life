---
name: workday
type: app
description: >
  Accesses employer benefits portal in Workday for enrollment, 401k changes, and
  HSA elections via Playwright. Used by benefits-agent for open enrollment review
  and contribution management. Configure in vault/benefits/config.md.
---

# Workday

**Auth:** Playwright + Chrome cookies (employer SSO)
**URL:** Employer-specific (e.g., yourcompany.wd5.myworkdayjobs.com or yourcompany.workday.com)
**Configuration:** Set your employer Workday URL in `vault/benefits/config.md`

## Data Available

- Current benefits elections (medical, dental, vision, life)
- 401k contribution rate and YTD contributions
- HSA election amount and employer match
- Open enrollment windows and deadlines
- Life event change options
- Pay stub and W-2 access (if payroll is in Workday)

## Configuration

Add to `vault/benefits/config.md`:
```
workday_url: https://YOURCOMPANY.wd5.myworkdayjobs.com
workday_chrome_profile: /Users/YOU/Library/Application Support/Google/Chrome/Default
```

## Notes

- Requires headless=False; employer SSO may require Okta/Azure AD step
- Open enrollment typically October–November; changes outside OE require life event

## Used By

- `aireadylife-benefits-enrollment-review` — review current elections and compare plan options
- `aireadylife-benefits-401k-review` — check contribution rate and confirm employer match

## Vault Output

`vault/benefits/elections/`
