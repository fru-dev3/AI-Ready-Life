---
type: task
trigger: user-or-flow
description: >
  Parses Gmail for recurring-charge receipts (Stripe, PayPal, Apple, Google, direct merchant
  emails) and seeds or refreshes the subscription registry at 00_current/subscriptions.md.
  Subsumes the prior flow-build-subscription-summary work — this task both detects new
  subscriptions from email and rebuilds the active table.
---

# records-detect-subscriptions-from-email

**Cadence:** Monthly (1st, before `op-review-brief`) or on-demand.
**Produces:** Updated `00_current/subscriptions.md` and a delta report of new / changed / cancelled subscriptions.

## What It Does

Subscription creep is primarily an email problem, not a bank-statement problem. Apple, Google, Stripe, PayPal, and most SaaS vendors send a receipt for every recurring charge. This task scans those receipts and produces an authoritative subscription registry without requiring bank-feed access.

For each detected subscription it records: service name, category (streaming, software, news, cloud storage, gym, etc.), billing amount, billing cycle (monthly / annual / quarterly), renewal date inferred from the most recent charge, first-seen date, and last-seen date. The task also computes the monthly equivalent and annual equivalent for cross-service comparison and applies a low-usage flag when last-seen has not advanced in a full billing cycle.

This task subsumes the previous `flow-build-subscription-summary` work: the summary table is rebuilt every run rather than maintained as a separate flow. `op-review-brief` reads the resulting `subscriptions.md` directly.

## Steps

1. Query Gmail for receipt-shaped messages over a 90-day window (configurable).
2. Match against known biller patterns (Apple, Google Play, Stripe, PayPal, common SaaS senders).
3. Group receipts by merchant + amount; infer billing cycle from gap between charges.
4. Read prior `00_current/subscriptions.md`; compute delta (new, changed amount, missing for >1 cycle = likely cancelled).
5. Rewrite `00_current/subscriptions.md` with the authoritative table sorted by monthly cost descending.
6. Write the delta report to `00_current/subscriptions-delta-YYYY-MM-DD.md`.
7. Surface delta highlights to `op-review-brief` and `task-update-open-loops`.

## Configuration

`~/Documents/aireadylife/vault/records/config.md`:
- `subscription_lookback_days` (default 90)
- `subscription_low_usage_cycles` (default 2)
- `subscription_essential_overrides` — list of services manually marked essential regardless of usage

## Vault Paths

- Reads: Gmail (via connector), `01_prior/` for prior month's table
- Writes: `~/Documents/aireadylife/vault/records/00_current/subscriptions.md`
- Writes: `~/Documents/aireadylife/vault/records/00_current/subscriptions-delta-YYYY-MM-DD.md`
