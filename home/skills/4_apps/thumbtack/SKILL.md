---
name: thumbtack
type: app
description: >
  Searches local pro listings and quote requests on Thumbtack via Playwright.
  Used by home-agent for obtaining competitive quotes on home maintenance and
  improvement projects. Configure in vault/home/config.md.
---

# Thumbtack

**Auth:** Playwright + Chrome cookies (account required for quotes)
**URL:** https://www.thumbtack.com
**Configuration:** Set your location and Chrome profile in `vault/home/config.md`

## Data Available

- Pro listings by service type and location (name, rating, review count)
- Pro pricing estimates and quote responses
- Project request history
- Pro background check and license verification status
- Response time and hire rate metrics

## Configuration

Add to `vault/home/config.md`:
```
home_zip_code: YOUR_ZIP
thumbtack_email: YOUR_THUMBTACK_EMAIL
thumbtack_chrome_profile: /Users/YOU/Library/Application Support/Google/Chrome/Default
```

## Notes

- Requires headless=False for quote request flow
- Works alongside Angi for competitive quote comparison
- Categories: cleaning, handyman, landscaping, painting, moving, etc.

## Used By

- `arlive-home-seasonal-maintenance` — solicit quotes from multiple pros for seasonal projects

## Vault Output

`vault/home/maintenance/`
