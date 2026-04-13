---
name: angi
type: app
description: >
  Searches contractor listings and reviews on Angi (formerly Angie's List) via
  Playwright. Used by home-agent for finding and vetting service professionals
  for maintenance tasks. Configure in vault/home/config.md.
---

# Angi

**Auth:** Playwright + Chrome cookies
**URL:** https://www.angi.com
**Configuration:** Set your location and Chrome profile in `vault/home/config.md`

## Data Available

- Pro listings for a service type and zip code
- Contractor reviews and ratings (star rating, review count)
- Verified license and background check status
- Quote request history and pro responses
- Past bookings and project history
- Cost guide data (average price range for service types)

## Configuration

Add to `vault/home/config.md`:
```
home_zip_code: YOUR_ZIP
home_chrome_profile: /Users/YOU/Library/Application Support/Google/Chrome/Default
angi_email: YOUR_ANGI_EMAIL
```

## Notes

- Requires headless=False and login for booking history
- Public search (contractor listings) available without login
- Service categories: plumbing, HVAC, electrical, roofing, lawn care, etc.

## Used By

- `arlive-home-seasonal-maintenance` — find top-rated pros for scheduled seasonal tasks
- `arlive-home-flag-maintenance-item` — search for qualified contractor for flagged repair

## Vault Output

`vault/home/maintenance/`
