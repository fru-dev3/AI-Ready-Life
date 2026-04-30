---
type: flow
trigger: called-by-op
scope: advanced/optional
description: >
  ADVANCED / OPTIONAL — for users with employer equity comp. Models the three
  equity-comp tax events that catch tech workers off-guard: RSU vest (ordinary
  income at vest, supplemental withholding often insufficient), ISO exercise (AMT
  exposure on bargain element), and ESPP qualifying-vs-disqualifying disposition
  (ordinary income on the discount in disqualifying year). For each event, projects
  tax owed and flags estimated-payment adjustments.
---

# flow-equity-comp-tax-events

**Scope:** Advanced / optional. Only runs if `vault/tax/config.md` lists active equity comp (RSUs, ISOs, ESPP). Skip entirely otherwise.

**Trigger:**
- Called by: `op-quarterly-estimate`, `op-year-end-planning-sweep`, `op-cpa-packet`
- User input: "RSU vest tax", "ISO AMT", "ESPP tax", "equity comp tax events"

**Produces:** `vault/tax/00_current/YYYY/equity-comp-events.md` with per-event tax modeling.

## What It Does

Equity comp produces tax events that look minor on the pay stub but can produce 5-figure tax surprises. This flow models each event so the user can adjust withholding or estimated payments before the surprise lands.

**Event 1 — RSU vest.**
At vest, the FMV of the shares is W-2 ordinary income. Employer typically withholds federal at 22% supplemental rate (37% over $1M YTD). For users in 32%+ marginal brackets, 22% is short. Model:
- Vest date, share count, FMV at vest, W-2 wages added
- Federal withholding actually applied (22% supplemental + state)
- Marginal-rate gap: (marginal - 22%) × wages added = under-withholding
- Recommendation: increase next-quarter estimated payment by gap amount

**Event 2 — ISO exercise.**
Exercising ISOs (and holding) creates no regular-tax income but creates an AMT preference item equal to (FMV at exercise − strike price) × shares = bargain element. Model:
- Exercise date, share count, strike, FMV at exercise
- Bargain element (AMT preference)
- 2025 AMT exemption: $137,000 single / $220,700 MFJ; phaseout begins $626,350 / $1,252,700
- Run simplified AMT calc: AMTI = regular taxable income + bargain element; tax = 26% on first $232,600 of AMTI over exemption, 28% above
- If AMT > regular tax: flag the AMT amount and the action — pay it with Q3/Q4 estimate or sell some shares before year-end (disqualifying disposition removes AMT preference)
- AMT credit carries forward and recovers in future years when regular tax > AMT

**Event 3 — ESPP disposition.**
ESPP shares sold within 2 years of grant or 1 year of purchase = disqualifying. The discount (typically 15% × FMV at offering or purchase, lower of) becomes W-2 ordinary income in the year of sale; remainder is capital gain. Qualifying disposition (held both periods): only the 15% statutory discount on offering price is ordinary; remainder is long-term cap gain.
- Model qualifying vs disqualifying for each lot
- Show tax delta — disqualifying typically costs 5–15% of proceeds vs qualifying
- Flag any lots within 6 months of crossing into qualifying

## Steps

1. Read `vault/tax/config.md` and equity-comp records from `vault/tax/00_current/YYYY/equity-comp/` (or cross-domain `vault/wealth/`)
2. For each RSU vest in the year, model under-withholding gap
3. For each ISO exercise, run AMT comparison (regular tax vs AMT); recommend payment or disqualifying disposition
4. For each ESPP lot disposed (or eligible for disposition), model qualifying vs disqualifying
5. Aggregate total estimated tax adjustment across all equity-comp events
6. Write to `vault/tax/00_current/YYYY/equity-comp-events.md`
7. If aggregate adjustment >$1,000, write HIGH-severity flag to open-loops with action: "Increase next quarterly estimate by $X"

## Configuration

`vault/tax/config.md`:
- `equity_comp_active` (true if any RSU/ISO/ESPP)
- `marginal_federal_rate_estimate` (for RSU under-withholding gap)
- `state_tax_rate_estimate`

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/tax/00_current/YYYY/equity-comp/`, optionally `~/Documents/aireadylife/vault/wealth/00_current/`
- Writes: `~/Documents/aireadylife/vault/tax/00_current/YYYY/equity-comp-events.md`, `~/Documents/aireadylife/vault/tax/open-loops.md`
