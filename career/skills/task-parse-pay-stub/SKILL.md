---
type: task
trigger: user-or-flow
description: >
  Extracts gross pay, net pay, federal/state withholding, FICA, pre-tax deductions
  (401k, HSA, FSA, health/dental/vision premiums), post-tax deductions, employer-paid benefits,
  and YTD totals from a single pay stub PDF or screenshot from any payroll provider. Appends
  a structured entry to the monthly pay-stub log and flags anomalies vs. the prior stub.
---

# career-parse-pay-stub

**Trigger phrases:**
- "parse this pay stub"
- "log my pay stub"
- "extract from pay stub"
- "add this paycheck"

**Cadence:** Per pay period (typically biweekly or semimonthly); user-triggered.

## What It Does

Reads one pay stub document (PDF, image, or HTML export from your payroll provider — ADP, Workday, Gusto, Paychex, Rippling, etc.) and extracts a complete structured record. Each pay period has many line items that drift over time (401k contribution rate changed at open enrollment, ESPP withhold started, new HSA election, mid-year medical premium adjustment, bonus stub in March) and a monthly review only catches drift if the data is structured.

**Extracted fields:**
- `pay_period_start`, `pay_period_end`, `pay_date`
- Earnings: `regular_pay`, `overtime`, `bonus`, `commission`, `equity_vest_imputed_income`, `other_earnings`, `gross_pay`
- Pre-tax deductions: `401k_traditional`, `401k_roth`, `hsa`, `fsa_health`, `fsa_dependent_care`, `health_premium`, `dental_premium`, `vision_premium`, `commuter`, `other_pretax`
- Taxes withheld: `federal`, `state`, `social_security`, `medicare`, `state_disability`, `local`
- Post-tax: `espp`, `garnishments`, `other_posttax`
- Employer contributions: `401k_match`, `hsa_employer`, `health_premium_employer`, `other_employer`
- Totals: `net_pay`, `ytd_gross`, `ytd_federal_withheld`, `ytd_401k_total`, `ytd_hsa_total`

**Anomaly flags vs. prior stub:**
- Gross pay change >1% with no bonus/commission line → flag (potential raise, role change, or hours error)
- Withholding change >5% → flag (W-4 update or bracket-shift verification)
- New deduction line not in prior stub → flag for verification
- Missing deduction line that was in prior stub → flag (may have been disenrolled accidentally)

## Steps

1. Read input pay stub (file path, paste, or screenshot).
2. Extract all fields above; if a field is genuinely absent on the stub, leave blank (do not fabricate).
3. Read most recent prior entry from `vault/career/00_current/pay-stubs.md`.
4. Compute deltas vs. prior; identify anomalies per rules above.
5. Append new entry as YAML block to `vault/career/00_current/pay-stubs.md`.
6. Save the original stub file to `vault/career/00_current/pay-stubs/YYYY-MM-DD-paystub.{ext}`.
7. For each anomaly, call `task-update-open-loops` with severity MEDIUM and a one-line context note.
8. Return parsed entry + anomaly summary.

## Configuration

`vault/career/config.md`:
- `payroll_provider` (free text — used for parser hints)
- `pay_frequency` (biweekly / semimonthly / weekly / monthly)

## Vault Paths

- Reads: input pay stub document, `~/Documents/aireadylife/vault/career/00_current/pay-stubs.md`
- Writes: `~/Documents/aireadylife/vault/career/00_current/pay-stubs.md`, `pay-stubs/`, `vault/career/open-loops.md`
