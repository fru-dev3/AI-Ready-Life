---
type: task
trigger: user-or-flow
description: >
  Logs cash and non-cash charitable donations year-round to a single ledger. Flags
  receipt requirements at IRS thresholds: $250 (written acknowledgment required for
  cash gifts), $500 (Form 8283 required for non-cash), $5,000 (qualified appraisal
  required for non-cash). Generates Schedule A summary at year-end. Each entry
  records: date, organization, amount, type (cash / non-cash / QCD), payment method,
  receipt status, and tax year.
---

# task-track-charitable-giving

**Trigger:**
- User input: "log a donation", "I gave to [org]", "track charity"
- Called by: `op-year-end-planning-sweep`, `op-deduction-review`, `op-cpa-packet`

## What It Does

Maintains a year-round charitable-giving ledger at `vault/tax/00_current/YYYY/charitable.md`. Each entry captures everything Schedule A or Form 8283 requires. Documentation must exist before the deduction is supportable.

**Entry fields:**
- Date of gift (must be on or before Dec 31 of tax year — postmark or transaction date counts; pledges do not)
- Organization name and EIN if known (verify 501(c)(3) status if uncertain — non-qualifying orgs are not deductible)
- Amount in dollars (for non-cash: fair market value, with method noted)
- Type: `cash`, `non-cash`, `QCD` (qualified charitable distribution from IRA, age 70½+)
- Payment method: check, credit card, payroll deduction, stock transfer, IRA QCD, donated goods
- Receipt status: `RECEIVED` (acknowledgment letter on file), `PENDING` (org will send), `MISSING` (need to request)
- Documentation reference: filename in `vault/tax/00_current/YYYY/receipts/`

**Threshold flags (IRS Pub 526):**
- **<$250 cash:** bank record or canceled check is sufficient
- **≥$250 cash:** contemporaneous written acknowledgment required from the org (must state amount, no goods/services received clause)
- **≥$500 non-cash:** Form 8283 Section A required at filing
- **>$5,000 non-cash:** qualified appraisal required (Form 8283 Section B)
- **>$500,000 non-cash:** appraisal attached to return

**QCD specifics.** If `type: QCD` and config age ≥ 70½, the distribution counts toward RMD requirement and is excluded from AGI (rather than itemized). Annual QCD limit: $105,000 (2025), indexed.

**Year-end summary.** When called by `op-cpa-packet` or `op-year-end-planning-sweep`, generates `vault/tax/00_current/YYYY/charitable-summary.md` totaling cash, non-cash, and QCD with all backup references — drops directly into Schedule A workflow.

## Steps

1. Read input: org, amount, date, type, payment method
2. Append entry to `vault/tax/00_current/YYYY/charitable.md`
3. If amount ≥$250 (cash) or ≥$500 (non-cash), set receipt status appropriately and add to open-loops if MISSING
4. Apply threshold flags; if non-cash >$5,000 without appraisal reference, write HIGH-severity flag
5. If type=QCD, verify age ≥70½ in config; flag if not
6. On year-end summary call: aggregate by type, list all receipts, write summary file

## Configuration

`vault/tax/config.md`:
- `age` (for QCD eligibility)
- `charitable_intent_annual` (for bunching analysis in year-end planning)

## Vault Paths

- Writes: `~/Documents/aireadylife/vault/tax/00_current/YYYY/charitable.md`, `~/Documents/aireadylife/vault/tax/00_current/YYYY/charitable-summary.md`, `~/Documents/aireadylife/vault/tax/open-loops.md`
