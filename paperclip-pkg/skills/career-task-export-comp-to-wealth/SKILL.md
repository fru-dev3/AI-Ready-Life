---
type: task
trigger: user-or-flow
description: >
  Writes the user's current total compensation breakdown and YTD income summary to a stable
  handoff file consumed by the wealth and benefits plugins. Closes the cross-agent feed
  non-negotiable: career data must flow into wealth (income, savings rate, runway) and
  benefits (401k pacing, HSA pacing, employer-match capture).
---

# career-export-comp-to-wealth

**Trigger phrases:**
- "export comp to wealth"
- "sync career income"
- "update wealth with my comp"
- "push pay data to wealth"

**Cadence:** Called by `op-monthly-sync` (or successor) after pay-stub parse; runnable on demand after any comp event (raise, bonus, equity refresh).

## What It Does

Career holds the source of truth for compensation; wealth and benefits need it to compute savings rate, retirement pacing, tax estimates, and emergency-fund runway. This task writes a stable, structured handoff file at a known path that the other plugins read. The contract is intentionally simple so consumer plugins don't have to know about career's internal layout.

**Handoff payload:**
- `as_of_date`
- Annualized comp components: `base_salary`, `target_bonus`, `equity_annualized`, `employer_401k_match_annual`, `employer_hsa_contribution_annual`, `health_premium_employer_annual`, `total_comp_annual`
- YTD actuals (from pay-stub log): `ytd_gross`, `ytd_federal_withheld`, `ytd_state_withheld`, `ytd_401k_traditional`, `ytd_401k_roth`, `ytd_hsa`, `ytd_espp`, `ytd_bonus_paid`, `ytd_equity_vested_value`
- Pacing flags: `on_pace_for_401k_limit` (bool), `on_pace_for_hsa_limit` (bool), `employer_match_capture_pct`
- Pay frequency and remaining pay periods this calendar year

## Steps

1. Read latest comp benchmark output from `vault/career/02_briefs/` and current values from `vault/career/00_current/`.
2. Read pay-stub log; sum YTD actuals.
3. Compute pacing: project full-year contribution at current rate, compare to IRS limits configured in `vault/career/config.md`.
4. Compute employer-match capture rate (employer 401k match YTD ÷ projected match if user contributes to full match) — flag if <100%.
5. Write payload to `~/Documents/aireadylife/vault/_shared/career-handoff.md` (canonical) AND mirror to `vault/wealth/00_current/career-handoff.md` and `vault/benefits/00_current/career-handoff.md` if those vaults exist.
6. Stamp `as_of_date` and a content hash so consumers can detect stale or unchanged data.
7. Return summary of what was written and any pacing flags.

## Configuration

`vault/career/config.md`:
- `irs_401k_limit` (current calendar year)
- `irs_hsa_limit_self`, `irs_hsa_limit_family`
- `hsa_coverage_tier` (self / family / none)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/career/00_current/`, `02_briefs/`, `vault/career/config.md`
- Writes: `~/Documents/aireadylife/vault/_shared/career-handoff.md`, `vault/wealth/00_current/career-handoff.md`, `vault/benefits/00_current/career-handoff.md`
