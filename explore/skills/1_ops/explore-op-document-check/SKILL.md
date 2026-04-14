---
name: aireadylife-explore-op-document-check
type: op
cadence: quarterly
description: >
  Quarterly travel document audit that checks passport, Global Entry, TSA PreCheck, and vaccination
  records for expiration within 12 months. Triggers: "document check", "passport check",
  "travel documents", "Global Entry renewal".
---

# aireadylife-explore-document-check

**Cadence:** Quarterly (1st of Jan, Apr, Jul, Oct)
**Produces:** Travel document status report with expiration flags and renewal action items

## What it does

This op audits every travel-related document in the vault against a 12-month expiration horizon. It
checks passport validity (including the 6-month rule beyond return date required by most countries),
Global Entry and TSA PreCheck membership expiration, and any vaccination requirements tied to wishlist
destinations. Documents nearing expiration are flagged with specific renewal lead times (e.g., passport
renewal takes 10-13 weeks standard, 4-6 weeks expedited). Each flag is written to the open-loops file
so renewal actions stay visible until resolved.

## Calls

- **Flows:** `aireadylife-explore-check-travel-docs`
- **Tasks:** `aireadylife-explore-flag-expiring-document`, `aireadylife-explore-update-open-loops`

## Apps

None

## Vault Output

`vault/explore/01_documents/`
