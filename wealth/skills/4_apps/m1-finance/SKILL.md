---
name: m1-finance
type: app
description: >
  Accesses automated investment portfolio data (pie allocations, positions, dividends)
  from M1 Finance via Playwright. Used by wealth-agent for investment review and
  tax document retrieval. Configure in vault/wealth/config.md.
---

# M1 Finance

**Auth:** Playwright + Chrome cookies
**URL:** https://app.m1.com
**Configuration:** Set your Chrome profile path in `vault/wealth/config.md`

## Data Available

- Portfolio value and total return
- Pie allocation (target vs actual %)
- Individual positions with cost basis
- Dividend history and reinvestment
- Portfolio performance over time
- Monthly statements (PDF)
- Tax documents: 1099-B, 1099-DIV

## Configuration

Add to `vault/wealth/config.md`:
```
m1_chrome_profile: /Users/YOU/Library/Application Support/Google/Chrome/Profile 2
```

## Notes

- Requires headless=False for cookie auth
- Download statements via: Account → Documents

## Used By

- `arlive-wealth-investment-review` — pull portfolio value, allocation, and dividends

## Vault Output

`vault/wealth/investments/`
