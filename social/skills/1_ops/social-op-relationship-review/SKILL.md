---
name: arlive-social-relationship-review
type: op
cadence: monthly
description: >
  Monthly relationship health check that reviews contact recency, flags relationships going cold,
  and generates a prioritized outreach queue. Triggers: "relationship review", "who should I reach
  out to", "social health", "relationship check".
---

# arlive-social-relationship-review

**Cadence:** Monthly (1st of month)
**Produces:** Relationship health table with health status per contact and prioritized outreach queue

## What it does

This op reviews every tracked contact in the vault and assesses relationship health based on how
recently contact was made. It segments contacts into three health statuses: healthy (contacted within
90 days), fading (90-180 days since contact), and overdue (180+ days for close contacts, 365+ days
for professional contacts). It then generates a prioritized outreach queue with the highest-priority
contacts to reach out to this month, including a suggested outreach type (text, call, coffee, email)
tailored to the relationship tier and how long it's been. Close relationships gone overdue are
flagged to open-loops.md so they stay visible.

## Calls

- **Flows:** `arlive-social-build-relationship-health-summary`, `arlive-social-build-outreach-queue`
- **Tasks:** `arlive-social-flag-overdue-contact`, `arlive-social-update-open-loops`

## Apps

None

## Vault Output

`vault/social/00_contacts/`
