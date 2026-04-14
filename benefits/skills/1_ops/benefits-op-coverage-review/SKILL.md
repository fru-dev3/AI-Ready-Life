---
name: arlive-benefits-op-coverage-review
type: op
cadence: quarterly
description: >
  Quarterly benefits coverage audit that verifies active elections match expected coverage and flags
  gaps between what coverage you carry vs. your current assets and liabilities. Triggers: "benefits audit",
  "coverage review", "am I covered".
---

# arlive-benefits-coverage-review

**Cadence:** Quarterly (January, April, July, October)
**Produces:** Coverage audit table, gap analysis, updated open-loops entries

## What it does

Reads current benefit elections from vault/benefits/00_plans/ and cross-references them against
the user's known assets, liabilities, and dependent situation to identify coverage gaps. Verifies
that each active election (medical, dental, vision, life, disability, FSA/HSA) matches what was
chosen during open enrollment and that no elections were accidentally dropped. Flags situations
where coverage limits appear undersized — for example, life insurance face value that doesn't
cover outstanding mortgage debt, or disability income replacement below 60% of gross pay. Writes
a coverage audit summary to vault/benefits/04_briefs/ and pushes all flagged gaps to
vault/benefits/open-loops.md.

## Configuration

Maintain a coverage expectations file in vault/benefits/00_plans/coverage-targets.md with desired
coverage levels (life insurance multiple, disability replacement rate, etc.) to enable gap analysis.

## Calls

- **Flows:** `arlive-benefits-build-coverage-summary`
- **Tasks:** `arlive-benefits-update-open-loops`

## Apps

None

## Vault Output

`vault/benefits/04_briefs/coverage-audit-{quarter}-{year}.md`
