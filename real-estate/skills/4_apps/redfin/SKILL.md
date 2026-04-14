---
name: redfin
type: app
description: >
  Scrapes Redfin for active listings, comparable sales, and market statistics
  for any search area or address. Used by real-estate-agent for market analysis
  and affordability calculations. Configure in vault/real-estate/config.md.
---

# Redfin

**Auth:** None required for public listings (web scrape via Playwright)
**URL:** https://www.redfin.com
**Configuration:** Set target search areas in `vault/real-estate/config.md`

## Data Available

- Active listings for a city/zip with filters (price, beds, baths, sqft)
- Property detail: price, beds, baths, sqft, lot size, year built, HOA
- Days on market and price history per listing
- Estimated value (Redfin Estimate) for any address
- Recent comparable sales (sold price, date, vs list price)
- Market stats: median sale price, months of supply, sale-to-list ratio
- School ratings per property

## Configuration

Add to `vault/real-estate/config.md`:
```
realestate_target_cities: [YOUR_CITY STATE, YOUR_CITY2 STATE]
realestate_max_price: YOUR_MAX_PRICE
realestate_min_beds: 3
```

## Notes

- Redfin has a CSV download of search results (requires login for full export)
- Requires headless=False for dynamic listing pages
- Search URL: redfin.com/city/{id}/filter/max-price={price}

## Used By

- `aireadylife-real-estate-market-scan` — pull active listings and market stats for target area
- `aireadylife-real-estate-build-affordability-analysis` — collect comp data for buy vs rent analysis

## Vault Output

`vault/real-estate/market/`
