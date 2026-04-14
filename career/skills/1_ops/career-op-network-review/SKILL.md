---
name: arlive-career-op-network-review
type: op
cadence: monthly
description: >
  Monthly network health check; reviews relationship recency, identifies warm
  reconnects, and surfaces strategic new connections worth pursuing. Triggers:
  "network review", "who should I reach out to", "networking check".
---

# arlive-career-network-review

**Cadence:** Monthly (1st of month)
**Produces:** Network health summary in vault/career/04_briefs/, outreach drafts for priority contacts

## What it does

Runs monthly to ensure your professional network stays warm and strategically active, not just a cold contacts list. It calls `arlive-career-review-pipeline` to surface any applications or pipeline contacts needing follow-up, then scans the network contacts stored in vault/career/ for relationships that have gone dormant (last interaction more than 90 days ago) among people who are strategically relevant — hiring managers at target companies, former colleagues now in relevant roles, or connectors in your target industry. For each warm reconnect identified, `arlive-career-draft-outreach-message` is called to produce a personalized draft message that references something specific and relevant to the contact rather than a generic "staying in touch" note. The monthly cadence keeps relationships alive at a sustainable pace — 2-4 outreach messages per month — without feeling transactional.

## Calls

- **Flows:** `arlive-career-review-pipeline`
- **Tasks:** `arlive-career-draft-outreach-message`, `arlive-career-update-open-loops`

## Apps

LinkedIn

## Vault Output

`vault/career/04_briefs/`
