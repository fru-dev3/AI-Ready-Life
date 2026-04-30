---
type: op
trigger: user-facing
cadence: triggered-on-move-decision
description: >
  Active-move planner. Triggered when a move is logged (move_in_progress=true in
  config or user says "I'm moving"). Generates timed checklists at 8 / 4 / 2 / 1
  weeks before move-day, and a move-day-of + first-week checklist. Covers address
  changes, utility transfers, mover quotes, packing schedule, lease / closing tasks,
  insurance updates. Universal — works for renter→renter, renter→owner,
  owner→renter, owner→owner.
---

# home-move-planning

**Trigger phrases:**
- "I'm moving"
- "move planning"
- "moving checklist"
- "move in [N] weeks"
- "move planner"

**Cadence:** Activated on move decision; runs throughout the move window.

## What It Does

Walks the user through every move-related task on a timed checklist, branching by
move type. Produces:

- `vault/home/02_briefs/YYYY-MM-DD-move-plan.md` — master plan with from-address,
  to-address, target move date, and full checklist.
- A weekly nudge: at 8 / 4 / 2 / 1 weeks out, the op surfaces the items due that week.

**Checklist tiers (universal):**
- **8 weeks out:** lock target date; collect 2–3 mover quotes (or rental-truck quote
  if DIY); declutter pass; inventory big items; school transfer if applicable; vet /
  doctor record requests if changing region.
- **4 weeks out:** confirm mover; book truck / movers; start collecting boxes; notify
  current landlord (renter→) per lease notice requirement; schedule utility shutoff
  + new utility startup; submit USPS change-of-address; update insurance addresses;
  notify employer for W-2 / payroll address.
- **2 weeks out:** start packing non-essentials; update voter registration; transfer
  prescriptions; notify subscriptions / banks / credit cards / DMV; arrange child /
  pet care for move day.
- **1 week out:** confirm mover one last time; pack essentials box; defrost freezer;
  return cable equipment; final cleaning service if budgeted; lease walkthrough
  scheduled (renter→).
- **Move day:** photos of empty old place (deposit protection); meter readings;
  hand over keys; verify mover insurance + bill of lading.
- **First week in new place:** unpack essentials; verify all utilities active;
  inspect for damage / issues; file move-in inspection (renter); update emergency
  contacts; restock first-aid + emergency supplies.

**Branch additions:**
- **Renter→ leaving:** lease notice letter, deposit-return process tracked.
- **Owner→ leaving:** closing-prep tasks (loan payoff, title transfer, capital-gains
  prep, escrow refund tracking).
- **→ Renter arriving:** lease signing, deposit, move-in inspection.
- **→ Owner arriving:** closing-day checklist, locks rekeyed, utilities transferred,
  homestead exemption filed (where applicable).

## Steps

1. Capture move metadata: from-type (rent / own), to-type (rent / own), target date,
   from-address, to-address.
2. Generate full checklist with weekly tiers from the rules above.
3. Cross-domain handoffs: notify insurance (address change), records (address change
   / file updates), wealth (cash-flow impact), social (address book updates) if
   plugins installed.
4. Schedule weekly nudges via open-loops.
5. Write the master plan brief.

## Configuration

`vault/home/config.md`:
- `move_in_progress` (true when active)
- `move_target_date`
- `move_from_type`, `move_to_type`
- `move_from_address`, `move_to_address`

## Vault Paths

- Reads: `vault/home/config.md`
- Writes: `vault/home/02_briefs/YYYY-MM-DD-move-plan.md`,
  `vault/home/open-loops.md`, cross-domain notifications via configured plugin
  handoff files
