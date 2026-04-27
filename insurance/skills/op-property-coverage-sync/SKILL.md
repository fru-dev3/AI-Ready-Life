---
type: op
trigger: user-facing
cadence: annual (skipped automatically for renters)
description: >
  For users who own a home or rental property: pulls a current replacement-cost
  estimate (Zillow/Redfin/manual entry), compares to dwelling coverage on the
  homeowners or landlord policy, flags coinsurance risk if dwelling coverage falls
  below 80% of replacement cost. Reruns annually or when a major renovation is
  logged. Auto-skipped for renters (`scope: renter` in config).
---

# insurance-property-coverage-sync

**Trigger phrases:**
- "property coverage check"
- "is my home coverage still right"
- "dwelling coverage review"
- "replacement cost check"

**Cadence:** Annual; rerun on major renovation.

## Scope Gate

Reads `scope` from `vault/insurance/config.md`. If `scope: renter` and no rental properties are listed, this op exits with a single line: *"You're configured as a renter — property coverage sync isn't applicable. Personal property coverage is reviewed in `op-coverage-audit`."*

## What It Does

Replacement cost diverges from market value, especially in appreciated markets. A $700K home in an appreciated market may have a $400K rebuild cost; a $300K home in a high-construction-cost area may have a $450K rebuild cost. Most homeowners and landlord policies enforce an 80% coinsurance clause: if dwelling coverage at the time of loss is less than 80% of replacement cost, the insurer pays only a proportional share of partial losses.

**Per property in scope:**
- Pull a replacement-cost estimate. Three sources, in order: (1) the carrier's stated replacement cost on the most recent declarations page; (2) a contractor or appraisal estimate if available in `vault/home/` or `vault/real-estate/`; (3) a square-footage × $/sq ft default ($150-$300/sq ft based on construction quality and metro from config).
- Compare current dwelling coverage limit to estimated replacement cost.
- Compute coverage-to-replacement ratio and flag coinsurance risk if <80%.
- Recommend a target dwelling coverage limit at 100% of estimated replacement cost (or 125% if the policy offers guaranteed replacement endorsement).
- Estimate the premium delta to close the gap (typically $10-$25/year per $10,000 of additional dwelling coverage).

## Steps

1. Confirm `scope` is not renter-only.
2. Read property list from `vault/insurance/config.md` (and from `vault/home/`, `vault/real-estate/` if they exist).
3. For each property: read the current homeowners or landlord policy from `vault/insurance/00_current/policies/`.
4. Pull replacement cost: declarations page first, then `vault/home/00_current/replacement-cost-estimate.md` or `vault/real-estate/00_current/{property}/replacement-cost-estimate.md`, then sq-ft × $/sq ft default.
5. Compute ratio and severity (significant <65%, moderate 65-80%, no flag ≥80%).
6. Write a per-property report to `vault/insurance/02_briefs/property-coverage-{YYYY}/{property-slug}.md`.
7. Call `task-flag-coverage-gap` for each flagged property.
8. Call `task-update-open-loops`.
9. Optionally call `task-sync-to-cross-agents` to propagate the updated dwelling coverage to home/real-estate vaults.

## Configuration

`vault/insurance/config.md`:
- `scope` — `renter` | `homeowner` | `landlord` | `homeowner+landlord`
- `properties` — list of `{address, sq_ft, construction_quality, metro_cost_psf, flood_zone, earthquake_zone}`
- `replacement_cost_default_psf` — fallback (default $200)

## Error Handling

- **No declarations replacement cost AND no appraisal AND missing sq footage:** Skip the property and surface a one-line prompt requesting sq footage.
- **Property listed in config but no policy in vault:** Flag as MISSING-POLICY.

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/insurance/00_current/policies/`, `~/Documents/aireadylife/vault/insurance/config.md`, optional `~/Documents/aireadylife/vault/home/`, `~/Documents/aireadylife/vault/real-estate/`
- Writes: `~/Documents/aireadylife/vault/insurance/02_briefs/property-coverage-{YYYY}/`, `~/Documents/aireadylife/vault/insurance/open-loops.md`
