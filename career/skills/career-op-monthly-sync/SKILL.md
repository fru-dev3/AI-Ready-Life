---
name: aireadylife-career-op-monthly-sync
type: op
cadence: monthly
description: >
  Full career data sync on the 1st of each month. Refreshes comp data from payroll portal,
  LinkedIn activity, and career documents. Triggers: "career monthly sync", "sync career data".
---

# aireadylife-career-monthly-sync

**Cadence:** Monthly (1st of month)
**Produces:** Career vault refreshed with comp, LinkedIn activity, and organized documents

## What it does

Full career data sync: pulls compensation data from ADP/Workday/payroll portal, syncs LinkedIn profile views and recruiter messages, organizes career documents in vault. Ends by triggering Career Review Brief.

## Calls

- **Flows:** `aireadylife-career-sync-comp-data`, `aireadylife-career-sync-linkedin`, `aireadylife-career-organize-docs`
- **Then triggers:** `aireadylife-career-review-brief`

## Apps

`adp` or `workday`, `linkedin`, `gdrive` (optional)

## Vault Output

`vault/career/` (all subdomains refreshed)
