---
type: op
trigger: user-facing
cadence: annual once user is 60+ (advanced/optional)
description: >
  Medicare planning support for users approaching or in Medicare eligibility. Walks
  through Part A/B/C/D decisions, Medigap supplement vs Medicare Advantage, IRMAA
  awareness based on prior-year MAGI, and enrollment-window timing (Initial Enrollment
  Period, General Enrollment, Special Enrollment, Annual Election Period). Skipped if
  the user is under 55 or has not opted into the op.
---

# insurance-medicare-planning

**Trigger phrases:**
- "medicare planning"
- "turning 65 medicare"
- "Medicare Part A B C D"
- "medigap or advantage"

**Cadence:** First run 6-12 months before age 65 (Initial Enrollment Period starts 3 months before the 65th birthday month). Annual reruns during the Annual Election Period (Oct 15 - Dec 7).

## Scope Gate

Reads `age` (or `dob`) from `vault/insurance/config.md`. If `age < 55` and `medicare_planning_enabled` is not set to true, this op exits with a single line: *"Medicare planning is enabled at age 55+ or by setting `medicare_planning_enabled: true` in `vault/insurance/config.md`."*

## What It Does

Medicare has six interlocking decisions in a tight enrollment window. Mistakes are expensive and sometimes permanent (late-enrollment penalties on Part B and Part D last for life).

**Decision support areas:**
- **Part A** (hospital): premium-free for most; check work-credit eligibility.
- **Part B** (medical): premium based on prior-year MAGI (IRMAA brackets). Late-enrollment penalty is 10%/year-delayed, permanent. The op surfaces the penalty cost if the user delays.
- **Original Medicare + Medigap vs Medicare Advantage (Part C):** different network and cost structures. The op compares projected total annual cost across both paths using prior-year utilization (pulled from `vault/health/` if installed).
- **Part D** (drug): plan choice depends on the user's specific RX list. The op outputs the data needed to use the official Medicare Plan Finder.
- **IRMAA awareness:** Surfaces current IRMAA brackets and flags whether the user's prior-year MAGI lands above a threshold; suggests SSA-44 form for life-changing-event appeals (retirement, work cessation).
- **HSA-stop reminder:** Once enrolled in any part of Medicare, HSA contributions must stop. Surfaced in the op output and synced to `vault/career/` if the user is still working.

## Steps

1. Confirm scope gate.
2. Read `dob`, `medicare_status`, `state`, and prior-year MAGI from `vault/insurance/config.md` (and `vault/wealth/` for MAGI if installed).
3. Compute IEP / GEP / SEP / AEP windows based on dob and current date.
4. Run side-by-side projection of Original Medicare + Medigap + Part D vs Medicare Advantage using utilization from `vault/health/`.
5. Surface IRMAA bracket and SSA-44 applicability if recently retired.
6. Output decision packet to `vault/insurance/02_briefs/medicare-{YYYY-MM}.md`.
7. Surface HSA-stop reminder to open-loops.
8. Call `task-sync-to-cross-agents` to flag pending Medicare decisions in health and career vaults.

## Configuration

`vault/insurance/config.md`:
- `dob`, `state`, `medicare_planning_enabled` (override flag)
- `prior_year_magi` (or pulled from wealth)
- `current_rx_list` (for Part D plan finder prep)

## Error Handling

- **Prior-year MAGI unavailable:** Note that IRMAA bracket cannot be computed; recommend pulling from prior-year tax return.
- **Out of state:** Medigap pricing varies; surface that quotes are state-specific.

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/insurance/config.md`, optional `~/Documents/aireadylife/vault/{health,wealth,career}/`
- Writes: `~/Documents/aireadylife/vault/insurance/02_briefs/medicare-{YYYY-MM}.md`, `~/Documents/aireadylife/vault/insurance/open-loops.md`
