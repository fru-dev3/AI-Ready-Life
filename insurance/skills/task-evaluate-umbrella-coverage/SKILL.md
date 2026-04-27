---
type: task
trigger: user-or-flow
description: >
  Umbrella policy adequacy check for users with significant net worth or assets at
  risk (homeowners, landlords, high-income earners, parents of teen drivers, owners of
  pools/dogs/boats/ATVs). Compares net worth and exposure profile to the combined
  underlying liability + umbrella limit, recommends a target umbrella amount, and
  estimates premium. Advanced/optional — primarily for users above the basic-audit
  threshold in `op-coverage-audit`.
---

# insurance-evaluate-umbrella-coverage

**Trigger:**
- User input: "do I need umbrella insurance", "umbrella adequacy check", "increase umbrella"
- Called by: `op-coverage-audit` (when net worth crosses thresholds), `op-life-event-coverage-trigger` (after net-worth-changing events)

## What It Does

Umbrella sits over auto and homeowners/renters liability. It is the cheapest dollar of liability protection per million in coverage ($200-$400/year per $1M typical) and the highest-leverage line for users with assets. The basic coverage audit already flags missing umbrella when net worth > $300K; this skill goes deeper for users with elevated exposure.

**Exposure factors evaluated:**
- Net worth: a baseline. Target umbrella is typically 1-2× net worth, rounded up to the nearest $1M.
- Future earning capacity: especially for younger high-earners; courts can attach future wages.
- Teen drivers in the household: significantly raises exposure.
- Dog ownership, especially of breeds excluded by some homeowners policies.
- Pool, trampoline, ATV, boat, motorcycle ownership.
- Rental property ownership: landlord liability sits underneath and can be exhausted by a single serious tenant injury.
- Public profile: high-visibility users face elevated nuisance-suit risk.
- Volunteer board service: D&O exposure may not be covered by umbrella; flag for separate review.

**Per-line underlying-limit check:**
- Auto liability per-occurrence limit must meet umbrella's underlying-limit requirement (commonly $250K/$500K/$100K). If under, recommend raising auto first — umbrella will not kick in over insufficient underlying.
- Home/renters liability typically must be at least $300K underlying.

**Output:** Recommended umbrella limit, the underlying-limit raises required first, and an estimated annual premium range.

## Steps

1. Read `net_worth`, `dependents`, `teen_drivers`, `properties`, `rental_properties`, `pets`, `public_profile`, `board_service` from `vault/insurance/config.md` (and `vault/wealth/` for net-worth).
2. Read auto and home/renters liability limits from policy records.
3. Read existing umbrella limit (if any).
4. Score exposure factors and compute recommended umbrella ($1M / $2M / $5M / $10M).
5. Identify underlying-limit gaps that must be raised before umbrella binds.
6. Estimate premium range.
7. Write evaluation to `vault/insurance/00_current/umbrella-evaluation-{YYYY-MM}.md`.
8. Call `task-flag-coverage-gap` and `task-update-open-loops` if a gap exists.

## Configuration

`vault/insurance/config.md`:
- `teen_drivers` (count), `pets` (list with breed if dog), `pool`, `boat`, `atv`, `motorcycle`
- `rental_properties` (count), `board_service` (list), `public_profile` (yes/no)
- `umbrella_target_multiplier` (default 1.5x net worth)

## Error Handling

- **Net worth unconfigured:** Recommend baseline $1M umbrella and flag that proper sizing requires net-worth input.
- **Underlying liability unknown:** Note that umbrella binds over underlying minimums and prompt user to verify limits.

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/insurance/00_current/policies/`, `~/Documents/aireadylife/vault/insurance/config.md`, optional `~/Documents/aireadylife/vault/wealth/`
- Writes: `~/Documents/aireadylife/vault/insurance/00_current/umbrella-evaluation-{YYYY-MM}.md`, `~/Documents/aireadylife/vault/insurance/open-loops.md`
