---
name: aireadylife-records-op-document-audit
type: op
cadence: quarterly
description: >
  Quarterly document audit that checks all identity documents, legal documents, and certificates
  for expiration, missing documents, and storage gaps. Triggers: "document audit", "records check",
  "ID expiration", "important documents".
---

# aireadylife-records-document-audit

**Cadence:** Quarterly (1st of Jan, Apr, Jul, Oct)
**Produces:** Document status report with expiration flags, missing document gaps, and renewal actions

## What it does

This op audits every important document in the vault's records domain: identity documents (passport,
driver's license, Social Security card, birth certificate), legal documents (will, power of attorney,
trust documents, insurance policies), and credentials (professional certifications, diplomas). It
checks expiration dates against a 12-month warning horizon, flags documents that are missing entirely
(e.g., no will on file), and notes documents that exist physically but have no digital backup recorded.
Legal documents are flagged if they haven't been reviewed in more than 3 years, even without a formal
expiration date, since life changes may render them outdated.

## Calls

- **Flows:** `aireadylife-records-check-expiring-documents`
- **Tasks:** `aireadylife-records-flag-expiring-id`, `aireadylife-records-update-open-loops`

## Apps

None

## Vault Output

`vault/records/00_identity/`
