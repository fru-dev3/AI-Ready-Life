---
name: arlive-business-flow-check-compliance-status
type: flow
trigger: called-by-op
description: >
  Reviews entity compliance checklist: annual report filed, registered agent current, tax elections
  in place, and operating agreement updated. Flags anything due within 60 days or overdue.
---

# arlive-business-check-compliance-status

**Trigger:** Called by `arlive-business-compliance-review`
**Produces:** Compliance status table with green/yellow/red status per item and a sorted deadline list

## What it does

Reads the compliance checklist from vault/business/03_compliance/compliance-checklist.md, which
is a structured list of every entity obligation with its frequency, last-completed date, and
next-due date. For each item, calculates how many days until the due date (or how many days overdue
if past due) and assigns a status: 🔴 overdue, 🟡 due within 60 days, 🟢 current. Items covered
include: state annual report, registered agent renewal, federal and state payroll tax filings,
S-Corp election confirmation, operating agreement review, quarterly estimated tax payments, and
any domain-specific licenses. Also reads vault/business/03_compliance/ for any supporting
documents (filed annual report, registered agent confirmation) to verify items that are marked
complete actually have backing documentation. Returns a status table sorted by urgency to the
calling op.

## Configuration

Maintain vault/business/03_compliance/compliance-checklist.md with all recurring obligations.
After completing a filing, update the last-completed date and next-due date in the checklist
immediately. Store filed documents in vault/business/03_compliance/ with consistent naming.

## Steps

1. Read compliance checklist from vault/business/03_compliance/compliance-checklist.md
2. Calculate days-until-due or days-overdue for each item relative to today
3. Assign status: 🔴 overdue, 🟡 due within 60 days, 🟢 current
4. Check for supporting documentation in vault/business/03_compliance/ for items marked complete
5. Return status table sorted by urgency (overdue first, then soonest due)

## Apps

None

## Vault Output

`vault/business/03_compliance/`
