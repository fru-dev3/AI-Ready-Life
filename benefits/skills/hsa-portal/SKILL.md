---
name: hsa-portal
type: app
description: >
  Accesses HSA account balance, contributions, and investment data from any HSA
  carrier portal via Playwright. Used by benefits-agent for HSA contribution
  tracking and investment review. Configure in vault/benefits/config.md.
---

# HSA Portal

**Auth:** Playwright + Chrome cookies (carrier-specific login)
**URL:** Configured per carrier in `vault/benefits/config.md`
**Configuration:** Set your HSA carrier URL in `vault/benefits/config.md`

## Supported Carriers (common examples)

- Fidelity: fidelity.com/hsa
- HSA Bank: hsabank.com
- Optum: optumbank.com
- WEX: wexinc.com
- HealthEquity: healthequity.com

## Data Available

- HSA cash balance and invested balance (total)
- YTD employee contributions vs IRS annual limit
- Employer contributions YTD
- Investment allocation and performance
- Eligible expense transaction history
- Prior year 5498-SA tax form (contributions)

## Configuration

Add to `vault/benefits/config.md`:
```
hsa_carrier: Fidelity
hsa_portal_url: https://www.fidelity.com/hsa
hsa_chrome_profile: /Users/YOU/Library/Application Support/Google/Chrome/Default
```

## Used By

- `aireadylife-benefits-hsa-review` — check balance, contributions, and investment allocation
- `aireadylife-benefits-enrollment-review` — confirm HSA election is active and funded

## Vault Output

`vault/benefits/hsa/`
