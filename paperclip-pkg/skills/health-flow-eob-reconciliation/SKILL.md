---
type: flow
trigger: called-by-op
description: >
  Reads Explanation of Benefits (EOBs) from the user's health insurance carrier and matches
  each to the corresponding provider bill. Flags discrepancies between billed amount,
  insurance-paid amount, and patient responsibility. Detects duplicate charges, balance
  billing for in-network services, and surprise out-of-network charges. Tracks YTD
  deductible-met and out-of-pocket-max progress. Big quality-of-life skill — most users
  overpay because EOBs and bills aren't reconciled.
---

# health-eob-reconciliation

**Trigger:** Called by `op-monthly-sync`, on-demand when user uploads a new EOB or bill.
**Produces:** Reconciliation entries, deductible/OOP progress in `vault/health/02_briefs/`, flags in `open-loops.md`.

## What It Does

Insurance billing is adversarial by default — providers bill, insurers reprice, balances get sent back to the patient. This flow is the user's audit layer.

**Inputs:**
- EOBs in `vault/health/00_current/eobs/` (PDFs or structured text from the carrier portal)
- Provider bills in `vault/health/00_current/medical-bills/`
- Insurance plan terms from `vault/health/00_current/insurance-plan.md` (deductible, OOP max, copays)

**Per service date, match EOB to bill and check:**

1. **Billed vs allowed:** insurance "allowed amount" should be ≤ billed; provider must accept allowed amount for in-network services
2. **Patient responsibility match:** EOB-stated patient owe should match the provider bill amount
3. **Duplicate charges:** same CPT code, same date, same provider — flag for dispute
4. **Balance billing on in-network:** provider trying to bill the difference between billed and allowed for an in-network service is illegal in most cases — flag HIGH
5. **Surprise out-of-network:** in-network facility but out-of-network individual provider (anesthesia, radiology, ER) — flag for No Surprises Act dispute
6. **Pre-auth required but not obtained:** any service flagged as pre-auth-required where pre-auth status is missing — flag

**Tracking:**
- Sum patient-responsibility amounts YTD → deductible progress
- Sum out-of-pocket spend YTD → OOP-max progress (for `task-track-oop-max-status` if installed)
- Project month-of-deductible-met based on run rate

## Steps

1. List unprocessed EOBs (newer than `last_eob_reconciliation_date`)
2. For each, parse service date, CPT, billed, allowed, paid, patient responsibility
3. Find matching bill in `medical-bills/` by service date + provider
4. Apply six checks above
5. Write reconciliation row to `vault/health/02_briefs/YYYY-MM-eob-reconciliation.md`
6. Update YTD deductible and OOP totals in `vault/health/00_current/insurance-progress.md`
7. Surface flags via `task-update-open-loops` with severity (HIGH for balance billing / surprise charges; MEDIUM for amount mismatches; LOW for missing pre-auth records)

## Configuration

`vault/health/config.md`:
- `insurance_deductible_individual`, `insurance_deductible_family`
- `insurance_oop_max_individual`, `insurance_oop_max_family`
- `last_eob_reconciliation_date` (auto-updated)

## Vault Paths

- Reads: `vault/health/00_current/eobs/`, `medical-bills/`, `insurance-plan.md`
- Writes: `vault/health/02_briefs/YYYY-MM-eob-reconciliation.md`, `insurance-progress.md`
- Updates: `vault/health/open-loops.md`
