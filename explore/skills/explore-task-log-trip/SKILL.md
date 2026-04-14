---
name: aireadylife-explore-task-log-trip
type: task
cadence: as-planned
description: >
  Records a new trip to vault/explore/00_trips/ with destination, dates, purpose, total budget,
  booking status, and companions.
---

# aireadylife-explore-log-trip

**Cadence:** As-planned (when a new trip is being planned or booked)
**Produces:** New trip record in `vault/explore/00_trips/`

## What it does

This task creates or updates a trip record in the vault whenever a new trip is being planned. It
captures the destination, travel dates, purpose (vacation, business, family visit, etc.), total
planned budget broken down by category (flights, lodging, food, activities, insurance), current
booking status per category, and the names of travel companions. The structured record becomes the
source of truth that `aireadylife-explore-build-trip-summary` reads during monthly syncs and pre-trip
planning reviews. Keeping trip records up to date ensures the explore op always has accurate data
to surface.

## Apps

None

## Vault Output

`vault/explore/00_trips/`
