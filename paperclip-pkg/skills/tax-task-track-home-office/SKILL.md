---
type: task
trigger: user-or-flow
description: >
  Records home-office documentation month by month for users who claim the deduction:
  square footage of dedicated office, total home square footage, qualifying-use
  percentage, method (simplified $5/sq ft up to 300 sq ft, or actual expenses), and
  monthly direct/indirect expenses (rent or mortgage interest, utilities, insurance,
  internet, repairs). Continuous documentation makes the deduction supportable in
  audit; reconstructed logs are weak.
---

# task-track-home-office

**Trigger:**
- User input: "log home office", "track home office", "update home office"
- Called by: `op-deduction-review`, `op-cpa-packet`, `op-year-end-planning-sweep`

## What It Does

Maintains the contemporaneous record needed to substantiate the home-office deduction. Two methods are supported, configured in `vault/tax/config.md`:

**Simplified method** — $5/sq ft × dedicated office sq ft, capped at 300 sq ft (max $1,500/year). No expense tracking; just document the office sq ft and that it's used regularly and exclusively for business.

**Actual method** — proportional share of all home expenses, applied to (office sq ft ÷ total home sq ft). Requires monthly expense tracking. Often produces a larger deduction but heavier documentation burden.

**Per-entry fields (actual method, monthly):**
- Month
- Direct expenses (100% deductible — only used for the office, e.g., office paint, dedicated phone line)
- Indirect expenses (proportional — rent or mortgage interest, utilities, homeowner's/renter's insurance, internet, repairs that benefit the whole home)
- Office sq ft / total sq ft (verify unchanged from config; flag if config and log diverge)
- Notes (e.g., "office reconfigured Mar 1, sq ft updated")

**Eligibility checks (monthly):**
- Used `regularly` and `exclusively` for business (no personal use of the office space)
- For employees (W-2 only): home-office deduction is NOT available 2018–2025 unless self-employed or have qualifying entity setup. Flag if user is W-2-only and trying to claim.
- For self-employed (Schedule C): claim on Form 8829 (actual) or Schedule C line 30 (simplified)
- For partners / S-corp owners: typically reimbursed via accountable plan, not deducted on personal return

**Year-end summary.** Aggregates 12 monthly entries into `vault/tax/00_current/YYYY/home-office-summary.md` with:
- Method used, total sq ft / office sq ft, qualifying-use percentage
- For actual method: total direct + (total indirect × percentage) = deductible amount
- For simplified: $5 × min(office_sqft, 300)
- Comparison: which method produced the larger number this year

## Steps

1. Read input: month, expenses (if actual method), any sq ft change
2. Verify eligibility (self-employed or qualifying entity; W-2-only filers flagged)
3. Append entry to `vault/tax/00_current/YYYY/home-office-log.md`
4. If sq ft changed mid-year, log the effective date and note for proration
5. On year-end summary call: aggregate, compute both methods, recommend the larger

## Configuration

`vault/tax/config.md`:
- `home_office_method` (simplified | actual | both — both runs the comparison)
- `home_office_sqft` (dedicated office sq ft)
- `home_total_sqft` (whole-home sq ft, for actual method)
- `filer_type` (must include self-employed or entity for the deduction to apply)

## Vault Paths

- Writes: `~/Documents/aireadylife/vault/tax/00_current/YYYY/home-office-log.md`, `~/Documents/aireadylife/vault/tax/00_current/YYYY/home-office-summary.md`
