---
type: flow
trigger: user-or-op
description: >
  For group trips: maintains a shared coordination doc (itinerary, expense splits, activity
  votes) and surfaces the next coordination action. Optional, only runs when a trip is
  flagged as group (v2).
---

# explore-cotraveler-coordination

**Trigger:**
- User input: "coordinate group trip", "split expenses for {trip}", "activity vote"
- Called by: `op-trip-planning-review` (when trip record has `cotravelers` set and `coordination_enabled: true`)

## What It Does

Adds a coordination layer to the trip record so a group can plan together without scattering plans across SMS, group chats, and forgotten emails. The flow is deliberately scoped — it does NOT message anyone outside the user; it produces shareable artifacts the user can copy into whatever channel the group uses.

**Coordination artifacts written into the trip file:**

1. **Shared itinerary block** — day-by-day plan with each day's anchor activity, meal plans, and unassigned slots. Each row tagged with who proposed it and current status (proposed / locked / dropped).

2. **Expense ledger** — extends `task-track-travel-budget` with per-person allocation. Each expense entry adds `paid_by` and `split_among` fields. Running balances per person are recomputed on each call: who owes whom and how much. Optional Splitwise-style settle-up suggestions.

3. **Activity voting log** — for proposed activities with multiple options, records each cotraveler's vote (yes / no / lean / abstain). The flow tallies and recommends a winner; ties are surfaced for the user to break.

4. **Roles & responsibilities** — who's booking what (flights, lodging, rental car, restaurant reservations, group dinner). Each role has owner + status + due date.

5. **Shareable export** — on demand, the flow renders the coordination doc as a clean markdown / plain-text block the user can paste into the group chat or share via Drive.

**Boundary:** This flow respects the global no-outbound-messages rule. It never sends emails, texts, or webhook calls to cotravelers. The user copies the shareable export themselves.

## Steps

1. Read trip file; verify `cotravelers` and `coordination_enabled` set
2. Read prior coordination state from the trip file's `## Coordination` block
3. Apply the user's update (new vote, expense, role assignment, itinerary edit)
4. Recompute split balances and vote tallies
5. Write updated `## Coordination` block back to trip file
6. If user requested export: render the shareable block and return it
7. Return summary of next coordination actions (e.g., "3 unbooked roles", "2 ties to break")

## Configuration

`vault/explore/config.md`:
- `cotraveler_default_split` (equal / weighted / custom)
- `cotraveler_settle_up_threshold` (default $50)

`{trip-file}` frontmatter:
- `cotravelers` — list of names
- `coordination_enabled` — true/false

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/explore/00_current/{trip-file}.md`, `~/Documents/aireadylife/vault/explore/config.md`
- Writes: trip file (`## Coordination` section), `~/Documents/aireadylife/vault/explore/open-loops.md`
