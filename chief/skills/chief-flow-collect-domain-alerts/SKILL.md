---
name: aireadylife-chief-flow-collect-domain-alerts
type: flow
trigger: called-by-op
description: >
  Scans open-loops.md across all installed plugin vaults and collects all active flags sorted
  by priority and domain.
---

# aireadylife-chief-collect-domain-alerts

**Trigger:** Called by `aireadylife-chief-daily-brief`, `aireadylife-chief-weekly-preview`
**Produces:** Consolidated list of all unresolved domain flags across installed plugins, sorted by priority

## What it does

Discovers which plugins are currently installed by scanning the vault/ directory for subdirectories
that contain an open-loops.md file — this auto-discovery means chief works correctly regardless of
which combination of plugins the user has installed, with no manual configuration needed. For each
discovered plugin vault, reads the open-loops.md file and parses all unresolved items (those not
marked as complete with a checked checkbox). Extracts the priority marker (🔴 / 🟡 / 🟢),
the item description, the action required, and the date the flag was raised from each entry.
Sorts the combined list first by priority tier (all 🔴 first, then all 🟡, then all 🟢) and
within each tier by date raised (oldest first, since older unresolved items are more urgent).
Attaches a domain label to each item so the calling op can group or filter by domain. Returns
the full sorted consolidated list to the calling op. If a plugin vault has no open-loops.md file
or it is empty, that domain is recorded as "no active flags" in the result.

## Configuration

No configuration required. Auto-discovers plugins from vault/ subdirectories. Optionally
maintain vault/chief/config.md with an explicit plugin list if auto-discovery should be constrained
to specific domains.

## Steps

1. Identify installed plugins by scanning vault/ for subdirectories with open-loops.md files
2. Read open-loops.md from each installed plugin vault; parse all unresolved items
3. Collect all items with: domain, priority marker, description, action, date raised
4. Sort by priority tier (🔴 / 🟡 / 🟢) then by date raised within each tier

## Apps

None

## Vault Output

`vault/chief/00_briefs/`
