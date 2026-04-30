---
type: task
trigger: user-or-flow
description: >
  Maintains a per-vehicle record: VIN, make / model / year, registration expiry, title
  location, insurance card, maintenance log, and recall status. Most adults have at least
  one vehicle and the records are spread across DMV, insurer, dealer, and mechanic.
---

# records-update-vehicle-records

**Cadence:** As-changed (oil change, registration renewal, title transfer) and reviewed quarterly.
**Produces:** Per-vehicle record file at `00_current/vehicles/{plate-or-slug}.md`.

## What It Does

Keeps a single source of truth per vehicle so registration renewals, insurance card retrieval, recall checks, and maintenance scheduling all read from one place.

Each vehicle record captures:
- **Identification** — VIN, plate, state, make, model, year, color.
- **Ownership** — title location (physical + digital), purchase date, prior owner if recent transfer.
- **Registration** — expiration date, renewal portal link, fee, emissions / inspection requirement and date.
- **Insurance** — current carrier, policy number, card location (digital + physical), declarations document path.
- **Maintenance log** — oil changes, tire rotations, major service, brake / battery replacement dates and mileage.
- **Recall status** — last NHTSA VIN check date, any open recalls.
- **Loan / lease (if applicable)** — lender, payoff balance, payment, end date; cross-references wealth vault.

The task is the single write-point for vehicle data. `flow-renewal-calendar` reads registration / inspection dates from these records. `flow-share-paths-with-agents` exposes them via `vehicle-docs.json`.

## Steps

1. Identify the vehicle (existing record or new). For new, prompt for VIN, plate, make, model, year, color.
2. Update the changed fields (registration renewal, oil change, insurance card refresh, etc.).
3. Append maintenance entries with date + mileage; never overwrite history.
4. Re-check NHTSA recall status if `nhtsa_recall_check_enabled` is true and last check >90 days.
5. Write the updated record to `00_current/vehicles/{slug}.md`.
6. Refresh `INDEX.md` via `task-build-vault-index`.

## Configuration

`~/Documents/aireadylife/vault/records/config.md`:
- `vehicles` — list of slugs and any per-vehicle overrides
- `nhtsa_recall_check_enabled` (default true)

## Vault Paths

- Writes: `~/Documents/aireadylife/vault/records/00_current/vehicles/{slug}.md`
