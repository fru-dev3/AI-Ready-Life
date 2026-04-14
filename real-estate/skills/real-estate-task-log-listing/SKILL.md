---
name: aireadylife-real-estate-task-log-listing
type: task
cadence: as-found
description: >
  Saves a listing of interest to vault/real-estate/01_listings/ with address, price, beds/baths,
  sqft, days on market, notes, Zillow/Redfin link, and status.
---

# aireadylife-real-estate-log-listing

**Cadence:** As-found (when a listing worth tracking is identified)
**Produces:** Listing record in `vault/real-estate/01_listings/`

## What it does

This task captures a specific property listing in the vault so it can be tracked over time and
referenced in future market scans. Each record includes the full property address, list price,
bedroom and bathroom count, square footage, price per square foot, days on market at time of
saving, any personal notes about the property (pros, concerns, neighborhood observations), the
Zillow or Redfin URL, and a status field that tracks the listing's lifecycle (watching, toured,
offer made, passed, sold). Keeping listings in the vault enables trend tracking — noting when
prices drop, how long a listing sits, and which neighborhoods are seeing the most activity.

## Apps

None

## Vault Output

`vault/real-estate/01_listings/`
