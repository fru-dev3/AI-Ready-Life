---
name: arlive-insurance-flow-check-renewal-dates
type: flow
trigger: called-by-op
description: >
  Scans all policy renewal dates and flags anything renewing within 60 days.
  Categorizes each renewal as shop (get competing quotes), auto-renew (no action),
  or coverage review (limits need reassessment before renewal).
---

# arlive-insurance-check-renewal-dates

**Trigger:** Called by `arlive-insurance-renewal-watch`
**Produces:** A renewal timeline with action-categorized renewals and recommended next steps per policy returned to the calling op.

## What it does

Reads all policy renewal dates from `vault/insurance/00_current/` and calculates days until renewal for each policy. Any policy renewing within 60 days is included in the output. Categorizes each upcoming renewal into one of three action types. Shop: policies where shopping for competing quotes is recommended — typically auto and home insurance (competitive market, significant premium variation between carriers), policies where the current premium has increased more than 10% from prior year, or policies where coverage limits need to increase along with the renewal. Auto-renew: policies where the current carrier and terms are optimal and no coverage changes are needed — typically life insurance (locked-in premiums) or group disability through employer (no shopping needed). Coverage review: policies where the coverage amount needs to be reassessed before renewing — home insurance when property value has changed significantly, life insurance after an income or dependent status change, rental property insurance after a renovation or reappraisal. For each "shop" categorized policy, generates the specific action steps: what coverage parameters to bring to quote comparison, when to request quotes (ideally 30-45 days before renewal), and what the current premium is as a comparison baseline. Returns the full renewal timeline with action plans to the calling op.

## Steps

1. Read all policy renewal dates from `vault/insurance/00_current/`
2. Calculate days until renewal for each policy
3. Filter to policies renewing within 60 days
4. Categorize each: shop / auto-renew / coverage review based on policy type and change signals
5. For "shop" policies: generate quote comparison action steps and comparison baseline
6. For "coverage review" policies: flag the specific limit or coverage type needing reassessment
7. Return categorized renewal timeline with action steps to calling op

## Apps

vault file system

## Vault Output

`vault/insurance/00_current/`
