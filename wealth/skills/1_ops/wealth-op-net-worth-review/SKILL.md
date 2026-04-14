---
name: arlive-wealth-op-net-worth-review
type: op
cadence: monthly
description: >
  Monthly net worth snapshot; calculates total assets vs liabilities, month-over-month
  delta, and annotates major balance changes. Triggers: "net worth review", "monthly
  wealth check", "how is my net worth trending".
---

# arlive-wealth-net-worth-review

**Cadence:** Monthly (1st of month)
**Produces:** Net worth snapshot in vault/wealth/04_briefs/, updated totals in vault/wealth/00_accounts/

## What it does

Runs on the first of each month to produce a single, authoritative net worth number and the story behind it. It calls `arlive-wealth-build-net-worth-summary` to aggregate all asset balances (checking, savings, brokerage, 401k, real estate equity) and subtract all outstanding liabilities (mortgage, auto loans, student loans, credit card balances). The resulting table shows current totals, prior month totals, and a delta for each line item so meaningful changes are immediately visible. Any account that moved more than $5,000 in either direction is automatically annotated with a note (e.g., "401k contribution + market gain"). The summary is written to vault/wealth/04_briefs/ as the monthly brief and all flags are consolidated via `arlive-wealth-update-open-loops`.

## Calls

- **Flows:** `arlive-wealth-build-net-worth-summary`
- **Tasks:** `arlive-wealth-update-open-loops`

## Apps

None

## Vault Output

`vault/wealth/04_briefs/`
