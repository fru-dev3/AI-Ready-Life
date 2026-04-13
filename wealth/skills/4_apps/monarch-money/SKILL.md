---
name: monarch-money
type: app
description: >
  Pulls transaction history, spending categories, and net worth from Monarch Money
  via Playwright or CSV export. Used by wealth-agent for cash flow analysis and
  budget tracking. Configure in vault/wealth/config.md.
---

# Monarch Money

**Auth:** Playwright + Chrome cookies (or CSV export)
**URL:** https://www.monarchmoney.com
**Configuration:** Set your credentials in `vault/wealth/config.md`

## Data Available

- Transaction history with merchant and category
- Monthly spending by category (vs budget)
- Net worth snapshot (assets minus liabilities)
- Account balances across linked institutions
- Budget vs actual by category
- Recurring transactions and subscriptions

## Configuration

Add to `vault/wealth/config.md`:
```
monarch_email: YOUR_EMAIL
monarch_chrome_profile: /Users/YOU/Library/Application Support/Google/Chrome/Default
```

## Export Path

Settings → Export → Transactions CSV → save to `vault/wealth/cash-flow/`

## Used By

- `arlive-wealth-cash-flow-review` — analyze monthly spending vs budget
- `arlive-wealth-build-cash-flow-summary` — generate formatted cash flow report

## Vault Output

`vault/wealth/cash-flow/`
