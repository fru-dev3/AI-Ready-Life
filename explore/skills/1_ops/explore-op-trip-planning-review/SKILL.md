---
name: arlive-explore-trip-planning-review
type: op
cadence: on-demand
description: >
  On-demand trip planning review that checks visa requirements, passport validity, travel insurance,
  vaccinations, and key booking deadlines for an upcoming trip. Triggers: "trip planning",
  "travel prep", "plan my trip", "travel checklist".
---

# arlive-explore-trip-planning-review

**Cadence:** On-demand (before each upcoming trip)
**Produces:** Trip readiness report with document status, booking checklist, and open action items

## What it does

This op runs a full pre-trip readiness check against a specific upcoming trip in the vault. It cross-references
the trip's destination, dates, and traveler profiles against passport expiration, visa requirements, travel
insurance coverage, and vaccination requirements. It surfaces every unbooked item (flights, hotel, car, activities)
with any approaching deadlines, and flags any document that would invalidate travel. The result is a single
trip-readiness report with a clear list of actions sorted by urgency.

## Calls

- **Flows:** `arlive-explore-build-trip-summary`, `arlive-explore-check-travel-docs`
- **Tasks:** `arlive-explore-flag-expiring-document`, `arlive-explore-update-open-loops`

## Apps

None

## Vault Output

`vault/explore/00_trips/`
