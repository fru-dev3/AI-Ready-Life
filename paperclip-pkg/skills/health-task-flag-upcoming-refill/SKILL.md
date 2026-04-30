---
type: task
cadence: monthly
description: >
  Single entry point for refill flagging. Reads vault/health/00_current/medications.md,
  computes projected refill dates (fill date + days supply − early-fill buffer), and writes
  a refill reminder to vault/health/open-loops.md for any prescription due within 30 days.
  Each entry includes: medication name, pharmacy name and phone, projected refill date,
  estimated out-of-pocket cost, HSA eligibility flag, auto-refill status, controlled-
  substance flag, and urgency tier (HIGH ≤7 days, MEDIUM 8–21 days, LOW 22–30 days).
  Called directly by health-medication-review — replaces the prior flow-check-refill-dates
  step.
---

# health-flag-upcoming-refill

**Cadence:** Monthly (called by medication review op)
**Produces:** Refill reminder entries in `vault/health/open-loops.md`

## What It Does

Single deterministic refill scanner. Reads the active medication list, computes projected refill dates, and writes structured, immediately actionable refill reminders for every prescription due within 30 days.

**Computation per medication:**
- Projected refill date = fill date + days supply − early-fill buffer
- Early-fill buffer: 7 days for 90-day supplies, 3 days for 30-day supplies, 0 otherwise (configurable)
- Flag any medication with days-until-refill ≤ 30
- Skip controlled substances for auto-refill but still flag (label "controlled — contact provider for new Rx if needed")
- For auto-refill enrollees, flag with "auto-refill enrolled — confirm processing"

Each flag entry contains:
- **Medication name and dosage** — e.g., "Metformin 500mg," "Levothyroxine 50mcg"
- **Pharmacy** — name, phone number, and whether mail-order or retail (from medications.md)
- **Projected refill date** — the calculated date the refill window opens (after applying the early-fill buffer)
- **Estimated out-of-pocket cost** — from the last fill record in medications.md; marked "estimate — may vary with deductible status"
- **HSA eligible** — YES | NO | CHECK PLAN (for OTC items)
- **Auto-refill enrolled** — YES or NO; if YES, action is "Confirm auto-refill will process — no call needed unless you need to update pharmacy"
- **Controlled substance** — YES or NO; if YES, action notes that early fill and auto-refill are not available
- **Urgency tier** — HIGH (≤7 days), MEDIUM (8–21 days), LOW (22–30 days)
- **Suggested action** — "Call [pharmacy] at [number] to request refill" or "Open [pharmacy app] and request refill for [medication]" or "Confirm auto-refill is scheduled"

When a prescription is marked HSA-eligible and the HSA balance in `vault/health/00_current/hsa-balance.md` is sufficient to cover the estimated cost, the flag adds a note: "Pay with HSA card to use tax-advantaged funds." When the HSA balance is low, the flag notes: "Consider paying out-of-pocket and filing for HSA reimbursement later if balance is replenished."

Items are auto-resolved by `health-update-open-loops` when the refill date has passed, keeping open-loops.md clean between monthly runs.

## Apps

None

## Vault Output

- `vault/health/open-loops.md` — refill reminder entry appended
