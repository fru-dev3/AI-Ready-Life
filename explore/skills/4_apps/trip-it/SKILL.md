---
name: trip-it
type: app
description: >
  Reads unified trip itineraries from TripIt for travel tracking and confirmation
  aggregation. Used by explore-agent for monthly travel sync and itinerary review.
  Configure in vault/explore/config.md.
---

# TripIt

**Auth:** Email parsing (auto-forward confirmations) or Playwright + Chrome cookies
**URL:** https://www.tripit.com
**Configuration:** Set your TripIt account in `vault/explore/config.md`

## Data Available

- Unified trip itineraries (flights, hotels, rental cars, activities)
- Flight confirmation details (airline, flight number, departure/arrival times)
- Hotel reservation details (check-in/out, confirmation number)
- Upcoming trips in a date range
- Past trip history

## Configuration

Add to `vault/explore/config.md`:
```
tripit_email: YOUR_TRIPIT_EMAIL
tripit_chrome_profile: /Users/YOU/Library/Application Support/Google/Chrome/Default
```

## Notes

- TripIt Pro offers real-time alerts and seat tracking (paid tier)
- Email forwarding: forward any travel confirmation to plans@tripit.com
- TripIt API available for Pro accounts: api.tripit.com/v1

## Used By

- `arlive-explore-monthly-sync` — pull upcoming trip details and sync with calendar

## Vault Output

`vault/explore/trips/`
