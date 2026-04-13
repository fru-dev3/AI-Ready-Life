---
name: arlive-health-flag-upcoming-refill
type: task
cadence: monthly
description: >
  Writes a medication refill reminder to vault/health/open-loops.md when a
  prescription is due within 30 days. Includes medication name, pharmacy, and date.
---

# arlive-health-flag-upcoming-refill

**Cadence:** Monthly (called by medication review op)
**Produces:** Refill reminder entries in vault/health/open-loops.md

## What it does

Called by `arlive-health-check-refill-dates` for each medication flagged as due within 30 days. Writes a structured reminder to vault/health/open-loops.md that includes the medication name, the pharmacy where it was last filled, the projected refill date, the estimated out-of-pocket cost, and whether the medication is HSA-reimbursable. The entry is tagged with urgency based on days remaining: high urgency for medications due within 7 days, medium for 8-21 days, low for 22-30 days. Items are automatically resolved by `arlive-health-update-open-loops` once the refill date has passed, keeping the open-loops list clean between monthly runs.

## Apps

None

## Vault Output

`vault/health/open-loops.md`
