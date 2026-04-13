---
name: arlive-insurance-build-coverage-summary
type: flow
trigger: called-by-op
description: >
  Compiles a coverage matrix table: all active policies with carrier, coverage type,
  limits, premium, deductible, and renewal date. Flags any policies missing from
  the expected coverage set.
---

# arlive-insurance-build-coverage-summary

**Trigger:** Called by `arlive-insurance-review-brief`, `arlive-insurance-claims-review`
**Produces:** A structured coverage matrix table with all active policies and a missing-policy flag list returned to the calling op.

## What it does

Reads all policy documents and records from `vault/insurance/00_current/` to assemble a complete coverage inventory. For each active policy, extracts: carrier name, policy type (auto, home/renters, life, disability, umbrella, rental property, dental/vision, health), policy number, coverage limits (per-occurrence and aggregate where applicable), deductible amounts, monthly/annual premium, and renewal date. Formats all policies into a coverage matrix table for side-by-side review. Then checks the assembled coverage set against the expected minimum coverage baseline for the user's life profile: auto liability, home or renters, life (if dependents), short-term disability, long-term disability, and umbrella (if net worth exceeds $500K). Flags any policy type in the expected set that has no corresponding active policy in the vault — a missing umbrella policy or no long-term disability coverage are common gaps that require explicit acknowledgment. Returns both the coverage matrix table and the missing-policy flag list to the calling op for report assembly.

## Steps

1. Read all policy files from `vault/insurance/00_current/`
2. Extract key fields per policy: carrier, type, limits, deductible, premium, renewal date
3. Format all policies into a coverage matrix table
4. Check coverage set against expected minimum baseline (auto, home/renters, life, disability, umbrella)
5. Flag any expected policy type with no corresponding active policy found in vault
6. Return coverage matrix and missing-policy flags to calling op

## Apps

vault file system

## Vault Output

`vault/insurance/00_current/`
