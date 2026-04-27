---
type: task
trigger: user-or-flow
scope: advanced/optional
description: >
  ADVANCED / OPTIONAL — for multistate workers, snowbirds, recent movers, and remote
  workers in border states. Logs days-per-state to substantiate residency or
  non-residency at filing. Most states use a 183-day threshold (sometimes 184) plus
  a domicile test. Some no-income-tax states (FL, TX, WA, NV, TN, SD, WY, AK, NH)
  attract aggressive residency challenges from prior high-tax states (e.g., NY,
  CA). Flags as user approaches state-specific thresholds.
---

# task-track-state-residency

**Scope:** Advanced / optional. Only activates if `multistate: true` in config.

**Trigger:**
- User input: "log days in [state]", "track residency", "state residency days"
- Called by: `op-year-end-planning-sweep`, `op-cpa-packet`

## What It Does

Maintains a per-state day log for the tax year. Used at filing to substantiate state-residency claims and allocate income for multistate or part-year returns.

**Per-entry fields:**
- Date or date range
- State (USPS abbreviation)
- Activity (`work`, `travel`, `home`, `temporary`)
- Source evidence (calendar entry, hotel folio, flight, credit card location)

**Threshold rules (most states):**
- **183 days** in a state typically establishes statutory residency (also called "physical presence test"). Some states use 184; New York uses 183 + permanent place of abode in NY.
- **Domicile test** — separate from days; assesses where the user's "true, fixed and permanent home" is. Stronger evidence: voter registration, driver's license, primary residence, where children attend school, where personal belongings are.
- **Snowbird states** — FL, TX (no income tax) commonly used as primary domicile while spending winters there; high-tax states (NY, CA) have aggressively challenged residency claims and may pursue tax for years post-move.

**Flag rules:**
- User accumulates ≥150 days in any single state by mid-year and that state was not their declared domicile: MEDIUM flag, action: "Approaching 183-day threshold in [state]; document your activities and verify domicile evidence is in order"
- ≥183 days + state with income tax + not declared resident: HIGH flag with CPA-review recommendation
- Recent move (within 24 months) from high-tax state to no-tax state: HIGH flag — "Departing-state residency audit risk; preserve evidence of new domicile (driver's license, voter registration, declaration of domicile if state offers one)"

**Filing implications.**
- Resident return: state taxes all income worldwide
- Part-year return: split-year, allocate income earned in each state
- Non-resident return: state taxes only income sourced to that state

## Steps

1. Read input: date(s), state, activity, evidence reference
2. Append to `vault/tax/00_current/YYYY/state-residency-log.md`
3. Recompute YTD days per state
4. Check thresholds; for any flagged state, write to `open-loops.md` with severity per rules
5. On year-end summary call: produce per-state day summary for CPA packet

## Configuration

`vault/tax/config.md`:
- `multistate` (true to enable this task)
- `domicile_state` (declared state of domicile)
- `prior_year_states` (states user filed in last year, for departing-state audit risk awareness)

## Vault Paths

- Writes: `~/Documents/aireadylife/vault/tax/00_current/YYYY/state-residency-log.md`, `~/Documents/aireadylife/vault/tax/open-loops.md`
