---
name: arlive-records-flow-build-subscription-summary
type: flow
trigger: called-by-op
description: >
  Builds a subscription table with service name, monthly cost, annual equivalent, last-used
  estimate, and keep/cancel recommendation.
---

# arlive-records-build-subscription-summary

**Trigger:** Called by `arlive-records-subscription-review`
**Produces:** Subscription summary table sorted by cost with usage flags and recommendations

## What it does

This flow reads the complete subscription list from the vault and assembles a summary table that
makes the total cost and usage picture immediately visible. For each subscription it shows the
service name, billing cycle and amount, monthly equivalent cost, annual equivalent cost, the date
last used (from usage logs if available, or estimated), a usage flag if more than 2 months have
passed since last use, and a keep or cancel recommendation based on usage recency and cost. The
table is sorted by monthly cost descending so the most expensive unused subscriptions are surfaced
first for potential cancellation.

## Steps

1. Read all active subscriptions from `vault/records/02_subscriptions/`
2. Calculate total monthly and annual recurring cost across all active subscriptions
3. Flag subscriptions where last-used date is more than 2 months ago
4. Calculate potential annual savings from canceling all flagged subscriptions
5. Flag subscriptions with annual renewal approaching within 30 days

## Apps

None

## Vault Output

`vault/records/02_subscriptions/`
