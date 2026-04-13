---
name: arlive-insurance-flag-renewal-within-60-days
type: task
description: >
  Writes a renewal alert to vault/insurance/open-loops.md with policy type, carrier,
  renewal date, current premium, and recommended action (shop / auto-renew / review).
---

# arlive-insurance-flag-renewal-within-60-days

**Produces:** A new renewal alert entry in `vault/insurance/open-loops.md`.

## What it does

Called by `arlive-insurance-renewal-watch` (and `arlive-insurance-check-renewal-dates`) whenever a policy renewal is identified within 60 days. Writes a structured renewal alert to `vault/insurance/open-loops.md` that provides everything needed to take action without looking up the policy. The alert includes: the policy type and carrier name, the policy number, the exact renewal date, the current annual premium, the prior year premium (if available, to surface any premium increase), the action category assigned by the renewal analysis (shop / auto-renew / coverage review), and specific action steps appropriate to that category. For "shop" renewals: lists what to bring to quotes (current coverage limits, deductible, any bundling opportunities), when to request quotes (30 days before renewal at latest), and a reminder that auto-renew will occur if no action is taken. For "coverage review" renewals: specifies which coverage parameter to reassess and why. The action-by date is set to 30 days before renewal (not the renewal date itself) to ensure enough lead time for shopping or adjustments. This prevents the most common insurance mistake: auto-renewing without review because the deadline crept up unnoticed.

## Apps

vault file system

## Vault Output

`vault/insurance/open-loops.md`
