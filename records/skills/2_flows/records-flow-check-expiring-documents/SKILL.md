---
name: arlive-records-flow-check-expiring-documents
type: flow
trigger: called-by-op
description: >
  Scans all identity and legal documents for expiration dates within 12 months and flags renewal
  actions with appropriate lead times.
---

# arlive-records-check-expiring-documents

**Trigger:** Called by `arlive-records-document-audit`
**Produces:** Expiration report with per-document status, renewal lead times, and action steps

## What it does

This flow reads the complete document inventory from the vault and validates every document with an
expiration date against the 12-month warning threshold. For identity documents it applies document-
specific renewal lead times: driver's license (1-2 weeks), passport (10-13 weeks standard, 4-6 weeks
expedited), Global Entry (starts 6 months before expiration). It also checks legal documents for a
last-reviewed date and flags any will, power of attorney, or healthcare directive not reviewed in
3+ years as potentially outdated. Each flagged document produces a structured action item with the
document type, expiration date, renewal lead time, and the specific steps or link to begin renewal.

## Steps

1. Read document inventory from `vault/records/00_identity/` and `vault/records/01_legal/`
2. Check each document's expiration date against today + 12 months
3. Flag expiring identity documents with document-specific renewal lead times and action steps
4. Check legal documents (will, POA) for last-reviewed date; flag if not reviewed in 3+ years

## Apps

None

## Vault Output

`vault/records/00_identity/`
