---
type: op
cadence: weekly
description: >
  Weekly review of family-tier contacts (partner, parents, children, siblings,
  extended family the user has flagged as family-tier). Surfaces last meaningful
  contact, upcoming family events from Calendar, and any open follow-ups. Family
  is intentionally a separate tier from friends because cadence expectations differ.
---

# social-family-relationships-review

**Cadence:** Weekly (Sunday by default; configurable)
**Produces:** Family-tier review brief at `~/Documents/aireadylife/vault/social/02_briefs/family-YYYY-WW.md`

## What It Does

Family relationships have different cadence rhythms than friend or professional relationships. A weekly check on partner and parents with a missed call surfaces faster decay than a generic monthly relationship review can. This op narrows focus to contacts tagged `tier: family` in `contacts.md` (partner, parents, children if adult, siblings, and any user-flagged extended-family) and produces a family-only health view.

For each family contact, the op pulls last-signal date from `task-pull-relationship-signals-from-gmail-calendar`, then layers the manual interaction log (which captures phone, text, and in-person — common with family). It flags anyone who has crossed the family-tier overdue threshold (default 14 days for partner / immediate household, 30 days for parents and adult siblings, 60 days for extended family — configurable).

The op also reads upcoming family events from the native Calendar connector for the next 30 days (anniversaries, birthdays, family gatherings tagged `family`) and surfaces them inline so the user sees relationship cadence and upcoming events together.

## Steps

1. Read `contacts.md`; filter to `tier: family` entries with sub-tier (immediate, parent, sibling, child, extended)
2. Call `task-pull-relationship-signals-from-gmail-calendar` (refresh)
3. For each family contact: compute days since last signal; classify as healthy / fading / overdue per family-tier thresholds
4. Pull upcoming family-tagged events from Calendar (next 30 days)
5. Surface any open follow-ups for family contacts from `open-loops.md`
6. For overdue contacts: call `task-flag-overdue-contact` with family-tier threshold
7. Write brief to `02_briefs/family-YYYY-WW.md`
8. Call `task-update-open-loops`

## Configuration

`vault/social/config.md`:
- `family_immediate_overdue_days` (default 14)
- `family_parents_siblings_overdue_days` (default 30)
- `family_extended_overdue_days` (default 60)
- `family_review_day` (default Sunday)

## Vault Paths

- Reads: `00_current/contacts.md`, `00_current/last-signals.md`, `01_interactions/`, native Calendar
- Writes: `02_briefs/family-YYYY-WW.md`, `open-loops.md`
