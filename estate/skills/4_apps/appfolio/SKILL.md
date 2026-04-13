---
name: appfolio
type: app
description: >
  Downloads owner statements, lease documents, and maintenance data from an
  AppFolio owner portal via Playwright. Used by estate-agent for cash flow review
  and tenant management. Configure your portal URL in vault/estate/config.md.
---

# AppFolio

**Auth:** Playwright + Chrome cookies (owner portal login)
**URL:** Configured per property management company in `vault/estate/config.md`
**Configuration:** Set your owner portal URL in `vault/estate/config.md`

## Data Available

- Monthly owner statements (PDF)
- Rental income and expense breakdown per property
- Lease documents (current leases, move-in/out reports)
- Maintenance requests (open, in-progress, completed)
- Tenant ledger and payment history
- 1099 tax forms (year-end)

## Configuration

Add to `vault/estate/config.md`:
```
appfolio_portal_url: https://YOURPROPERTY.appfolio.com/ownerweb
appfolio_chrome_profile: /Users/YOU/Library/Application Support/Google/Chrome/Default
```

## Notes

- Requires headless=False for cookie-based login
- Portal URL is specific to your property management company's AppFolio account

## Used By

- `arlive-estate-cash-flow-review` — download and parse monthly owner statements
- `arlive-estate-tenant-review` — check lease status and open maintenance requests

## Vault Output

`vault/estate/statements/`
