---
type: op
trigger: user-facing
cadence: semi-annual
description: >
  Semi-annual emergency-preparedness checklist: first aid, water, food, batteries,
  flashlights, smoke / CO detector battery dates, fire extinguisher charge dates,
  emergency contact list, evacuation plan. Flags expirations and missing items as
  open loops. Universal — applies to renters and homeowners.
---

# home-emergency-prep-review

**Trigger phrases:**
- "emergency prep review"
- "emergency preparedness check"
- "smoke detector check"
- "first aid kit review"
- "are we prepared"

**Cadence:** Semi-annual (April + October recommended — daylight-saving battery
swap pairs naturally with detector check).

## What It Does

Walks a fixed preparedness checklist and flags every gap or expiration. Designed to
be run twice a year; takes 10–15 minutes with the user actually walking through the
home.

**Checklist categories:**
- **Detection** — smoke detectors (count, last battery swap, last test, sensor age),
  CO detectors (count, last battery, sensor age — typical 7-year sensor life),
  fire extinguisher (count, charge gauge, last inspection, expiration).
- **First aid** — kit location, expired meds, expired bandages, missing items vs.
  standard kit.
- **Power outage** — flashlights (count, working batteries), backup batteries,
  candles + lighter, phone power bank charged.
- **Water** — at least 1 gallon per person per day for 3 days; rotation date.
- **Food** — 3-day non-perishable supply; rotation date.
- **Communication** — emergency contact list current, out-of-state contact noted,
  printed copy in known location.
- **Evacuation** — meeting point, two exit routes per floor, important-docs grab list.
- **Climate** — for relevant regions: tornado / hurricane / wildfire / earthquake
  specifics surfaced from `home_climate_risks` config.

## Output

- `vault/home/02_briefs/YYYY-MM-DD-emergency-prep.md` — full checklist with status
  per item.
- One open-loop entry per missing or expired item.

## Steps

1. Walk the checklist with the user; capture status per item.
2. For each missing / expired / >threshold item: call `task-update-open-loops`.
3. For detector battery / sensor expirations: write replacement-due dates to
   `vault/home/00_current/safety-schedule.md`.
4. Write brief to `02_briefs/`.

## Configuration

`vault/home/config.md`:
- `household_size` (drives water / food calculation)
- `home_climate_risks` (list: tornado / hurricane / wildfire / earthquake / flood)
- `pet_count` (adds pet emergency supplies if >0)

## Vault Paths

- Reads: `vault/home/config.md`, `vault/home/00_current/safety-schedule.md`
- Writes: `vault/home/02_briefs/YYYY-MM-DD-emergency-prep.md`,
  `vault/home/00_current/safety-schedule.md`, `vault/home/open-loops.md`
