---
name: arlive-business-compliance-review
type: op
cadence: quarterly
description: >
  Quarterly entity compliance check that reviews LLC/S-Corp filing requirements, state deadlines,
  registered agent status, and annual report filings. Triggers: "compliance review", "LLC compliance",
  "annual report", "entity check".
---

# arlive-business-compliance-review

**Cadence:** Quarterly (January, April, July, October)
**Produces:** Compliance status report, deadline flags, updated open-loops entries

## What it does

Reads the compliance checklist from vault/business/03_compliance/ which tracks all entity
obligations: annual report filing status and due date, registered agent name and renewal date,
state tax election filings (S-Corp election, payroll tax), operating agreement version and last
review date, and any pending regulatory filings. For each item, compares the due date against
today's date and flags anything that is overdue (🔴) or due within 60 days (🟡). Surfaces the
full compliance picture — including items that are current — so the user has a complete view,
not just the alerts. Checks whether the registered agent's address and contact info are current
since outdated registered agent info can result in missed legal notices. Writes a dated
compliance brief to vault/business/04_briefs/ and pushes all deadline flags and overdue items
to vault/business/open-loops.md.

## Configuration

Maintain vault/business/03_compliance/ with a compliance-checklist.md file listing every
recurring obligation, its frequency, last completed date, and next due date. Update this file
after each filing to keep it accurate.

## Calls

- **Flows:** `arlive-business-check-compliance-status`
- **Tasks:** `arlive-business-update-open-loops`

## Apps

None

## Vault Output

`vault/business/04_briefs/compliance-{quarter}-{year}.md`
