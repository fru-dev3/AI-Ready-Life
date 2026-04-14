---
name: arlive-records-op-monthly-sync
type: op
cadence: monthly
description: >
  Full records data sync on the 1st of each month. Checks all expiration dates,
  reviews subscription costs, and flags any documents or memberships needing action.
  Triggers: "records monthly sync", "sync records", "refresh records vault".
---

# arlive-records-monthly-sync

**Cadence:** Monthly (1st of month)
**Produces:** Records vault refreshed with updated expiration countdown and subscription review

## What it does

Full records sync: recalculates days-until-expiration for all tracked documents, flags any newly entering the 90-day alert window, reviews all subscriptions for price changes or unused status, checks for any legal documents that should be reviewed (e.g., wills more than 5 years old), and verifies storage location notes are current. Ends by triggering Records Review Brief.

## Configuration

Set your expiration alert threshold and household members in `vault/records/config.md`.

## Calls

- **Flows:** `arlive-records-check-expirations`, `arlive-records-review-subscriptions`, `arlive-records-check-legal-currency`
- **Then triggers:** `arlive-records-review-brief`

## Apps

`gdrive` (optional)

## Vault Output

`vault/records/` (all subdomains refreshed)
