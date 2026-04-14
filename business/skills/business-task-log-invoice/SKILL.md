---
name: aireadylife-business-task-log-invoice
type: task
cadence: as-received
description: >
  Records a new invoice to vault/business/01_invoices/ with client, amount, date issued, due date,
  service description, and payment status.
---

# aireadylife-business-log-invoice

**Trigger:** Called when a new invoice is issued, as-received
**Produces:** Invoice record in vault/business/01_invoices/ and an optional overdue flag if recording a late invoice

## What it does

Accepts invoice details — either provided by the user directly or extracted from an invoice
document — and writes a structured record to vault/business/01_invoices/ with a consistent
filename format (YYYY-MM-DD-{client}-invoice-{number}.md). Each record captures: client name,
invoice number, amount billed, currency, date issued, payment due date, service description,
payment status (pending / paid / overdue), and payment received date if already paid. If the
invoice being logged already has a due date in the past and no payment has been recorded, logs it
with an overdue status and immediately calls the flag-overdue-invoice task so the alert appears
in vault/business/open-loops.md without waiting for the next monthly P&L review. Also checks
for any existing invoice with the same number and client to prevent duplicate records before
writing. The resulting invoice file feeds directly into the build-pl-summary flow for monthly
P&L calculations.

## Configuration

No special configuration required. Invoice files are stored in vault/business/01_invoices/
with date-prefixed filenames for easy sorting by month.

## Apps

None

## Vault Output

`vault/business/01_invoices/`
