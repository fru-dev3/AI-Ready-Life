---
name: aireadylife-tax-flow-document-completeness
type: flow
trigger: called-by-op
description: >
  Checks the expected tax document checklist against what has been received in the
  vault and flags anything expected but not yet received.
---

# aireadylife-tax-document-completeness

**Trigger:** Called by `aireadylife-tax-document-sync` and `aireadylife-tax-entity-compliance`
**Produces:** Completeness report in vault/tax/00_documents/ with received/missing/pending status for each expected document

## What it does

Reads the expected document checklist from vault/tax/00_documents/ — a configuration file that lists every document expected for the tax year based on active income sources, investments, entities, and properties — and compares it against the received documents directory. Each expected document is marked as received (file present and named correctly), pending (past issuer deadline but not yet received — flag for follow-up), or not yet due (issuer deadline hasn't passed). The flow enforces consistent file naming so documents are always findable: W2_{employer}_{year}.pdf, 1099NEC_{payer}_{year}.pdf, etc. When called by the entity compliance op, it narrows its scope to entity-level documents only (K-1s, payroll summaries, franchise tax receipts).

## Steps

1. Read expected document list from vault/tax/00_documents/ config
2. Scan received documents directory and match against expected list
3. Mark each document: received, pending (overdue), or not yet due
4. Flag documents past issuer deadline but not yet received
5. Confirm naming convention compliance for all received documents

## Apps

None

## Vault Output

`vault/tax/00_documents/`
