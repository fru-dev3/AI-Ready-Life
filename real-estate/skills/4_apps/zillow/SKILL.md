---
name: zillow
type: app
description: >
  Fetches Zestimate property valuations, active listings, and market trend data
  from Zillow via API or web scrape. Used by real-estate-agent for market scanning
  and valuation research. Configure in vault/real-estate/config.md.
---

# Zillow

**Auth:** `ZILLOW_API_KEY` (Zillow Bridge API) or web scrape (no key)
**URL:** https://www.zillow.com
**Configuration:** Set search areas and API key in `vault/real-estate/config.md`

## Data Available

- Zestimate (automated valuation) for any address
- Active listing prices for a search area
- Recent comparable sales (price, date, beds/baths/sqft)
- Market stats: median list price, days on market, price cut frequency
- Rental Zestimate for investment analysis
- Price history for a specific property

## Configuration

Add to `vault/real-estate/config.md`:
```
zillow_api_key: YOUR_ZILLOW_API_KEY
realestate_target_cities: [YOUR_CITY STATE, YOUR_CITY2 STATE]
realestate_max_price: YOUR_MAX_PRICE
realestate_min_beds: 3
```

## Notes

- Use Zillow Bridge API (via RapidAPI) for programmatic Zestimate lookups
- Web scrape for active listings if API quota insufficient

## Used By

- `aireadylife-real-estate-market-scan` — scan active listings in target cities matching filters
- `aireadylife-real-estate-scan-market-listings` — pull current inventory and price trends

## Vault Output

`vault/real-estate/market/`
