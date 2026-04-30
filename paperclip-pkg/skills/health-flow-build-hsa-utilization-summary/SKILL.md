---
type: flow
trigger: called-by-op
description: >
  Builds a monthly HSA (Health Savings Account) utilization summary. Reports YTD qualified
  spend, current cash balance, current invested balance, contribution status vs annual limit,
  and a check against the configured invest-above threshold (default $2,000 cash buffer).
  Categorizes spend by IRS Publication 502 category. Flags receipts missing for any HSA
  withdrawal (audit risk). HSA balances and statements are uploaded manually since most HSA
  custodians lack a public API.
---

# health-build-hsa-utilization-summary

**Trigger:** Called by `op-monthly-sync`, `op-review-brief`, on-demand.
**Produces:** Monthly HSA brief in `vault/health/02_briefs/`.

## What It Does

Most HSA holders leave money on the table — either by not contributing to the limit, or by leaving cash uninvested above the everyday-spending threshold. This flow surfaces both.

**Computed fields:**
- **YTD qualified spend:** sum of HSA card transactions + reimbursements pulled from `hsa-spend-log.md`, categorized by Pub 502 (medical, dental, vision, prescription, mental health, OTC, other)
- **Cash balance** and **invested balance** from latest HSA statement upload
- **Contribution status:** YTD contributed vs annual limit (self-only or family, plus $1,000 catch-up if age 55+); months remaining to max out
- **Invest-above check:** if cash balance > configured threshold (default $2,000), flag the excess as candidate for investment
- **Receipts integrity:** for every withdrawal in the spend log, verify a receipt is filed in `vault/health/00_current/hsa-receipts/`; flag missing receipts (IRS audit risk for HSA distributions)
- **Estimated tax savings:** YTD contributions × user's marginal tax rate (read from cross-domain tax config if present)

## Steps

1. Read latest HSA statement from `vault/health/00_current/hsa-balance.md`
2. Read YTD HSA card and reimbursement transactions from `hsa-spend-log.md`
3. Categorize each transaction; sum totals
4. Read `hsa_annual_limit_self`, `hsa_annual_limit_family`, `hsa_catchup_eligible` from config
5. Compute contribution-to-limit gap and remaining months
6. Compare cash balance to `hsa_invest_above_threshold`; flag excess
7. Cross-check withdrawals against receipts folder; flag missing
8. Write brief to `vault/health/02_briefs/YYYY-MM-hsa-summary.md`
9. Surface invest-above and missing-receipt items to open-loops

## Configuration

`vault/health/config.md`:
- `hsa_invest_above_threshold` (default 2000)
- `hsa_annual_limit_self`, `hsa_annual_limit_family`, `hsa_catchup_eligible`
- `hsa_custodian_name` (informational; for any cross-domain reads)

## Vault Paths

- Reads: `vault/health/00_current/hsa-balance.md`, `hsa-spend-log.md`, `hsa-receipts/`
- Writes: `vault/health/02_briefs/YYYY-MM-hsa-summary.md`
- Updates: `vault/health/open-loops.md`
