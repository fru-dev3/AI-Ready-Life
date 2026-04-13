---
name: arlive-records-subscription-review
type: op
cadence: monthly
description: >
  Monthly subscription review that lists all active subscriptions with monthly cost, flags unused
  ones, and calculates total recurring spend. Triggers: "subscription review", "recurring charges",
  "cancel subscriptions", "subscription audit".
---

# arlive-records-subscription-review

**Cadence:** Monthly (1st of month)
**Produces:** Subscription table with total recurring cost, usage flags, and cancel recommendations

## What it does

This op produces a complete picture of all recurring subscription charges — software, streaming,
memberships, and services — so nothing is being paid for invisibly. It reads the subscription
registry from the vault, calculates total monthly and annual recurring spend across all active
subscriptions, and flags any subscription where usage hasn't been logged in more than 2 months.
Flagged subscriptions get a cancel recommendation with the estimated annual savings. The op also
checks for subscriptions whose annual renewal is approaching in the next 30 days so there's time
to decide whether to renew or cancel before being charged.

## Calls

- **Flows:** `arlive-records-build-subscription-summary`
- **Tasks:** `arlive-records-update-open-loops`

## Apps

None

## Vault Output

`vault/records/02_subscriptions/`
