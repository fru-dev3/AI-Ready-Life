---
name: arlive-insurance-flow-analyze-coverage-gaps
type: flow
trigger: called-by-op
description: >
  Compares coverage limits to current asset values and income to identify
  under-coverage risks: life insurance vs. income replacement need, liability
  limits vs. net worth, umbrella coverage adequacy.
---

# arlive-insurance-analyze-coverage-gaps

**Trigger:** Called by `arlive-insurance-coverage-audit`
**Produces:** A coverage gap analysis with per-policy gap findings, gap severity ratings, and recommended coverage adjustments returned to the calling op.

## What it does

Reads current coverage limits from `vault/insurance/02_coverage/` and compares them to key financial benchmarks to identify meaningful gaps. Life insurance: reads current policy face value and compares to the income replacement need using the 10-12x annual gross income rule. If total life coverage (all policies combined) is below 10x income, flags as an under-coverage gap with the dollar shortfall and estimated premium impact to close it. Disability insurance: checks that short-term disability waiting period is covered by liquid emergency fund (if not, flags a liquidity gap), and that long-term disability benefits replace at least 60% of gross income. Checks for a disability policy gap if no private LTD coverage exists beyond employer group coverage. Liability and umbrella: reads combined auto liability limits (per-occurrence) and home/renters liability limit, then compares to current estimated net worth from the wealth domain vault. If net worth exceeds the combined liability limits, calculates the unprotected exposure and flags the umbrella coverage gap. Property insurance: compares home/rental property coverage limits to current estimated replacement costs — flags if coverage is below 80% of replacement cost (below which most policies invoke the coinsurance penalty clause). Returns all identified gaps with severity (minor, moderate, significant) and estimated annual premium impact to resolve each gap.

## Steps

1. Read coverage limits for all policy types from `vault/insurance/02_coverage/`
2. Compare life insurance total face value to 10-12x annual income replacement benchmark
3. Check disability coverage: waiting period vs. emergency fund, benefit percentage vs. 60% income threshold
4. Compare combined auto + home liability limits to current estimated net worth
5. Check if umbrella policy exists and if its coverage brings total liability above net worth
6. Compare property insurance limits to current replacement cost estimates
7. Rate each gap by severity and calculate estimated premium impact to close it
8. Return gap analysis with severity ratings and recommended adjustments

## Apps

vault file system

## Vault Output

`vault/insurance/02_coverage/`
