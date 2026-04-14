---
name: aireadylife-wealth-op-investment-review
type: op
cadence: monthly
description: >
  Monthly investment performance review; checks 401k and brokerage account returns,
  allocation drift from targets, and surfaces rebalancing needs. Triggers: "investment
  review", "check my portfolio", "am I due for rebalancing".
---

# aireadylife-wealth-investment-review

**Cadence:** Monthly (1st of month)
**Produces:** Investment performance summary in vault/wealth/01_investments/, rebalancing flags in vault/wealth/open-loops.md

## What it does

Pulls investment account data from vault/wealth/01_investments/ and runs `aireadylife-wealth-analyze-investment-performance` to calculate 30-day and year-to-date returns for each account. The op checks actual asset allocation (stocks/bonds/cash/international split) against the configured target allocation and flags any asset class that has drifted more than 5 percentage points from target. Rebalancing opportunities are surfaced as actionable flags: which funds to trim, which to add to, and the approximate dollar amounts involved. The review also checks that 401k contributions are on track to hit the annual maximum and flags if the contribution rate needs adjustment.

## Calls

- **Flows:** `aireadylife-wealth-analyze-investment-performance`
- **Tasks:** `aireadylife-wealth-update-open-loops`

## Apps

None

## Vault Output

`vault/wealth/01_investments/`
