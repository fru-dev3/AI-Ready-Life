---
name: arlive-explore-flag-expiring-document
type: task
description: >
  Writes a document expiration flag to vault/explore/open-loops.md with document type, person,
  expiration date, renewal timeline, and action needed.
---

# arlive-explore-flag-expiring-document

**Trigger:** Called by explore document flows
**Produces:** Expiration flag entry in `vault/explore/open-loops.md`

## What it does

This task writes a structured expiration flag whenever a travel document is found to be expiring
within the 12-month warning window. Each flag captures the document type (passport, Global Entry,
TSA PreCheck, vaccination), the person it belongs to, the exact expiration date, and the renewal
lead time specific to that document type. It includes the recommended action (renew now vs. schedule
renewal) and, where applicable, links to the official renewal portal or form. Flags remain in
open-loops.md until the document has been successfully renewed and the record updated.

## Apps

None

## Vault Output

`vault/explore/open-loops.md`
