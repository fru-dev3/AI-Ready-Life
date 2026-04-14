---
name: aireadylife-insurance-op-coverage-audit
type: op
cadence: annual
description: >
  Annual coverage audit; compares all policy coverage limits to current assets,
  income, and liabilities — flags coverage gaps and over-insurance. Produces an
  actionable gap report with recommended adjustments per policy type.
  Triggers: "coverage audit", "insurance audit", "am I underinsured", "coverage gaps".
---

# aireadylife-insurance-coverage-audit

**Cadence:** Annual (January or after major life event)
**Produces:** A comprehensive coverage gap report in `vault/insurance/02_coverage/` with per-policy recommendations and flagged gaps in open loops.

## What it does

Runs a full insurance portfolio audit once per year (or after a major life event like a home purchase, marriage, new child, or significant income change). Reads all active policies from `vault/insurance/00_current/` and compares coverage limits to current asset values, income, and liabilities. For life insurance: applies the 10-12x annual income replacement rule to check if the face value is sufficient given current salary and number of dependents. For disability insurance: checks that short-term and long-term disability coverage replaces at least 60-70% of gross income. For liability coverage: compares auto and home liability limits to current net worth — if net worth exceeds liability limits, an umbrella policy gap exists. For property insurance: checks that home and rental property coverage reflects current replacement cost (not purchase price), particularly important after renovation or appreciation. For renters/home insurance: verifies personal property coverage matches the estimated value of belongings. Calls `aireadylife-insurance-analyze-coverage-gaps` for the detailed gap calculation, then calls `aireadylife-insurance-flag-coverage-gap` for each identified issue. Also identifies over-insurance situations where premiums may be reducible without meaningful coverage loss.

## Calls

- **Flows:** `aireadylife-insurance-build-coverage-summary`, `aireadylife-insurance-analyze-coverage-gaps`
- **Tasks:** `aireadylife-insurance-flag-coverage-gap`, `aireadylife-insurance-update-open-loops`

## Apps

vault file system

## Vault Output

`vault/insurance/02_coverage/`
