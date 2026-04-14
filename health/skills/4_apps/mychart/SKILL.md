---
name: mychart
type: app
description: >
  Scrapes patient portal records (labs, notes, appointments) from a provider's
  MyChart instance via Playwright. Used by health-agent to download clinical data
  for local review. Configure your provider URL in vault/health/config.md.
---

# MyChart

**Auth:** Playwright + Chrome cookies (provider-specific login)
**URL:** Configured per provider in `vault/health/config.md`
**Configuration:** Set your portal URL and credentials in `vault/health/config.md`

## Data Available

- Lab results (PDF and structured values)
- Visit notes and after-visit summaries
- Upcoming and past appointments
- Current medications and prescriptions
- Immunization records
- Secure messages from care team

## Configuration

Add to `vault/health/config.md`:
```
mychart_url: https://mychart.YOURPROVIDER.org
mychart_username: YOUR_USERNAME
```

## Notes

- Requires headless=False (Chrome app-bound encryption)
- Session cookies cached after first login; re-auth monthly
- Different providers may use custom MyChart subdomains

## Used By

- `aireadylife-health-lab-review` — download and parse recent lab results
- `aireadylife-health-monthly-sync` — pull new visit notes and upcoming appointments

## Vault Output

`vault/health/records/`
