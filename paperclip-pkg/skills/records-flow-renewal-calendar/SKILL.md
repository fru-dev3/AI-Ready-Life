---
type: flow
trigger: called-by-op
description: >
  Cross-category renewal dashboard. Aggregates upcoming renewal dates from records (driver's
  license, REAL ID, passport, vehicle registration, professional license, professional cert,
  vehicle inspection, HOA dues) and from cross-domain manifests (insurance, subscriptions)
  into a single timeline sorted by date.
---

# records-renewal-calendar

**Trigger:** Called by `op-review-brief`, `op-monthly-sync`, on-demand.
**Produces:** `~/Documents/aireadylife/vault/records/00_current/renewal-calendar.md`

## What It Does

Renewals are the single highest source of "expiration surprise" in personal records: a license expires the week of an international flight, a vehicle registration lapses the day before a road trip, a professional cert lapses the month before a renewal exam window closes. Each domain plugin tracks its own renewal dates, but the user needs one timeline.

This flow assembles every renewal-bearing item the records vault knows about plus everything reachable via cross-domain manifests:

- **Identity** — driver's license, REAL ID, passport, Global Entry, TSA PreCheck.
- **Vehicle** — registration, inspection (where required), emissions, title-related deadlines.
- **Professional** — licenses, certifications, continuing-ed credits (when career plugin is installed).
- **Property** — HOA dues, property-tax due dates (when home plugin is installed).
- **Insurance** — auto, home, life, umbrella renewals (via `insurance-docs.json` manifest).
- **Subscriptions** — annual subscriptions renewing in the window (from `subscriptions.md`).

Each row: item, holder, renewal date, days-until, lead-time-action ("apply 6 months early for passport"), portal link, fee. Items within their lead-time window are flagged urgent.

## Steps

1. Read `00_current/INDEX.md` for records-vault items with expirations.
2. Read available cross-domain manifests (`02_briefs/manifests/*.json`) and the subscription registry.
3. Read each item's category-specific lead time (configurable; defaults: passport 6 months, REAL ID 3 months, vehicle reg 30 days, etc.).
4. Compute days-until and effective-deadline for each item.
5. Sort ascending by effective deadline.
6. Write `00_current/renewal-calendar.md`; surface urgent items to `task-update-open-loops`.

## Configuration

`~/Documents/aireadylife/vault/records/config.md`:
- `renewal_lead_times` — per-category lead-time overrides
- `renewal_calendar_horizon_months` (default 18)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/records/00_current/INDEX.md`, `02_briefs/manifests/`, `00_current/subscriptions.md`
- Writes: `~/Documents/aireadylife/vault/records/00_current/renewal-calendar.md`
