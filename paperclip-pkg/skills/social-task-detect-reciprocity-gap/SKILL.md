---
type: task
trigger: user-or-flow
description: >
  Reads the interaction log and last-signals data; flags contacts where the last
  3+ interactions were initiated by the other side, or where recent interactions
  were ask-only with no give. Surfaces reciprocity imbalance before it erodes the
  relationship.
---

# social-detect-reciprocity-gap

**Trigger:**
- Called by: `op-relationship-review`, `op-family-relationships-review`, `flow-build-relationship-health-summary`
- User input: "any reciprocity gaps", "who am I underinvesting in"

## What It Does

A relationship can look healthy on a recency dimension (contact within threshold) while being unhealthy on a reciprocity dimension (one side carrying the relationship). This task scans recent interaction history and flags two patterns:

**Pattern 1 — Initiation imbalance:** Last 3+ interactions in a row were initiated by the other party (per the `initiated_by` field on interaction log entries, defaulting to "other" for inbound Gmail signals). The user is being pulled along the relationship rather than tending it.

**Pattern 2 — Ask-only pattern:** Last 3+ interactions were tagged `nature: ask` (the contact asked the user for something) without a corresponding `nature: give` (the user offered something proactively). The relationship has become transactional.

Tier weighting: Tier 1 and family flags fire at 3 imbalanced interactions; Tier 2 at 4; Tier 3 at 5. The thresholds are conservative because friendship rhythms aren't perfectly even — the goal is to flag drift, not enforce parity.

**Output:** A reciprocity flag per affected contact in `open-loops.md` with severity MEDIUM, name, pattern type, count of imbalanced interactions, and a suggested rebalancing action (e.g., "Initiate next contact — share something you're working on, ask about their X.").

## Steps

1. Read all interaction-log files in `01_interactions/`
2. For each contact, take last N interactions (N = tier-specific threshold)
3. Check Pattern 1 — count `initiated_by` values
4. Check Pattern 2 — count `nature` values
5. If either pattern triggers: build reciprocity flag with rebalancing suggestion
6. Call `task-update-open-loops` with flags

## Configuration

`vault/social/config.md`:
- `reciprocity_t1_threshold` (default 3)
- `reciprocity_t2_threshold` (default 4)
- `reciprocity_t3_threshold` (default 5)
- `reciprocity_check_window_months` (default 6) — only count interactions in the last N months

## Vault Paths

- Reads: `01_interactions/`, `00_current/contacts.md`, `00_current/last-signals.md`
- Writes via task: `open-loops.md`
