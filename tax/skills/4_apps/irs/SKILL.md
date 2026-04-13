---
name: irs
type: app
description: >
  Accesses IRS.gov for account transcripts, Direct Pay payments, and notice
  downloads via Playwright with ID.me authentication. Used by tax-agent for
  quarterly estimates and deadline tracking. Configure in vault/tax/config.md.
---

# IRS

**Auth:** Playwright + Chrome cookies (IRS ID.me login)
**URL:** https://www.irs.gov
**Configuration:** Set your ID.me credentials in `vault/tax/config.md`

## Data Available

- Account transcript (payments applied, balance due)
- Tax return transcript (prior year summary)
- Notices and letters (PDF)
- Payment history
- Direct Pay confirmation numbers

## Configuration

Add to `vault/tax/config.md`:
```
irs_idme_email: YOUR_IDME_EMAIL
irs_chrome_profile: /Users/YOU/Library/Application Support/Google/Chrome/Default
```

## Key Actions

- View transcript: IRS.gov → Your Online Account
- Make payment: IRS.gov → Direct Pay → "Estimated Tax" (1040-ES)
- Download notices: IRS.gov → Notices & Letters

## Notes

- Requires headless=False; ID.me MFA may trigger on new sessions
- Re-authenticate if session expires (typically 30 days)

## Used By

- `arlive-tax-quarterly-estimate` — verify prior payments, submit quarterly estimated tax
- `arlive-tax-deadline-watch` — confirm payment received and transcript updated

## Vault Output

`vault/tax/irs/`
