---
name: aireadylife-wealth-op-debt-review
type: op
cadence: quarterly
description: >
  Quarterly debt review; calculates payoff timelines, total remaining interest costs,
  and models the impact of extra payments across all liabilities. Triggers: "debt
  review", "payoff timeline", "how much interest am I paying".
---

# aireadylife-wealth-debt-review

**Cadence:** Quarterly (1st of Jan, Apr, Jul, Oct)
**Produces:** Debt summary table in vault/wealth/02_debt/, savings milestone flags in vault/wealth/open-loops.md

## What it does

Runs quarterly to give a complete picture of all outstanding liabilities and the cost of carrying them. It calls `aireadylife-wealth-build-debt-summary` to pull current balances, interest rates, and minimum payments for each loan, then calculates the projected payoff date and total remaining interest cost at the current payment pace. The op models two extra-payment scenarios — adding $100/month and $500/month — and shows how much interest each scenario saves and how much sooner debts are paid off. When a debt reaches a meaningful milestone (e.g., mortgage drops below $300k, auto loan paid off), `aireadylife-wealth-flag-savings-milestone` is called to log the achievement and suggest where to redirect the freed cash flow.

## Calls

- **Flows:** `aireadylife-wealth-build-debt-summary`
- **Tasks:** `aireadylife-wealth-flag-savings-milestone`, `aireadylife-wealth-update-open-loops`

## Apps

None

## Vault Output

`vault/wealth/02_debt/`
