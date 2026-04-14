---
name: arlive-real-estate-flow-scan-market-listings
type: flow
trigger: called-by-op
description: >
  Searches configured target neighborhoods for active listings matching criteria and summarizes
  market stats including median price, active inventory, and average days on market.
---

# arlive-real-estate-scan-market-listings

**Trigger:** Called by `arlive-real-estate-market-scan`
**Produces:** Market snapshot table with aggregate stats and filtered active listings per neighborhood

## What it does

This flow reads the configured search criteria from the vault — target neighborhoods, price range,
minimum beds and baths, square footage floor — and applies them to active listing data from Zillow,
Redfin, or saved listing snapshots in the vault. It produces both an aggregate market stats table
(median list price, active inventory count, median days on market, median price per sqft) and a
filtered listing table showing individual homes that match all criteria. The stats are stored as a
monthly data point so trends can be tracked over time.

## Steps

1. Read search criteria and target neighborhoods from `vault/real-estate/00_markets/`
2. Search Zillow/Redfin or read saved listing data for each target neighborhood
3. Filter listings by configured criteria (price, beds, baths, sqft)
4. Calculate and summarize aggregate market stats: median price, active inventory, avg days on market, median price/sqft

## Apps

None

## Vault Output

`vault/real-estate/00_markets/`
