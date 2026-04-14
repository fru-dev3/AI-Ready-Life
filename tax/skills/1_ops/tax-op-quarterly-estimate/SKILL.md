---
name: arlive-tax-op-quarterly-estimate
type: op
cadence: quarterly
description: >
  Calculates the current quarter estimated tax payment due by projecting YTD income,
  adjusting for withholding and prior payments, and computing underpayment risk.
  Triggers: "estimated tax", "quarterly payment due", "what do I owe this quarter".
---

# arlive-tax-quarterly-estimate

**Cadence:** Quarterly (due dates: Apr 15, Jun 15, Sep 15, Jan 15)
**Produces:** Estimated tax calculation in vault/tax/01_estimates/, deadline flags in vault/tax/open-loops.md

## What it does

Runs in the weeks before each quarterly estimated tax deadline to determine whether a payment is needed and how much. It calls `arlive-tax-build-estimate` to sum YTD income across all sources — W-2 wages, 1099 income, rental income, capital gains, and business income — then subtracts YTD withholding and any prior estimated payments already made. The projection uses the IRS safe harbor method (110% of prior year tax liability) to calculate the minimum payment needed to avoid underpayment penalties. The op also runs the actual-liability method in parallel and returns whichever produces the lower payment. The deadline flag is written via `arlive-tax-flag-approaching-deadline` and all outputs are consolidated via `arlive-tax-update-open-loops`.

## Calls

- **Flows:** `arlive-tax-build-estimate`
- **Tasks:** `arlive-tax-flag-approaching-deadline`, `arlive-tax-update-open-loops`

## Apps

None

## Vault Output

`vault/tax/01_estimates/`
