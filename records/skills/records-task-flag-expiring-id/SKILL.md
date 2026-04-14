---
name: aireadylife-records-task-flag-expiring-id
type: task
description: >
  Writes an ID expiration flag to vault/records/open-loops.md with document type, person,
  expiration date, renewal lead time needed, action steps, and link to renewal portal.
---

# aireadylife-records-flag-expiring-id

**Trigger:** Called by records document flows
**Produces:** ID expiration flag in `vault/records/open-loops.md`

## What it does

This task writes a detailed expiration flag whenever the document audit flow finds an identity
document expiring within the 12-month warning window. Each flag is specific to the document type,
with the renewal lead time calibrated to that document (e.g., REAL ID-compliant driver's license
renewal at a DMV appointment typically needs 1-2 weeks; Global Entry renewal can begin 6 months
before expiration). The flag includes the document holder's name (important for family records),
the exact expiration date, the deadline to begin renewal to ensure continuity, step-by-step renewal
actions, and a direct link to the issuing agency's renewal portal or form.

## Apps

None

## Vault Output

`vault/records/open-loops.md`
