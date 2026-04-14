---
name: aireadylife-benefits-op-401k-review
type: op
cadence: monthly
description: >
  Monthly 401k review. Reviews contribution rate vs employer match, YTD contribution progress,
  and investment allocation health.
  Triggers: "401k review", "retirement contribution", "employer match", "401k allocation".
---

# aireadylife-benefits-401k-review

**Cadence:** Monthly
**Produces:** 401k review — match capture, YTD vs limit, allocation assessment

## What it does

Calculates whether contribution rate fully captures the employer match. Computes YTD contributions vs annual IRS limit. Flags if approaching limit early (risk of losing match) or tracking below limit. Reviews investment allocation for age-appropriate target-date alignment.

## Vault Output

`vault/benefits/01_retirement/401k-review-YYYY-MM.md`
