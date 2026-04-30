---
type: op
trigger: user-facing
cadence: annual
description: >
  Highest-leverage tax skill of the year. Run on November 1 to surface every Dec 31
  optimization opportunity before it expires: 401k / IRA / HSA / FSA contribution
  status vs limits, charitable bunching opportunities, FSA use-it-or-lose-it,
  HSA catch-up (age 55+), RMDs (age 73+), Roth conversion windows during low-income
  years, itemize-vs-standard projection, and any equity-comp moves (sell ESPP,
  exercise ISOs) that should be timed before year-end.
---

# op-year-end-planning-sweep

**Trigger phrases:**
- "year-end planning"
- "end of year tax moves"
- "what should I do before December"
- "year-end tax sweep"
- "Dec 31 optimization"

**Cadence:** Annual; user-triggered Nov 1 – Dec 15 (latest practical window).

## What It Does

Generates a single planning brief that walks the user through every meaningful Dec 31 deadline. Most of these moves cannot be made retroactively after Jan 1 — November is the action window.

**Sections (each gets a TODO if action recommended):**

1. **Retirement contributions.** Calls `task-track-retirement-contribution-limits` and surfaces gap to max for 401k, IRA (Traditional / Roth), HSA, FSA. For each underfunded account, computes "$X to max + Y days remaining" and the cash-flow impact.
2. **Charitable bunching.** If the user is on the standard deduction and has charitable intent, models pulling 2 years of giving into the current year (or using a Donor-Advised Fund) to clear the standard deduction once. Pulls totals from `task-track-charitable-giving`.
3. **FSA use-it-or-lose-it.** Flags any unused health FSA balance with the plan deadline (often Dec 31; some plans grace-period or carryover). Lists eligible expenses to incur.
4. **HSA catch-up.** Age 55+ adds $1,000 catch-up beyond standard $4,300 / $8,550 limits.
5. **RMDs.** Age 73+ must take Required Minimum Distributions from Traditional IRAs / 401ks by Dec 31 (or Apr 1 of following year for first RMD). Penalty: 25% of shortfall.
6. **Roth conversion window.** If current-year income is unusually low (between jobs, sabbatical, post-retirement pre-Social-Security), evaluate converting Traditional → Roth IRA at lower bracket. Cross-check with safe-harbor estimate impact.
7. **Itemize-vs-standard projection.** Project full-year itemized deductions vs current-year standard deduction. If close to the threshold, recommend bunching deductible items (charity, medical) into this year or next.
8. **Equity comp timing (advanced/optional).** If user has ESPP shares eligible for qualifying disposition or ISO bargain elements that may trigger AMT, surface the model from `flow-equity-comp-tax-events`.
9. **Tax-loss harvesting (advanced/optional).** If `flow-tax-loss-harvesting-scan` has unrealized losses ≥$1k, recommend harvesting before Dec 31; verify wash-sale-safe replacement.

## Steps

1. Read `vault/tax/config.md`: filing status, AGI estimate, retirement accounts, age, charitable intent, FSA enrollment
2. Call `task-track-retirement-contribution-limits` → contribution gaps
3. Call `task-track-charitable-giving` → YTD giving + receipt status
4. Run itemize-vs-standard projection (deductions YTD + Q4 estimate vs standard)
5. If applicable (config flags), call `flow-equity-comp-tax-events` and `flow-tax-loss-harvesting-scan`
6. Build prioritized action list ordered by financial impact and deadline
7. Write brief to `vault/tax/02_briefs/YYYY-year-end-plan.md`
8. Surface CRITICAL items (RMD, FSA forfeit) to `open-loops.md` via `task-update-open-loops`

## Configuration

`vault/tax/config.md`:
- `age` (drives RMD, HSA / 401k catch-up, ISO/ESPP relevance)
- `charitable_intent_annual` (ballpark intended giving, for bunching analysis)
- `roth_conversion_consider` (true if income is unusually low this year)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/tax/00_current/`, `~/Documents/aireadylife/vault/tax/config.md`
- Writes: `~/Documents/aireadylife/vault/tax/02_briefs/YYYY-year-end-plan.md`, `~/Documents/aireadylife/vault/tax/open-loops.md`
