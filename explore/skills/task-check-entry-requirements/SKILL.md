---
type: task
trigger: user-or-flow
description: >
  For international trips: checks visa requirements, passport blank-page count, electronic
  travel authorizations (eTA, ESTA, ETIAS, K-ETA), and vaccination requirements for the
  destination country and the user's citizenship. Reads destination from task-log-trip.
---

# explore-check-entry-requirements

**Trigger:**
- User input: "do I need a visa for {country}?", "entry requirements for {trip}", "check entry rules"
- Called by: `op-trip-planning-review` (auto when destination is international)

## What It Does

Produces a per-traveler entry-requirements checklist for an international trip and writes any unmet requirement to open-loops with realistic lead times.

**Per traveler the task checks:**
- `visa` — Does this destination require a visa for the traveler's citizenship? Type (tourist / business / transit), online vs embassy, processing time, fee, validity
- `electronic_travel_authorization` — ESTA (US), ETIAS (Schengen), eTA (Canada), K-ETA (South Korea), eVisa (India, Turkey, etc.)
- `passport_validity` — destination's required validity beyond return date (commonly 6 months, 3 months for Schengen). Pulls passport expiry from `00_current/passport.md`
- `passport_blank_pages` — many countries require 2-4 blank pages
- `vaccinations` — mandatory (e.g., Yellow Fever for some routes) and recommended (CDC / WHO)
- `entry_form` — arrival cards, customs declarations, advance passenger info (APIS)
- `health_insurance_proof` — required by some destinations (Schengen, Cuba, etc.)
- `proof_of_onward_travel` — common for one-way bookings

**Authoritative source guidance:** The task does NOT memorize or hardcode requirements (rules change). It writes the checklist with placeholders and points the user to authoritative URLs: the destination embassy site, `travel.state.gov` (US travelers) or equivalent, and the IATA Travel Centre. If the user has a current verified-good source noted in `config.md`, it cites that.

**Output:** A `## Entry Requirements` section appended to the trip file with one row per traveler, marking each requirement ✅ / ⚠️ / ⬜ / ➖ and any 🔴 within-30-day flag. Unmet items go to open-loops with realistic lead time (e.g., "ETIAS — apply now, processing typically 96h").

## Steps

1. Read trip file → destination, return date, traveler list
2. For each traveler: read citizenship + passport expiry + blank-page note from `00_current/passport.md`
3. Build requirements checklist using known categories
4. Cite authoritative URL for the destination
5. Write `## Entry Requirements` to trip file
6. Surface unmet items to open-loops with lead times
7. Return summary

## Configuration

`vault/explore/config.md`:
- `travelers` (with citizenship)
- `entry_requirements_sources` (optional override URLs)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/explore/00_current/{trip-file}.md`, `~/Documents/aireadylife/vault/explore/00_current/passport.md`, `~/Documents/aireadylife/vault/explore/config.md`
- Writes: trip file, `~/Documents/aireadylife/vault/explore/open-loops.md`
