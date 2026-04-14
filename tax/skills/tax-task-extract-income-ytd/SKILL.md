---
name: aireadylife-tax-task-extract-income-ytd
type: task
cadence: called-by-op
description: >
  Reads YTD income totals from vault/tax/ for use by flows calculating estimated
  tax. Returns income broken down by source type.
---

# aireadylife-tax-extract-income-ytd

**Cadence:** Called by tax flows that need current YTD income figures
**Produces:** Structured YTD income summary by source, returned to the calling flow

## What it does

A utility task called by `aireadylife-tax-build-estimate` and other flows that need current year-to-date income figures without loading every income document individually. Reads from vault/tax/ across all income source files — W-2 pay stubs, 1099-NEC records, rental income logs, brokerage dividend and interest records, capital gains/loss records, and business profit/loss summaries — and returns a structured income total broken down by source type: W-2 wages, self-employment income, rental income, capital gains (short-term and long-term separately), dividend income, interest income, and other income. The task also returns total YTD federal and state withholding from W-2 and estimated payment records, so the calling flow has everything needed to compute a net tax estimate in a single call.

## Apps

None

## Vault Output

`vault/tax/`
