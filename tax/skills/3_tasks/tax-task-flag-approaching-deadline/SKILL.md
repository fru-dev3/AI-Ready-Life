---
name: arlive-tax-flag-approaching-deadline
type: task
cadence: called-by-op
description: >
  Writes a deadline alert to vault/tax/open-loops.md when a tax deadline is within
  30 days. Includes deadline type, due date, estimated payment amount, and entity.
---

# arlive-tax-flag-approaching-deadline

**Cadence:** Called by quarterly estimate and deadline watch ops
**Produces:** Deadline alert entries in vault/tax/open-loops.md

## What it does

Called whenever a tax deadline is identified as falling within the next 30 days. Writes a structured deadline alert to vault/tax/open-loops.md that includes the deadline type (estimated tax payment, extension filing, return due, franchise tax, annual report), the exact due date, the entity or individual the deadline applies to, the estimated payment or filing amount, and the recommended action with the specific portal or method to use (IRS Direct Pay, EFTPS, state revenue portal, registered agent renewal portal). Urgency tiers: critical for deadlines within 7 days, high for 8-14 days, medium for 15-30 days. Each entry links to the source document or calculation in vault/tax/ so the payer has immediate context when acting on the alert.

## Apps

None

## Vault Output

`vault/tax/open-loops.md`
