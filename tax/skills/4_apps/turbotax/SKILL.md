---
name: turbotax
type: app
description: >
  Accesses TurboTax for prior year return downloads, current year filing status,
  and imported income data. Used by tax-agent for document sync and annual review.
  Configure your Intuit credentials in vault/tax/config.md.
---

# TurboTax

**Auth:** Intuit account login (Playwright + Chrome cookies)
**URL:** https://turbotax.intuit.com
**Configuration:** Set your Intuit credentials in `vault/tax/config.md`

## Data Available

- Prior year returns (PDF download)
- State and federal filing status
- Imported W-2, 1099 data (auto-import partners)
- Estimated refund or amount owed
- Tax summary (AGI, deductions, effective rate)

## Configuration

Add to `vault/tax/config.md`:
```
turbotax_email: YOUR_INTUIT_EMAIL
turbotax_chrome_profile: /Users/YOU/Library/Application Support/Google/Chrome/Default
```

## Export Path

My TurboTax → Tax Home → Download/Print return as PDF → save to `vault/tax/returns/`

## Notes

- Online version at turbotax.intuit.com; desktop app also supported
- Prior year PDFs are available for 7 years in the portal

## Used By

- `arlive-tax-document-sync` — download completed returns and confirmation PDFs
- `arlive-tax-review-brief` — read prior year AGI and effective rate for planning

## Vault Output

`vault/tax/returns/`
