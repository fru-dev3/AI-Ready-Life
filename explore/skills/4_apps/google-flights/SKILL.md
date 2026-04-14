---
name: google-flights
type: app
description: >
  Scrapes flight prices, route options, and price calendar data from Google Flights
  via Playwright. Used by explore-agent for trip planning and fare comparison.
  No authentication required. Configure routes in vault/explore/config.md.
---

# Google Flights

**Auth:** None (public)
**URL:** https://www.google.com/flights
**Configuration:** Set target routes and date ranges in `vault/explore/config.md`

## Data Available

- Flight prices for specific routes and dates
- Price calendar (cheapest travel days in a month)
- Airline options with stops, duration, and price
- Price tracking alerts (via Google Flights UI)
- Nearby airport alternatives and pricing
- Round-trip vs one-way fare comparison

## Configuration

Add to `vault/explore/config.md`:
```
explore_home_airport: MSP
explore_target_destinations: [NYC, LAX, MIA, CDG]
```

## Notes

- Requires Playwright with headless=False for full calendar rendering
- Price calendar URL pattern: google.com/flights?q=ORIGIN+to+DEST
- No official API; scrape rendered search results

## Used By

- `aireadylife-explore-trip-planning-review` — pull fare options and cheapest travel window for planned destinations

## Vault Output

`vault/explore/trips/`
