---
type: op
trigger: user-facing
cadence: every 2-3 years for users 50+ (advanced/optional)
description: >
  Long-term care insurance vs self-funding evaluation. Frames the choice as a math
  problem: probability-weighted expected LTC need vs the cost of standalone LTC
  insurance vs hybrid life-LTC products vs the alternative of self-funding from
  invested assets. Skipped if the user is under 50 or has not opted into the op.
---

# insurance-long-term-care-evaluation

**Trigger phrases:**
- "long term care insurance"
- "LTC insurance"
- "should I buy long-term care"
- "hybrid life LTC"

**Cadence:** Every 2-3 years for users 50+. Sweet spot for purchasing standalone LTC is typically late 50s to early 60s before underwriting tightens.

## Scope Gate

Reads `age` from `vault/insurance/config.md`. If `age < 50` and `ltc_evaluation_enabled` is not set to true, this op exits with: *"LTC evaluation is enabled at age 50+ or by setting `ltc_evaluation_enabled: true` in `vault/insurance/config.md`."*

## What It Does

Roughly 50% of adults will need some form of long-term care; about 20% will need more than 2 years. Costs run $50K-$120K/year depending on care type and location. The decision is whether to insure, partially insure, or self-fund.

**Three paths compared:**
- **Standalone LTC insurance:** Traditional or hybrid policies. Premium ranges depending on age, health class, daily benefit, benefit period, inflation rider. Surfaces the rate-increase risk historical pattern (legacy carriers have raised premiums on existing blocks).
- **Hybrid life-LTC or annuity-LTC products:** Lower abandonment risk, asset-based, premium guarantees stronger than standalone. Higher up-front cost. Death benefit accrues if LTC is never used.
- **Self-funding from invested assets:** Requires a defined LTC reserve in the asset allocation. Op computes "self-fund threshold" using a simple model: (expected LTC duration × annual cost) inflated to age 80, present-valued at the user's expected return.

**Output:** A recommendation with the decision factors made explicit (state Medicaid look-back rules, family history of needing LTC, asset level, comfort with insurance carrier risk). Not a substitute for advice from a fee-only fiduciary.

## Steps

1. Confirm scope gate.
2. Read `age`, `state`, `net_worth`, `family_history_ltc` from `vault/insurance/config.md` (and `vault/wealth/` for net-worth).
3. Compute self-fund threshold based on assumed daily cost × duration × inflation × discount rate.
4. Compare to estimated standalone LTC premium (based on user age and benefit assumptions).
5. Compare to hybrid product cost in single-premium and multi-pay forms.
6. Surface state-specific factors (Medicaid look-back period, partnership programs).
7. Output decision packet to `vault/insurance/02_briefs/ltc-evaluation-{YYYY}.md`.
8. Recommend (or not) further evaluation with a fee-only planner.

## Configuration

`vault/insurance/config.md`:
- `age`, `state`, `ltc_evaluation_enabled`
- `family_history_ltc` (yes/no/unknown)
- `target_ltc_daily_benefit` (default $200/day)

## Error Handling

- **Net worth unknown:** Use a generic threshold ($1M-$2M typical self-fund range) and note assumption.
- **State not configured:** Skip Medicaid look-back specifics; note state-specific advice required.

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/insurance/config.md`, optional `~/Documents/aireadylife/vault/wealth/`
- Writes: `~/Documents/aireadylife/vault/insurance/02_briefs/ltc-evaluation-{YYYY}.md`, `~/Documents/aireadylife/vault/insurance/open-loops.md`
