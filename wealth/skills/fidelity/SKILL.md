---
name: fidelity
type: app
description: >
  Accesses brokerage and retirement account data (IRA, 401k rollover, taxable)
  from Fidelity via Playwright. Used by wealth-agent for investment review and
  net worth tracking. Configure in vault/wealth/config.md.
---

# Fidelity

**Auth:** Playwright + Chrome cookies
**URL:** https://www.fidelity.com
**Configuration:** Set your Chrome profile path in `vault/wealth/config.md`

## Data Available

- Account balances (brokerage, IRA, 401k rollover)
- Holdings and positions with current market value
- Portfolio performance (day, month, YTD, all-time)
- Transaction history
- Monthly statements (PDF)
- Tax documents: 1099-R, 1099-B, 1099-DIV

## Configuration

Add to `vault/wealth/config.md`:
```
fidelity_chrome_profile: /Users/YOU/Library/Application Support/Google/Chrome/Profile 1
```

## Notes

- Requires headless=False for cookie-based auth
- Download statements via: Accounts → Statements & Documents

## Used By

- `aireadylife-wealth-investment-review` — pull balances, positions, and performance
- `aireadylife-wealth-net-worth-review` — contribute account values to net worth snapshot

## Vault Output

`vault/wealth/investments/`
