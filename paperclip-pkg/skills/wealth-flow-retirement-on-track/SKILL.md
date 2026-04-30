---
type: flow
trigger: called-by-op
description: >
  Given current retirement balances, savings rate, target retirement age, and target annual
  spend in retirement, projects probability of reaching the retirement number using
  configurable assumptions (default: 4% safe withdrawal, 7% real return on stocks, 2%
  inflation). Reports projected balance at target age, the gap (if any), and what change
  closes it (years longer, save more, spend less).
---

# wealth-retirement-on-track

**Trigger:** Called by `op-investment-review`, `op-net-worth-review`, on-demand ("am I on track to retire").
**Produces:** Retirement-readiness section in investment / net-worth brief.

## What It Does

Deterministic projection (not Monte Carlo) using simple compounding to estimate whether the user's current trajectory reaches their target retirement number.

**Inputs from config + current state:**
- Current retirement balances (401k + IRA + Roth + HSA invested + taxable earmarked for retirement)
- Annual contribution rate (employee + employer match)
- Years to target retirement age
- Target annual spend in retirement
- Configurable assumptions: nominal return, inflation, withdrawal rate (4% default)

**Calculation:**
- Future value at target age: FV = current × (1+r)^n + contributions × [((1+r)^n − 1) / r]
- Required portfolio for target spend: target_spend ÷ withdrawal_rate (e.g., $80k spend ÷ 4% = $2M required)
- On-track if FV ≥ required, else gap = required − FV

**Recommendations when off-track:**
- Years to delay retirement to close the gap (compounding the existing trajectory)
- Additional annual contribution needed to close the gap by original target age
- Lower spend that current trajectory can support

Includes Social Security in projection if user has configured estimated benefit (defaults to off).

## Steps

1. Read current retirement balances from `vault/wealth/00_current/`
2. Read contribution rates from config (or `vault/career/00_current/` pay-stub data if available)
3. Compute target portfolio at target age
4. Project balance at target age using config assumptions
5. Compute gap (if any)
6. Generate three remedies (delay / save more / spend less) with quantified amounts
7. Write summary to `vault/wealth/02_briefs/YYYY-retirement-on-track.md`

## Configuration

`vault/wealth/config.md`:
- `target_retirement_age` (e.g., 65)
- `target_annual_spend_retirement`
- `withdrawal_rate` (default 0.04)
- `nominal_return_assumption` (default 0.07)
- `inflation_assumption` (default 0.02)
- `social_security_monthly` (optional; default 0)
- `retirement_account_types` (which accounts count toward retirement)

## Vault Paths

- Reads: `vault/wealth/00_current/` retirement balances, `vault/career/00_current/` pay-stub data (if available), config
- Writes: `vault/wealth/02_briefs/YYYY-retirement-on-track.md`
