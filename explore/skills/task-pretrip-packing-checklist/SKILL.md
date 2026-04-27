---
type: task
trigger: user-or-flow
description: >
  Generates a packing checklist for a specific trip from trip type (domestic / international /
  outdoor / business / mixed), destination weather, duration, activity plan, and current gear
  inventory. Configurable per trip.
---

# explore-pretrip-packing-checklist

**Trigger:**
- User input: "packing list for {trip}", "what should I pack?"
- Called by: `op-trip-planning-review` (auto when departure is within 14 days)

## What It Does

Produces a deterministic packing checklist from the trip record + gear inventory + destination weather + activity tags so the user does not assemble the list from scratch (or forget items) every trip.

**Inputs the task assembles:**
- Trip record from `00_current/{trip-file}.md` — destination, dates, duration, purpose, activity tags
- Destination weather forecast (read from `config.md` weather provider key, or returned from `flow-check-travel-docs` if available)
- Gear inventory from `00_current/gear.md` — items already owned + condition
- User profile (e.g., glasses, prescriptions) from `config.md`

**Checklist generation rules:**
- Base layer: docs (passport, ID, boarding pass), wallet, phone + charger, medication
- Type modifiers (additive):
  - `domestic` — ID instead of passport, no plug adapter
  - `international` — passport, plug adapter, currency / card travel-notice, copy of itinerary
  - `outdoor` — layers, footwear, sun, hydration, navigation, first aid, headlamp
  - `business` — laptop, work charger, dress code items, presenter remote
- Duration multiplier: `nights / 4 → underwear & sock count` (rounded up, capped at 7)
- Weather modifiers: rain shell if any forecast day shows precip > 30%, insulated layer if low < 50°F, sun layer if high > 80°F
- Activity modifiers: each activity tag adds a fixed sub-list (running shoes for runs, swim kit for paddle/beach, hiking boots + poles for hikes)
- Gear-inventory cross-check: if a recommended item is in inventory with `condition = needs-replacement`, flag it 🟡 and write to open-loops; if missing entirely, mark `[buy/borrow]`

**Output:** Written to the trip file under `## Packing Checklist` as a checkbox list. The user checks items off as they pack; the task is idempotent and merges with existing state.

## Steps

1. Read trip record and `gear.md`
2. Pull weather forecast for trip dates (or fall back to climatic averages by month)
3. Compose base + type + duration + weather + activity modifier sub-lists
4. Cross-check against gear inventory; mark missing or worn items
5. Write merged checklist to trip file under `## Packing Checklist`
6. Surface 🟡 buy/replace items to open-loops
7. Return summary

## Configuration

`vault/explore/config.md`:
- `weather_provider_url` (optional)
- `personal_must_pack` (list — e.g., glasses, retainer, specific medication)
- `clothing_units_per_4_days` (default 1, capped at 7)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/explore/00_current/{trip-file}.md`, `~/Documents/aireadylife/vault/explore/00_current/gear.md`, `~/Documents/aireadylife/vault/explore/config.md`
- Writes: trip file, `~/Documents/aireadylife/vault/explore/open-loops.md`
