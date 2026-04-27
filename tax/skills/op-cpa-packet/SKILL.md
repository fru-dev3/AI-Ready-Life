---
type: op
trigger: user-facing
cadence: annual
description: >
  Compiles the complete CPA / tax-prep packet by January 31. Aggregates W-2s, 1099s
  (NEC / MISC / B / DIV / INT / R / K), 1098s (mortgage / tuition / student loan),
  1095s (health coverage), K-1s, deduction summary, charitable summary, estimated
  payment record, prior-year return, and prior-year carryforwards into a single
  organized folder ready to hand to a CPA or upload to TurboTax. Self-employment
  (Schedule C), rental (Schedule E), and entity (K-1) sections light up only if
  configured.
---

# op-cpa-packet

**Trigger phrases:**
- "build CPA packet"
- "tax prep packet"
- "ready for the accountant"
- "compile tax documents"
- "year-end tax packet"

**Cadence:** Annual; user-triggered Jan 1 – Jan 31.

## What It Does

Aggregates every document a CPA (or tax-software import) needs into one organized folder per tax year. Organized so the CPA can be productive in 30 minutes instead of 3 hours.

**Required components:**
- **Income documents:** W-2(s), 1099-NEC, 1099-INT, 1099-DIV, 1099-B (with cost-basis), 1099-R, 1099-K, 1099-MISC, 1099-G (state refunds, unemployment), K-1(s)
- **Deduction documents:** 1098 (mortgage interest), 1098-T (tuition), 1098-E (student-loan interest), property-tax statements, charitable summary from `task-track-charitable-giving`, medical expense log, business expense log
- **Health-insurance:** 1095-A (marketplace), 1095-B / 1095-C (employer)
- **Investment summary:** capital gains/losses summary, dividend summary, cost-basis records, wash-sale adjustments
- **Year-end statements:** 401k, IRA, HSA, 529 (for contribution verification)
- **Estimated-payment record:** Q1–Q4 federal + state confirmations from `vault/tax/00_current/payment-log.md`
- **Prior-year return + carryforwards:** capital-loss carryforward, AMT credit, charitable carryforward, NOL
- **Optional sections (only if configured):**
  - Self-employed: Schedule C income + categorized expenses + home-office log from `task-track-home-office`
  - Landlord: Schedule E from `flow-rental-property-summary` if installed
  - Entity owner: K-1s + entity returns + reconciliation
  - Equity comp: RSU vest summary, ESPP confirmations, ISO exercise records from `flow-equity-comp-tax-events`
  - Multistate: residency-day log from `task-track-state-residency`

**Output structure:**
```
vault/tax/02_briefs/YYYY-cpa-packet/
├── README.md              — manifest with present/missing status
├── 00_summary/
│   ├── cover-letter.md    — total income by stream, total deductions, est. tax owed, prior-year compare
│   └── carryforwards.md   — capital-loss, AMT credit, charitable, NOL
├── 01_income/             — W-2s, 1099s, K-1s
├── 02_deductions/         — 1098s, charitable, medical, business, home office
├── 03_health/             — 1095-A/B/C
├── 04_investments/        — capital-gains summary, dividend summary, cost-basis
├── 05_payments/           — Q1–Q4 federal + state confirmations
├── 06_optional/           — Schedule C / E / equity / multistate (only if applicable)
└── 07_prior-year/         — prior return PDF + final tax-software file
```

Optional zip: `YYYY-cpa-packet.zip` for delivery via secure portal or email.

## Steps

1. Determine tax year (default: prior calendar year)
2. Build component checklist based on config (which optional sections light up)
3. Search vault for matching documents (`vault/tax/00_current/YYYY/`, then cross-domain `vault/wealth/00_current/`, `vault/records/00_current/` if installed)
4. Copy/symlink found documents into packet subfolders
5. For missing components, create entry in README.md as MISSING with next-step guidance (which portal, which contact)
6. Generate cover summary: total income by stream, total deductions, estimated tax owed, prior-year comparison
7. Run `flow-document-completeness` for final completeness audit
8. Optional: zip the folder
9. Surface MISSING items to `open-loops.md`

## Configuration

`vault/tax/config.md`:
- `tax_year` (default: prior year)
- `cpa_name`, `cpa_email`, `cpa_secure_portal` (optional — used in cover letter)
- `filer_type` (W-2_only / self-employed / landlord / equity-comp / multi-entity) — drives which optional sections appear

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/tax/00_current/`, `~/Documents/aireadylife/vault/tax/01_prior/`, optionally `~/Documents/aireadylife/vault/wealth/00_current/`, `~/Documents/aireadylife/vault/records/00_current/`
- Writes: `~/Documents/aireadylife/vault/tax/02_briefs/YYYY-cpa-packet/`, `~/Documents/aireadylife/vault/tax/open-loops.md`
