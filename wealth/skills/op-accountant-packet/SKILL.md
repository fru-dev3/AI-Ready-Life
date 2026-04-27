---
type: op
trigger: user-facing
description: >
  Compiles the complete year-end accountant / tax-prep packet by January 31. Aggregates
  W-2s, 1099s, 1098s, 1095s, K-1s, deduction summaries, charitable-giving summaries,
  estimated-payment records, and net-worth and cash-flow summaries into a single
  zip/folder ready to hand to a CPA or upload to TurboTax. Cross-domain with tax plugin.
---

# wealth-accountant-packet

**Trigger phrases:**
- "build accountant packet"
- "tax prep packet"
- "year-end packet"
- "ready for the CPA"
- "compile tax documents"

**Cadence:** Annual; user-triggered Jan 1–31.

## What It Does

Aggregates every document a CPA (or tax-software import) needs into one organized folder/zip per tax year.

**Required components:**
- Income documents: W-2s, 1099-NEC, 1099-INT, 1099-DIV, 1099-B, 1099-R, 1099-K, 1099-MISC
- Deduction documents: 1098 (mortgage interest), 1098-T (tuition), 1098-E (student-loan interest), property-tax statements, charitable-giving receipts (>$250 + summary)
- Health-insurance: 1095-A (marketplace), 1095-B/C (employer)
- Investment summary: cap gains/losses summary, dividend summary, cost-basis records
- Year-end statements: 401k, IRA, HSA, 529 (for contribution verification)
- Schedule C (self-employed): income + categorized expenses + home-office documentation
- Schedule E (landlords): rental income + expenses + depreciation schedule
- K-1s (partnership/S-corp distributions)
- Estimated-payment record: Q1–Q4 federal + state confirmations
- Prior-year return + prior-year carryforwards (capital losses, AMT credit)
- Net-worth and cash-flow summaries from `02_briefs/`

**Output:**
- Folder: `vault/tax/02_briefs/YYYY-accountant-packet/` (if tax plugin installed) or `vault/wealth/02_briefs/YYYY-accountant-packet/`
- README.md inside the folder cataloging every component with present/missing status
- Optional zip: `YYYY-accountant-packet.zip` for delivery

## Steps

1. Determine tax year (default: prior calendar year)
2. Build component checklist (above)
3. For each component, search vault for matching documents (check tax plugin's `vault/tax/00_current/` first if installed, then `vault/wealth/00_current/`, then `vault/records/00_current/`)
4. Copy/symlink found documents into packet folder organized by category
5. For missing components, create entry in README.md with status MISSING and next-step guidance
6. Generate cover summary: total income by stream, total deductions, estimated tax owed, prior-year comparison
7. Optional: zip the folder
8. Surface MISSING items to open-loops

## Configuration

`vault/wealth/config.md`:
- `tax_year` (default: prior year)
- `cpa_name` and `cpa_email` (optional — for cover note)
- `entity_types` (W-2-only / self-employed / landlord / multi-entity)

## Vault Paths

- Reads: `vault/tax/00_current/`, `vault/wealth/00_current/`, `vault/records/00_current/` (cross-domain)
- Writes: `vault/wealth/02_briefs/YYYY-accountant-packet/` or `vault/tax/02_briefs/YYYY-accountant-packet/`
