---
name: stessa
type: app
description: >
  Accesses rental income, expense tracking, and cash flow reports from Stessa
  via Playwright. Used by estate-agent for property-level cash flow review and
  tax-ready reporting. Configure in vault/estate/config.md.
---

# Stessa

**Auth:** Playwright + Chrome cookies
**URL:** https://app.stessa.com
**Configuration:** Set your Chrome profile path in `vault/estate/config.md`

## Data Available

- Income and expense tracking per property
- Cash flow report (monthly, YTD per property)
- Net operating income (NOI) per property
- Tax-ready reports (Schedule E prep)
- Property value estimates (Stessa AVM)
- Document storage (leases, receipts)
- Transaction categorization by IRS category

## Configuration

Add to `vault/estate/config.md`:
```
stessa_email: YOUR_STESSA_EMAIL
stessa_chrome_profile: /Users/YOU/Library/Application Support/Google/Chrome/Default
```

## Notes

- Requires headless=False
- Reports under: Reports → Cash Flow → select property and date range → export CSV/PDF
- Free tier supports unlimited properties

## Used By

- `aireadylife-estate-cash-flow-review` — pull property-level income and expense report
- `aireadylife-estate-portfolio-review` — generate cross-property NOI summary

## Vault Output

`vault/estate/cash-flow/`
