---
name: aireadylife-business-task-flag-overdue-invoice
type: task
description: >
  Writes an overdue invoice flag to vault/business/open-loops.md when an invoice is unpaid more
  than 30 days past due. Includes client, invoice number, amount, days overdue, and recommended action.
---

# aireadylife-business-flag-overdue-invoice

**Trigger:** Called by `aireadylife-business-pl-review` and `aireadylife-business-log-invoice` when an overdue invoice is detected
**Produces:** Overdue invoice flag entry in vault/business/open-loops.md with full invoice details and recommended action

## What it does

Reads invoice records from vault/business/01_invoices/ (or receives invoice data from the calling
op) and identifies any invoice that has a payment due date more than 30 days in the past with
a status of pending or overdue. For each overdue invoice found, calculates the exact number of
days overdue (due date to today) and determines the recommended escalation action based on severity:
31-45 days — send a polite payment reminder email; 46-60 days — follow up by phone; >60 days —
consider collections or legal escalation. Writes a 🔴 urgent flag to vault/business/open-loops.md
for each overdue invoice with: client name, invoice number, dollar amount, original due date,
days overdue, and the recommended action for that severity tier. Checks for an existing unresolved
flag for the same invoice before writing to avoid creating duplicate alerts on each review cycle.

## Configuration

No special configuration required. Works from invoice data in vault/business/01_invoices/.
The 30-day threshold and escalation tier thresholds (45, 60 days) can be adjusted in
vault/business/01_invoices/config.md if needed.

## Apps

None

## Vault Output

`vault/business/open-loops.md`
