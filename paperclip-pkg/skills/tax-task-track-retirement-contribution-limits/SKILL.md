---
type: task
trigger: user-or-flow
description: >
  Tracks YTD contributions to 401k, Traditional IRA, Roth IRA, HSA, FSA against
  current-year IRS limits + age-based catch-ups. Flags days remaining to max and the
  cash-flow impact of catching up. 2025 limits: 401k $23,500 ($31,000 if 50+); IRA
  $7,000 ($8,000 if 50+); HSA $4,300 individual / $8,550 family ($1,000 catch-up if
  55+); health FSA $3,300; dependent-care FSA $5,000. Used by op-year-end-planning-sweep
  for max-contribution gap analysis.
---

# task-track-retirement-contribution-limits

**Trigger:**
- User input: "track my contributions", "am I on track to max my 401k", "HSA contribution status"
- Called by: `op-year-end-planning-sweep`, `op-review-brief`, `op-cpa-packet`

## What It Does

Maintains a YTD contribution log per account and computes the gap to the IRS limit. Cross-pollinates with the wealth and benefits plugins (which handle the underlying account data).

**Tracked accounts (each is optional based on config):**
- **401(k) / 403(b) / 457(b):** employee contribution only (employer match is separate); 2025 limit $23,500, +$7,500 catch-up if age ≥50 (= $31,000 total)
- **Traditional IRA:** 2025 limit $7,000, +$1,000 if age ≥50 (= $8,000); deductibility may be phased out by income — flag if AGI in phaseout
- **Roth IRA:** same dollar limit as Traditional; income phaseout fully blocks contribution above thresholds (single 2025: $150k–$165k phaseout; MFJ: $236k–$246k); flag if income near phaseout
- **HSA:** 2025 $4,300 individual / $8,550 family, +$1,000 catch-up if age ≥55; requires HDHP coverage all year (or pro-rate)
- **Health FSA:** 2025 $3,300 (use-it-or-lose-it; some plans grace-period to Mar 15 or carryover up to $660)
- **Dependent-care FSA:** 2025 $5,000 ($2,500 if MFS)
- **SEP IRA / Solo 401(k):** for self-employed; SEP up to 25% of net SE income capped at $70,000; Solo 401(k) up to $23,500 employee + 25% of net SE for employer portion

**Per-account computation:**
- `ytd_contribution` from config or read from custodian-provided statement
- `applicable_limit = base_limit + catchup_if_age_eligible`
- `gap = applicable_limit - ytd_contribution`
- `days_remaining_to_deadline` (Dec 31 for 401k/HSA; Apr 15 of next year for IRA / SEP / HSA prior-year contributions)
- `monthly_to_max = gap / months_remaining`

**Flag rules:**
- `days_remaining ≤ 60` and `gap > 0` and `cash_flow_allows`: MEDIUM flag, action: "Increase 401k contribution rate to X% to max by Dec 31"
- Roth IRA AGI in phaseout: HIGH flag, action: "Consider backdoor Roth or stop direct Roth contributions"
- HSA below limit and HDHP year-round: MEDIUM flag with deadline (Apr 15 next year for prior-year contributions)
- 401k over-limit (rare, e.g., from job change with two employers): CRITICAL flag, action: "Excess deferral must be withdrawn by Apr 15 to avoid double taxation"

## Steps

1. Read `vault/tax/config.md`: account types active, age, filing status, AGI estimate
2. For each active account, read YTD contribution from config or wealth/benefits cross-domain file
3. Compute applicable limit (base + catchup), gap, days remaining
4. For Roth IRA: compute AGI phaseout position
5. Write contribution log to `vault/tax/00_current/YYYY/contribution-log.md`
6. For any flag-triggering condition, call `task-update-open-loops`

## Configuration

`vault/tax/config.md`:
- `age` (drives all catch-up math)
- `accounts_401k`, `accounts_ira_traditional`, `accounts_ira_roth`, `accounts_hsa`, `accounts_fsa_health`, `accounts_fsa_dca`, `accounts_sep_ira`, `accounts_solo_401k` (lists, blank if not applicable)
- `hdhp_coverage` (true/false; required for HSA)
- `estimated_agi` (for Roth phaseout)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/tax/config.md`, optionally `~/Documents/aireadylife/vault/wealth/00_current/`, `~/Documents/aireadylife/vault/benefits/`
- Writes: `~/Documents/aireadylife/vault/tax/00_current/YYYY/contribution-log.md`, `~/Documents/aireadylife/vault/tax/open-loops.md`
