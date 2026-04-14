---
name: airbnb
type: app
description: >
  Scrapes Airbnb for property listings, availability, and pricing for target
  destinations and dates via Playwright. Used by explore-agent for accommodation
  research during trip planning. Configure in vault/explore/config.md.
---

# Airbnb

**Auth:** Playwright + Chrome cookies (optional — public listings accessible without login)
**URL:** https://www.airbnb.com
**Configuration:** Set target destinations and date preferences in `vault/explore/config.md`

## Data Available

- Property listings for a destination and date range
- Nightly price, total price (with cleaning and service fees)
- Property type, size, amenities
- Guest ratings and review count
- Host superhost status
- Availability calendar
- Location map and neighborhood

## Configuration

Add to `vault/explore/config.md`:
```
airbnb_chrome_profile: /Users/YOU/Library/Application Support/Google/Chrome/Default
explore_min_bedrooms: 1
explore_max_nightly_price: 250
```

## Notes

- Requires headless=False for dynamic listing pages
- Login optional but helps with saved searches and wishlists
- Search URL: airbnb.com/s/{destination}/homes?checkin=YYYY-MM-DD&checkout=YYYY-MM-DD

## Used By

- `aireadylife-explore-trip-planning-review` — find and compare accommodations for planned trips

## Vault Output

`vault/explore/trips/`
