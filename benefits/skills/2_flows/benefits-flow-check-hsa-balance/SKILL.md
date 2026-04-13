---
name: arlive-benefits-check-hsa-balance
type: flow
trigger: called-by-op
description: >
  Tracks HSA balance, YTD contributions vs IRS limit, investment threshold status, and pending
  qualified expense reimbursements.
---

# arlive-benefits-check-hsa-balance

**Trigger:** Called by `arlive-benefits-hsa-review`
**Produces:** HSA snapshot with contribution pace, investment threshold status, and pending reimbursement list

## What it does

Reads HSA account data from vault/benefits/02_hsa/ to build a complete picture of the account's
current state. Calculates how much has been contributed YTD by the employee and employer (if
applicable), compares to the IRS annual limit for the user's coverage tier (self-only vs family),
and projects whether the limit will be hit by December if contributions continue at the current
monthly pace. Checks the current cash balance against the user's configured investment threshold
and flags if uninvested cash exceeds it — meaning money should be moved to the investment sleeve.
Scans for logged qualified medical expenses in vault/benefits/02_hsa/pending-reimbursements.md
that have receipts saved but haven't been submitted for reimbursement yet. Returns the full
snapshot to the calling op.

## Configuration

File HSA statements in vault/benefits/02_hsa/. Log pending reimbursements in
vault/benefits/02_hsa/pending-reimbursements.md with receipt date, provider, and amount.
Set the investment threshold in vault/benefits/02_hsa/config.md.

## Steps

1. Read HSA account data from vault/benefits/02_hsa/ (balance, YTD contributions, coverage tier)
2. Calculate YTD contributions vs IRS limit (self-only or family) and project year-end pace
3. Check current cash balance against configured investment threshold; flag if over
4. List all entries in pending-reimbursements.md that are unpaid, sorted by date

## Apps

None

## Vault Output

`vault/benefits/02_hsa/`
