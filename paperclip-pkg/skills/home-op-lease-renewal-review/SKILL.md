---
type: op
trigger: user-facing
cadence: triggered-60-days-before-lease-end
description: >
  RENTER-ONLY. Triggered automatically by op-monthly-sync when lease_end_date is within
  60 days, or on-demand. Pulls the current lease, looks up market rent for the user's
  metro / zip via configured source (Zillow Rentals, Rentometer, Apartments.com),
  drafts a renewal-vs-move decision brief: rent comparison, moving cost estimate,
  break-even months, walk-away criteria. Auto-skips if home_type is "own".
---

# home-lease-renewal-review

**Trigger phrases:**
- "lease renewal review"
- "should I renew my lease"
- "renew or move"
- "lease decision"

**Renter-only.** If `home_type` in config is "own", this skill exits with:
"Lease renewal review applies to renters. Skipping — your config shows you own."

**Cadence:** Triggered 60 days before `lease_end_date`, or on-demand.

## What It Does

Builds the renew-vs-move decision packet a renter actually needs: current rent vs.
market, how the landlord typically increases at renewal, moving costs, total cost of
moving vs. renewing at any plausible bump.

**Inputs:**
- Current lease (from `vault/home/00_current/lease.{md,pdf}`).
- Renewal offer from landlord (if received — captured in config or as a vault file).
- Market rent for same beds / baths / zip via configured source.
- Moving cost estimate (movers + deposits + first / last + utility transfers + time).
- User-provided "what's not working" notes (if any).

**Output:**
- `vault/home/02_briefs/YYYY-MM-DD-lease-renewal.md` — decision brief with
  recommendation and explicit walk-away threshold.

## Decision frame

The brief computes:
- **Renew cost** = (new monthly rent × 12) for renewal term.
- **Move cost** = (estimated new rent × 12) + moving + deposits + transition costs.
- **Break-even bump** — at what renewal % bump does moving become cheaper?
- **Non-monetary factors** — commute, school, neighborhood fit, unit issues
  unresolved.

## Steps

1. Confirm `home_type` is "rent"; otherwise exit.
2. Read current lease + any renewal offer.
3. Look up market rent (manual entry from Zillow / Rentometer / Apartments.com if
   not auto-pullable).
4. Estimate moving cost; pull recent moves from `vault/home/01_prior/` if any.
5. Compute renew vs. move math; identify break-even bump %.
6. Draft recommendation with specific walk-away threshold.
7. Write brief; flag decision deadline (lease end − 30 days) in open-loops.

## Configuration

`vault/home/config.md`:
- `home_type` (must be "rent")
- `lease_end_date`
- `current_monthly_rent`
- `market_rent_source` (Zillow / Rentometer / Apartments / manual)

## Vault Paths

- Reads: `vault/home/config.md`, `vault/home/00_current/lease.{md,pdf}`
- Writes: `vault/home/02_briefs/YYYY-MM-DD-lease-renewal.md`,
  `vault/home/open-loops.md`
