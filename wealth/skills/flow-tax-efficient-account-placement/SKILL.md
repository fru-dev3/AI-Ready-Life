---
type: flow
trigger: called-by-op
description: >
  Reviews asset location across taxable, tax-deferred (Traditional 401k/IRA), and
  tax-free (Roth, HSA-invested) accounts. Flags suboptimal placement: bonds in taxable
  (tax-inefficient interest), high-growth in Traditional (taxed at ordinary income on
  withdrawal), low-yield in Roth (waste of tax-free space). Recommends asset moves.
---

# wealth-tax-efficient-account-placement

**Trigger:** Called by `op-investment-review` (annual cadence), `op-accountant-packet`.
**Produces:** Asset-location recommendations in investment-review brief.

## What It Does

Audits asset placement across the three account-tax categories. Different asset classes are most efficient in different account types.

**Tax-efficiency hierarchy (general guidance):**
- **Taxable accounts:** broad-market index funds (low turnover, qualified dividends), tax-exempt municipal bonds (for high earners), individual stocks held long-term
- **Tax-deferred (Traditional 401k/IRA):** taxable bonds, REITs (high ordinary-income distributions), high-turnover funds — anything that throws ordinary income
- **Tax-free (Roth, HSA-invested):** highest expected-return assets (small-cap, emerging markets, individual growth stocks) — gains are never taxed

**Flags:**
- Bonds (>20% of position) in taxable account → move to tax-deferred
- REITs in taxable → move to tax-deferred
- Cash / money market in Roth → move to taxable (waste of tax-free compounding)
- Low-cost-basis legacy positions → flag but don't recommend immediate moves (cap-gain cost may exceed benefit)

## Steps

1. Read holdings + account-type classification from `vault/wealth/00_current/`
2. Classify each holding by asset type (bond, stock, REIT, cash, alternative)
3. Apply placement-rules matrix (above)
4. For each suboptimal placement: estimate annual tax drag (tax-inefficient distribution × marginal rate)
5. Generate move recommendations: which positions to relocate, prioritizing biggest tax savings
6. Skip recommendations where realization cost would exceed annual savings benefit (low-cost-basis legacy positions)
7. Return findings to calling op

## Configuration

`vault/wealth/config.md`:
- `marginal_tax_rate_federal` (manual or computed from prior return)
- `marginal_tax_rate_state` (manual)
- `placement_overrides` — manual exemptions for positions that shouldn't be moved (sentimental, locked, etc.)

## Vault Paths

- Reads: `vault/wealth/00_current/` holdings + account classifications, config
- Output structure consumed by: `flow-analyze-investment-performance`
