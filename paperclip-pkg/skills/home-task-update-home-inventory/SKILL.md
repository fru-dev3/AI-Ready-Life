---
type: task
trigger: user-or-flow
cadence: annual
description: >
  Annual photo / video walkthrough of household contents for insurance claim purposes.
  Records each room's contents, high-value items with serial numbers + receipts +
  appraisals, and stores the inventory file in vault. Most renters and homeowners are
  underinsured because they've never inventoried — this fixes that. Universal.
---

# home-update-home-inventory

**Trigger phrases:**
- "update home inventory"
- "home inventory walkthrough"
- "what do I own"
- "annual inventory"

**Cadence:** Annual (recommend pairing with insurance renewal).

## What It Does

Walks the user through a structured room-by-room inventory and produces a single
file the user can hand to a claims adjuster after a fire, theft, or disaster.

**Per room:**
- Photo / short video reference (filename, stored in `vault/home/00_current/inventory/`).
- Furniture: item, approximate purchase year, approximate replacement cost.
- Electronics: make, model, serial, purchase date, receipt path.
- Appliances: make, model, serial, purchase date, warranty status.
- Notable items >$500: detailed entry with photo.
- Jewelry / art / collectibles: appraisal date, appraisal value, appraiser, location
  of appraisal doc.

**High-value flags:**
- Items >$1,500 single-item value — confirm coverage with insurance plugin (most
  policies have per-item sub-limits; jewelry, art, electronics often need riders).
- If insurance plugin installed: write the high-value list to
  `vault/insurance/00_current/scheduled-items-candidates.md` so the next insurance
  review picks them up.

## Output

- `vault/home/00_current/inventory.md` — master index by room.
- `vault/home/00_current/inventory/` — photo / video files.
- `vault/insurance/00_current/scheduled-items-candidates.md` (if insurance installed).

## Steps

1. List rooms from config or prompt user; loop room by room.
2. For each room: capture filenames of walkthrough photo / video, then list furniture
   / electronics / appliances / notable items.
3. Sum approximate replacement value per room and total.
4. Flag items >$1,500 to scheduled-items list.
5. Write master inventory file.

## Configuration

`vault/home/config.md`:
- `rooms` (list — used to drive the loop)
- `last_inventory_date` (auto-set on completion)

## Vault Paths

- Reads: `vault/home/config.md`
- Writes: `vault/home/00_current/inventory.md`,
  `vault/home/00_current/inventory/{photos+videos}`,
  `vault/insurance/00_current/scheduled-items-candidates.md` (cross-domain, optional)
