---
name: aireadylife-explore-flow-build-trip-summary
type: flow
trigger: called-by-op
description: >
  Generates a trip brief for an upcoming trip covering destination, dates, lodging, transport,
  total budget, and open booking items.
---

# aireadylife-explore-build-trip-summary

**Trigger:** Called by `aireadylife-explore-monthly-sync`
**Produces:** Structured trip brief with booking status table and budget summary

## What it does

This flow reads a specific trip record from the vault and assembles a complete trip brief. It builds a
booking status table showing each category (flights, hotel, car, activities, insurance) as booked or
unbooked, including confirmation numbers for booked items. It calculates total trip budget versus amount
already spent, and flags any booking deadlines approaching within 30 days. The output is a single
structured brief that can be reviewed at a glance before travel.

## Steps

1. Read trip details from `vault/explore/00_trips/` for the target trip
2. List booked vs. unbooked items (flights, hotel, car, excursions, travel insurance)
3. Calculate total trip budget vs. amount spent to date
4. Flag any booking deadlines approaching within 30 days

## Apps

None

## Vault Output

`vault/explore/00_trips/`
