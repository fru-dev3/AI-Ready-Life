---
type: flow
trigger: called-by-op
scope: advanced/optional
description: >
  ADVANCED / OPTIONAL — for investors with taxable brokerage accounts and meaningful
  volatility. Reads taxable-account positions (cross-domain with wealth plugin), flags
  individual lots with >$1,000 unrealized loss, and identifies wash-sale-safe
  replacement candidates so the user can harvest losses without disqualifying the
  deduction. Cap of $3,000 net capital loss against ordinary income per year; excess
  carries forward.
---

# flow-tax-loss-harvesting-scan

**Scope:** Advanced / optional. Skip if `vault/wealth/` has no taxable brokerage accounts or if `tax_loss_harvesting_enabled: false` in config.

**Trigger:**
- Called by: `op-year-end-planning-sweep`, `op-quarterly-estimate`
- User input: "tax loss harvesting", "harvest losses", "TLH scan"

**Produces:** `vault/tax/00_current/YYYY/tlh-scan.md` with candidate lots and replacements.

## What It Does

Scans taxable-account positions for unrealized losses worth harvesting. A harvested loss offsets capital gains dollar-for-dollar; net losses up to $3,000/year offset ordinary income; excess carries forward indefinitely. Long-term lots are usually preferred for harvesting since losing long-term gains is more painful.

**Per-lot evaluation:**
- Position symbol, lot purchase date, basis, current value, unrealized P&L
- Holding period: short-term (≤1 year) or long-term (>1 year)
- Loss threshold: lots with unrealized loss ≥$1,000 become candidates (configurable)

**Wash-sale rule (IRC §1091).** Cannot deduct a loss if "substantially identical" security is purchased within 30 days before or 30 days after the sale, in any account (including IRA, spouse's account). Disqualified loss is added to the basis of the replacement shares, deferring rather than disallowing.

**Replacement-candidate logic.**
- For mutual funds / ETFs: identify a fund tracking a similar but distinct index (e.g., VTI ↔ ITOT both broad US market but different indexes — generally accepted as not substantially identical)
- For individual stocks: substantially identical = the same security; replacement requires 30-day wait, an option position, or a different sector ETF (no substitute that gives identical exposure without wash-sale risk)
- Flag any pending dividend reinvestments, recent purchases (last 30 days), or buys scheduled in the next 30 days that would trigger wash-sale

**Estimated tax savings:**
- For loss harvested against capital gains: `loss_amount × marginal_cap_gains_rate` saved
- For loss harvested against ordinary income (up to $3,000 net): `loss_amount × marginal_ordinary_rate` saved
- Excess carries forward — note the carryforward amount

## Steps

1. Read taxable-account positions from `vault/wealth/00_current/` (or `vault/tax/00_current/` if no wealth plugin)
2. Identify lots with unrealized loss ≥$1,000 (configurable)
3. Scan transaction history for last 30 days and any scheduled buys (DRIP, recurring) for wash-sale risk
4. For each candidate, suggest a replacement that maintains similar exposure but is not substantially identical
5. Compute estimated tax savings using config marginal rates
6. Write candidate list to `vault/tax/00_current/YYYY/tlh-scan.md`
7. If aggregate harvestable loss >$5,000, surface to year-end-planning-sweep brief

## Configuration

`vault/tax/config.md`:
- `tax_loss_harvesting_enabled` (true/false)
- `tlh_loss_threshold` (default $1,000)
- `marginal_ordinary_rate`, `marginal_cap_gains_rate` (for savings estimate)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/wealth/00_current/`, `~/Documents/aireadylife/vault/tax/config.md`
- Writes: `~/Documents/aireadylife/vault/tax/00_current/YYYY/tlh-scan.md`
