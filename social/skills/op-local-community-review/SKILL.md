---
type: op
cadence: monthly
description: >
  Monthly review of geographically-local contacts within a configurable radius.
  Flags upcoming local events from Gmail, Calendar, and any configured neighborhood
  sources. Surfaces one community-presence action per month so digital connection
  doesn't fully replace local presence.
---

# social-local-community-review

**Cadence:** Monthly (1st by default)
**Produces:** Local community brief at `~/Documents/aireadylife/vault/social/02_briefs/local-YYYY-MM.md`

## What It Does

A relationship-health system that only tracks digital signals will miss the universal benchmark "local presence ≠ digital substitute." This op scopes the relationship portfolio to contacts the user has tagged as local (within a configurable radius of their home base, e.g., same neighborhood, same town, within X miles). It then surfaces:

1. **Local-tier health snapshot** — last contact for each local contact, with overdue flags for anyone who's local but hasn't been seen in person in 60+ days (configurable). Local contacts have a stricter in-person expectation than digital-only contacts.
2. **Upcoming local events** — pulls from native Calendar (tagged `local` or geocoded near home base), Gmail (event invites, neighborhood newsletters, community-org emails), and any configured neighborhood sources listed in `config.md`.
3. **One community-presence action** — recommends a single concrete action for the month: attend a specific local event, host something, drop in on a regular spot, reach out to a local friend for coffee. The discipline is one-per-month, not a queue — community presence compounds through small recurring actions.

## Steps

1. Read `contacts.md`; filter to entries with `locality: local` or matching the user's `home_base` radius
2. Call `task-pull-relationship-signals-from-gmail-calendar` for refreshed signals
3. Compute days since last in-person interaction per local contact (use `interaction_type` filter for in-person/coffee/event/dinner)
4. Pull upcoming local events from Calendar (next 30 days, tagged `local` or with locations near home base)
5. Pull local newsletter / community-org emails from Gmail (last 30 days)
6. Generate one community-presence recommendation
7. Write brief to `02_briefs/local-YYYY-MM.md`
8. Call `task-update-open-loops` for any in-person-overdue local contacts

## Configuration

`vault/social/config.md`:
- `home_base` — city/neighborhood label and optional radius_miles (default 10)
- `local_in_person_overdue_days` (default 60)
- `local_event_sources` — list of newsletters, community orgs, neighborhood sites
- `local_review_date` (default 1st of month)

## Vault Paths

- Reads: `00_current/contacts.md`, `00_current/last-signals.md`, `01_interactions/`, native Gmail, native Calendar
- Writes: `02_briefs/local-YYYY-MM.md`, `open-loops.md`
