---
name: arlive-insurance-op-claims-review
type: op
cadence: on-demand
description: >
  On-demand claims review; tracks active claim status, required documentation,
  adjuster follow-ups, and settlement timeline. Surfaces what action is needed
  today to keep a claim moving forward.
  Triggers: "claim status", "insurance claim", "file a claim", "claims review".
---

# arlive-insurance-claims-review

**Cadence:** On-demand (triggered whenever a claim is active or a new claim needs to be filed)
**Produces:** A claims status report in `vault/insurance/01_claims/` with action items and open loop entries for pending steps.

## What it does

Manages the complete lifecycle of active insurance claims from initial filing through settlement. When a new claim needs to be filed, walks through the required steps: collecting documentation (photos, receipts, police report if applicable), identifying the correct claims phone number or portal from the policy record in `vault/insurance/00_current/`, and logging the initial claim number and date filed to `vault/insurance/01_claims/`. For active claims, reads the claims log to determine current status and identifies what action is required to advance the claim: submitting additional documentation, following up with the adjuster, reviewing a settlement offer, or disputing an estimate. Flags claims that have been open more than 30 days without a status update as potentially stalled and recommends an escalation call to the adjuster's supervisor. For settlement offers, provides a simple adequacy check against the original claim documentation to identify whether the offer covers the full documented loss. Updates open loops with all pending claim actions and their deadlines, so claims don't fall through the cracks during a busy period.

## Calls

- **Flows:** `arlive-insurance-build-coverage-summary`
- **Tasks:** `arlive-insurance-update-open-loops`

## Apps

vault file system

## Vault Output

`vault/insurance/01_claims/`
