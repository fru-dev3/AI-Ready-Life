---
name: arlive-tax-op-document-sync
type: op
cadence: as-received
description: >
  Annual tax document collection op (January through April); tracks W-2s, 1099s,
  K-1s, and brokerage statements as they arrive and flags missing documents.
  Triggers: "tax document arrived", "W-2 came in", "1099 received", "log a tax doc".
---

# arlive-tax-document-sync

**Cadence:** As-received (active January through April 15)
**Produces:** Document inventory in vault/tax/00_documents/, missing document flags in vault/tax/open-loops.md

## What it does

Serves as the intake op for all tax documents during filing season. Each time a document arrives — via email, mail, or employer portal — this op is triggered to log it and update the completeness checklist. It calls `arlive-tax-document-completeness` to check the full expected document list (configured based on income sources, entities, and investments active in the prior year) against what has actually been received. Documents are categorized by type: W-2 (employer), 1099-NEC/MISC (freelance/business), 1099-B/DIV/INT (investments), K-1 (partnerships/trusts), 1098 (mortgage interest), and state-specific forms. Any document expected but not yet received after the typical issuer deadline (January 31 for W-2s/1099s, March 15 for K-1s) is flagged via `arlive-tax-update-open-loops`.

## Calls

- **Flows:** `arlive-tax-document-completeness`
- **Tasks:** `arlive-tax-update-open-loops`

## Apps

None

## Vault Output

`vault/tax/00_documents/`
