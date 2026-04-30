---
type: op
trigger: user-facing
cadence: annual (typically Oct/Nov; configurable)
description: >
  Annual employer-benefits enrollment readiness. Pulls prior-year health utilization,
  current expected events (planned procedures, family changes, prescription patterns),
  and runs a comparison across the user's available employer plan options (typically
  PPO vs HDHP+HSA vs HMO). Outputs a recommended plan plus the FSA/HSA contribution
  targets to set during enrollment. Universal for W-2 employees.
---

# insurance-open-enrollment-readiness

**Trigger phrases:**
- "open enrollment prep"
- "which health plan should I pick"
- "PPO vs HDHP"
- "HSA contribution amount"

**Cadence:** Annual, in the user's enrollment window (often Oct-Nov).

## What It Does

Open enrollment is high-stakes (the wrong plan can cost $5K+ for a family) and frictionful (compare 3 plans against actual usage in 30 minutes). The op pre-computes the math.

**Inputs assembled:**
- Prior-year health utilization: total claims, deductible met, OOP spent, RX patterns. Pulled from `vault/health/00_current/` if installed; otherwise prompts user to upload prior-year EOB summary.
- Expected next-year events: planned procedures, expected pregnancy, ongoing therapy, recurring RX, dependents' regular care.
- Plan option set: each option with premium, deductible, OOP max, HSA-eligibility, network, and per-service copays. Pasted from employer benefits portal or `vault/career/00_current/benefits/`.

**Comparison logic per plan:**
- Total expected annual cost = annualized premium − employer HSA contribution + expected OOP up to OOP max + RX cost differential.
- HDHP+HSA path includes the tax-advantaged HSA contribution (current 2026 limits applied; configurable) and quantifies the marginal-tax savings.
- Family-vs-single tier consideration if dependents are listed.

**Output:** A ranked plan recommendation with the projected total cost difference and a flag for non-cost factors (network match for the user's primary doctors, prior-auth burden, in-network specialty access).

## Steps

1. Read prior-year utilization from `vault/health/` if available; else prompt user.
2. Read plan options from `vault/career/00_current/benefits/` or accept paste.
3. For each plan: compute expected total cost across realistic scenarios (low / medium / high utilization).
4. Recommend plan and FSA/HSA contribution target.
5. Surface non-cost factors (network match, prior-auth, mental-health network).
6. Write brief to `vault/insurance/02_briefs/open-enrollment-{YYYY}.md`.
7. Call `task-sync-to-cross-agents` to push the eventual selection into health and career vaults.

## Configuration

`vault/insurance/config.md`:
- `enrollment_window_start`, `enrollment_window_end`
- `hsa_contribution_target` (optional override; default = current IRS limit minus employer match)
- `dependents_on_health_plan`

## Error Handling

- **No prior utilization data:** Run with low/medium/high scenarios only; recommend HDHP only if low-utilization scenario is defensible.
- **Plan options not yet released by employer:** Output a checklist of fields to capture once available.

## Vault Paths

- Reads: optional `~/Documents/aireadylife/vault/health/`, `~/Documents/aireadylife/vault/career/00_current/benefits/`, `~/Documents/aireadylife/vault/insurance/config.md`
- Writes: `~/Documents/aireadylife/vault/insurance/02_briefs/open-enrollment-{YYYY}.md`
