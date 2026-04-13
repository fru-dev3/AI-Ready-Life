---
name: arlive-wealth-build-net-worth-summary
type: flow
trigger: called-by-op
description: >
  Aggregates all account balances and liabilities into a net worth table with
  month-over-month delta for each line item.
---

# arlive-wealth-build-net-worth-summary

**Trigger:** Called by `arlive-wealth-net-worth-review`
**Produces:** Net worth table with asset/liability totals and MoM delta, written to vault/wealth/04_briefs/

## What it does

Reads all account balance records from vault/wealth/00_accounts/ and all liability records from vault/wealth/02_debt/ to build a complete net worth table. Asset categories include: liquid (checking, savings, money market), tax-advantaged (401k, IRA, HSA), taxable investments (brokerage), real estate equity (current estimated value minus outstanding mortgage), and other assets. Liabilities are listed individually (mortgage, auto loans, student loans, credit cards) with current balances. The flow computes total assets, total liabilities, and net worth, then calculates the month-over-month delta for each line item by comparing to the prior month's snapshot stored in vault. The output is a structured document ready to be included in the monthly brief.

## Steps

1. Read all account balance files from vault/wealth/00_accounts/
2. Read all liability balance records from vault/wealth/02_debt/
3. Categorize assets (liquid, tax-advantaged, taxable, real estate, other)
4. Sum total assets and total liabilities
5. Calculate net worth and MoM delta vs. prior month snapshot in vault

## Apps

None

## Vault Output

`vault/wealth/04_briefs/`
