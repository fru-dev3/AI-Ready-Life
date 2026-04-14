---
name: arlive-benefits-op-review-brief
type: op
cadence: monthly
description: >
  Monthly benefits brief. Pulls 401k status, HSA balance, coverage flags, and open items.
  Triggers: "benefits brief", "show my benefits", "401k status", "HSA balance", "benefits summary".
---

# arlive-benefits-review-brief

**Cadence:** Monthly (1st of month)
**Produces:** Benefits brief — 401k status, HSA balance, coverage flags, open items

## What it does

Reads the benefits vault state, computes 401k match capture rate and YTD progress, checks HSA balance against investment threshold, reviews coverage for open issues, and surfaces open enrollment timing. Produces a concise monthly brief.

## Calls

- **Tasks:** reads vault/benefits/state.md or vault-demo/benefits/state.md

## Vault Output

`vault/benefits/01_retirement/brief-YYYY-MM.md`
