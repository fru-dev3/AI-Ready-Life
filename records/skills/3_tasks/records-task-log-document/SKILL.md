---
name: arlive-records-log-document
type: task
cadence: as-received
description: >
  Adds a new document to vault/records/ with document type, person, issue date, expiration date,
  issuing authority, and storage location (physical and digital).
---

# arlive-records-log-document

**Cadence:** As-received (when a new document is issued, renewed, or discovered during a cleanout)
**Produces:** Document record in the appropriate `vault/records/` subfolder

## What it does

This task creates a structured document record in the vault whenever a new document needs to be
tracked. It routes to the appropriate subfolder based on document type: identity documents (passport,
driver's license, birth certificate, SSN card) go to `00_identity/`, legal documents (will, POA,
trust, insurance policy) go to `01_legal/`. Each record captures the document holder's name,
issue date, expiration date (if applicable), issuing authority, physical storage location (e.g.,
"fireproof safe, home office"), and digital storage location (e.g., "1Password > Documents >
Passport"). Keeping both locations logged ensures the document can be found quickly in an emergency.

## Apps

None

## Vault Output

`vault/records/00_identity/`
