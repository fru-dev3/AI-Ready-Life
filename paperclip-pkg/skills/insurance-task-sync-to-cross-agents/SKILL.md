---
type: task
trigger: user-or-flow
description: >
  After a coverage audit or policy sync, propagates the current insurance carrier and
  plan details into the vaults of dependent domains: health vault gets the current
  health carrier, plan name, deductible, OOP max; home vault gets the current
  homeowners or renters carrier and dwelling/personal property limits; real-estate
  vault (if present) gets landlord policies per property; wealth vault gets life and
  disability face values for net-worth and estate calculations.
---

# insurance-sync-to-cross-agents

**Trigger:**
- User input: "sync insurance to other domains"
- Called by: `op-coverage-audit`, `op-monthly-sync`, `flow-sync-policy-docs`

## What It Does

Insurance facts live in the insurance vault but are needed by other domain skills. The health plugin's deductible-tracking skill needs to know the current health plan's deductible. The wealth plugin's estate review needs life-insurance face values. The real-estate plugin's per-property review needs the current landlord policy. Without sync, each domain ends up with stale or missing facts.

**Cross-domain writes (only if the target domain vault exists):**
- `vault/health/00_current/insurance.md` — current health carrier, plan name, deductible, OOP max, in-network primary care, FSA/HSA contribution limits if applicable.
- `vault/home/00_current/insurance.md` — current homeowners or renters carrier, policy number, dwelling coverage (if owner) or personal-property coverage (if renter), liability limit, renewal date.
- `vault/real-estate/00_current/{property-slug}-insurance.md` — landlord policy details per property (only if real-estate vault is installed and properties exist).
- `vault/wealth/00_current/insurance-snapshot.md` — life face values, disability monthly benefit, umbrella limit (for net-worth and estate-plan inputs).
- `vault/career/00_current/disability-from-employer.md` — group LTD/STD details if the policy is employer-sponsored (so career plugin's benefits review sees them).

## Steps

1. Read normalized policy records from `vault/insurance/00_current/policies/`.
2. For each target domain (`health`, `home`, `real-estate`, `wealth`, `career`): check whether the vault exists at `~/Documents/aireadylife/vault/{domain}/`.
3. For existing vaults, project the relevant subset of fields into the target file (overwriting prior sync output, but never deleting non-sync fields — write under a clearly marked `## insurance-sync` section).
4. Include a `synced_at` timestamp and a back-reference to the source policy record path.
5. For property/landlord syncs, skip if the user is configured as a renter with no rental properties (`scope: renter` in `vault/insurance/config.md`).
6. Return a list of files written and domains skipped.

## Configuration

`vault/insurance/config.md`:
- `scope` — one of `renter`, `homeowner`, `landlord`, `homeowner+landlord`. Drives which property syncs run.
- `cross_domain_sync_enabled` — default true; can be turned off per domain.

## Error Handling

- **Target vault not present:** Silently skip; log the skip in the return summary.
- **Target vault exists but file is locked / write fails:** Surface the path and the error; do not retry destructively.

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/insurance/00_current/policies/`
- Writes: `~/Documents/aireadylife/vault/{health,home,real-estate,wealth,career}/00_current/...` (only if target vault exists)
