---
type: flow
trigger: called-by-flow
description: >
  Computes the IRS safe-harbor target for estimated tax payments: 100% of prior-year
  total federal tax liability (or 110% if prior-year AGI exceeded $150,000), divided
  by 4 for the per-quarter target. Returns the cumulative target through the current
  quarter so callers can compute the remaining net payment. Standalone helper called
  by flow-build-estimate; can also be run user-facing for a quick "what's my safe
  harbor?" answer.
---

# flow-safe-harbor-calc

**Trigger:**
- Called by `flow-build-estimate`
- User input: "what's my safe harbor", "safe harbor amount", "how much do I need to pay to avoid penalty"

**Produces:** Structured safe-harbor result returned in memory; optionally writes to `vault/tax/00_current/YYYY-safe-harbor.md`.

## What It Does

Implements the safe-harbor rule from IRC §6654(d)(1)(B). Pay this amount across the year and you owe no underpayment penalty regardless of how high your actual current-year tax turns out to be.

**Math:**
- Read `prior_year_tax_liability` (Form 1040, line 24) and `prior_year_agi` (Form 1040, line 11) from config
- If prior-year AGI > $150,000 ($75,000 if married filing separately): multiplier = 1.10
- Else: multiplier = 1.00
- Annual safe-harbor target = `prior_year_tax_liability × multiplier`
- Quarterly target = annual ÷ 4
- Cumulative-through-quarter-N target = quarterly × N (1, 2, 3, or 4)

**Example.** Prior-year tax = $24,000, AGI = $185,000 → multiplier 1.10 → annual $26,400 → quarterly $6,600. Through Q3, cumulative target = $19,800.

**Edge cases handled:**
- Prior year was a partial-year return (job change, marriage, residency change): note that safe harbor still applies but flag for CPA review
- Prior year had zero tax liability: safe harbor is $0 — Method B (current-year actual) governs
- Prior year not yet filed (early-year run): use prior-prior year as fallback and flag

## Steps

1. Read `vault/tax/config.md`: `prior_year_tax_liability`, `prior_year_agi`, `filing_status`
2. Determine multiplier (1.00 vs 1.10) using AGI threshold ($150k / $75k MFS)
3. Compute annual and quarterly targets
4. If a quarter is specified by caller, compute cumulative-through-that-quarter target
5. Return structured result `{annual, quarterly, multiplier, cumulative_through_q}` to caller; or write to vault if run standalone

## Configuration

`vault/tax/config.md`:
- `prior_year_tax_liability` (Form 1040 line 24)
- `prior_year_agi` (Form 1040 line 11)
- `filing_status` (drives MFS $75k threshold)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/tax/config.md`
- Writes (standalone only): `~/Documents/aireadylife/vault/tax/00_current/YYYY-safe-harbor.md`
