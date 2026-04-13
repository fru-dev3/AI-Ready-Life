---
name: zillow
type: app
description: >
  Fetches Zestimate property valuations and market trend data from Zillow via
  API or web scrape. Used by estate-agent for portfolio valuation and market
  comparison. Configure target properties in vault/estate/config.md.
---

# Zillow

**Auth:** `ZILLOW_API_KEY` (Zillow Bridge API) or web scrape (no key)
**URL:** https://www.zillow.com
**Configuration:** Set property addresses and API key in `vault/estate/config.md`

## Data Available

- Zestimate (automated valuation estimate) per address
- Zestimate history (12-month trend)
- Comparable recent sales in the area
- Market trend: median list price, days on market, price cuts
- Rental Zestimate (rent estimate for comparable units)
- Property details: beds, baths, sqft, lot size, year built

## Configuration

Add to `vault/estate/config.md`:
```
zillow_api_key: YOUR_ZILLOW_API_KEY
estate_properties:
  - address: 123 Main St, City, ST 12345
  - address: 456 Oak Ave, City, ST 67890
```

## Notes

- Zillow Bridge API (rapidapi.com/apimaker/api/zillow-com1) if official API unavailable
- Zestimate is an estimate only; use comps for precision

## Used By

- `arlive-estate-portfolio-review` — pull Zestimate for each owned property

## Vault Output

`vault/estate/valuations/`
