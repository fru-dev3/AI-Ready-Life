---
name: quickbooks
type: app
description: >
  Pulls P&L, balance sheet, and transaction exports from QuickBooks Online for
  business income and deduction tracking. Used by tax-agent for deduction review
  and business income reporting. Configure in vault/tax/config.md.
---

# QuickBooks

**Auth:** Intuit account login (Playwright + Chrome cookies)
**URL:** https://app.qbo.intuit.com
**Configuration:** Set your Intuit account credentials in `vault/tax/config.md`

## Data Available

- Profit & Loss report (monthly, YTD, annual)
- Balance Sheet (point-in-time snapshot)
- Transaction export by category (CSV)
- Bank reconciliation status
- Expense categories and vendor detail
- Accounts receivable / accounts payable summary

## Configuration

Add to `vault/tax/config.md`:
```
quickbooks_email: YOUR_INTUIT_EMAIL
quickbooks_company_id: YOUR_COMPANY_ID
quickbooks_chrome_profile: /Users/YOU/Library/Application Support/Google/Chrome/Default
```

## Key Reports

- Reports → Profit and Loss → export CSV or PDF
- Reports → Balance Sheet → export CSV
- Reports → Transaction List by Date → export CSV

## Used By

- `arlive-tax-deduction-review` — identify deductible business expenses by category
- `arlive-business-pl-review` — pull P&L for business performance tracking

## Vault Output

`vault/tax/business/`
