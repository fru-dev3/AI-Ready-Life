---
type: flow
trigger: called-by-op-or-user
description: >
  Generates the recurring household-cleaning task schedule (daily / weekly / monthly /
  quarterly / annual) calibrated to household composition (solo / couple / family /
  with pets) and surfaces today's tasks. Configurable: assign tasks to household
  members, mark which tasks the user outsources to a cleaner. Universal — renters and
  homeowners.
---

# home-build-cleaning-routine

**Trigger:** Called by `op-review-brief`, `op-monthly-sync`, or directly by user.

## What It Does

Builds a household-cleaning calendar that captures the realistic cadence for each
task, who in the household owns it, and what's already outsourced to a cleaning
service. Surfaces today's and this-week's items.

**Frequency tiers and example tasks:**
- **Daily:** dishes, kitchen wipe-down, beds made, quick tidy, pet feeding / waste.
- **Weekly:** vacuum, mop, bathrooms, laundry, sheets, kitchen deep wipe, trash out.
- **Monthly:** dust ceiling fans, baseboards, vents, fridge wipe, oven, microwave.
- **Quarterly:** windows inside, deep dust (top of cabinets, behind furniture),
  HVAC vent intake, carpet spot-treat, drains.
- **Annual:** carpet shampoo, exterior windows, gutters (if applicable), curtains,
  upholstery deep clean.

**Household-composition adjustments:**
- **Family with kids:** weekly bathroom moves to twice weekly; daily tidy added.
- **Pets:** vacuum frequency increases; pet-area weekly clean added.
- **Solo:** weekly tasks compress; some monthly items become bi-monthly.

## Output

- `vault/home/00_current/cleaning-routine.md` — master cadence table.
- Today's + this-week's items surfaced in calling brief.

## Steps

1. Read `household_composition`, `pet_count`, `cleaner_outsourced_tasks` from config.
2. Build the cadence table from defaults + adjustments.
3. Compute today's tasks (daily) + this-week's tasks (anything weekly not yet done
   this week + any monthly+ task whose target is this week).
4. Write the routine file.
5. Return today + week list to caller.

## Configuration

`vault/home/config.md`:
- `household_composition` ("solo" / "couple" / "family")
- `pet_count`
- `cleaner_outsourced_tasks` (list — these tasks won't appear in the user's view)
- `task_owners` (optional: per-task owner name)

## Vault Paths

- Reads: `vault/home/config.md`
- Writes: `vault/home/00_current/cleaning-routine.md`
