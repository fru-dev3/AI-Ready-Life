---
name: aireadylife-tax-flow-build-deadline-list
type: flow
trigger: called-by-op
description: >
  Builds a prioritized list of all tax deadlines falling within the next 90 days,
  sorted by urgency with payment amounts and entity context.
---

# aireadylife-tax-build-deadline-list

**Trigger:** Called by `aireadylife-tax-deadline-watch`
**Produces:** Deadline list document in vault/tax/02_deadlines/ filtered to next 90 days and sorted by urgency

## What it does

Reads the full tax deadline calendar from vault/tax/02_deadlines/ — which covers federal estimated payments, federal filing deadlines, state deadlines for each active jurisdiction, entity-level deadlines (LLC annual reports, franchise tax, S-Corp payroll deposits), and extension deadlines — and filters to all items falling within the next 90 days. Each deadline is enriched with its associated entity (personal, LLC name, S-Corp name), the estimated or required payment amount where applicable, and the filing or payment method (IRS Direct Pay, EFTPS, state portal). The list is sorted by days remaining, with deadlines within 14 days marked as urgent, 15-30 days as approaching, and 31-90 days as upcoming. Extension eligibility is noted where relevant.

## Steps

1. Read the full deadline calendar from vault/tax/02_deadlines/
2. Filter to deadlines falling within the next 90 days
3. Enrich each deadline with entity context, payment amount, and payment method
4. Sort by days remaining (ascending)
5. Apply urgency tiers: urgent (<14 days), approaching (15-30), upcoming (31-90)

## Apps

None

## Vault Output

`vault/tax/02_deadlines/`
