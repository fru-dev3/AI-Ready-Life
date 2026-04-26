---
name: chief-flow-collect-domain-alerts
type: flow
trigger: called-by-op
description: >
  Scans open-loops.md across all installed plugin vaults and collects all active flags sorted
  by priority and domain.
---

# chief-collect-domain-alerts

**Trigger:** Called by `chief-op-daily-brief`, `chief-op-weekly-preview`
**Produces:** Consolidated sorted list of all unresolved domain flags across installed plugins

## What It Does

This flow is the data-collection backbone of every chief op. It discovers all installed plugins automatically by scanning ~/Documents/aireadylife/vault/ for subdirectories that contain an open-loops.md file — no manual plugin list required. If a plugin has an open-loops.md file in its vault directory, it is included. This means the flow works correctly regardless of which combination of plugins the user has installed.

For each discovered plugin vault, the flow reads open-loops.md and parses every item that is not marked as complete (not a checked checkbox: `- [x]`). For each unresolved item, it extracts: the priority marker (🔴 / 🟡 / 🟢), the full item description, the recommended action, the due date if one is present (parsed from both ISO format YYYY-MM-DD and natural language like "by end of April" or "this week"), and the date the flag was raised (from the item's timestamp or date field).

After parsing all domains, the flow sorts the combined list using a two-level sort: primary sort by priority tier (all 🔴 first, then all 🟡, then all 🟢), and secondary sort within each tier by due date proximity (items with the nearest due dates first, then items without due dates sorted by date raised oldest first). Oldest unresolved items are treated as more urgent than newer ones within the same tier, since they've been waiting longer.

Each item in the result carries a domain label (the plugin name inferred from the vault subdirectory name) so the calling op can group or filter by domain. If a plugin vault exists but its open-loops.md is empty or contains only resolved items, that domain is returned with a "no active flags" record rather than being silently omitted — the calling op needs to know the domain is installed and current even if nothing is flagged.

## Steps

1. Scan ~/Documents/aireadylife/vault/ for subdirectories containing an open-loops.md file
2. For each discovered directory: read open-loops.md; extract all unresolved items (unchecked checkboxes)
3. Per item: extract priority marker, description, action, due date (ISO and natural language), date raised
4. Tag each item with its source domain name
5. Sort combined list: priority tier (🔴 → 🟡 → 🟢) then due-date proximity then date raised (oldest first)
6. For domains with no unresolved items: return domain record with "no active flags" and last-updated date
7. Return full sorted consolidated list to calling op

## Input

- ~/Documents/aireadylife/vault/*/open-loops.md
- `vault/chief/01_prior/` — prior period records for trend comparison

## Output Format

Returns a structured list to the calling op (not written to disk directly):
```
[
  { domain: "tax", priority: "🔴", description: "Q1 estimated payment", action: "Make payment", due_date: "2026-04-15", date_raised: "2026-04-01" },
  { domain: "benefits", priority: "🟡", description: "HSA contribution gap", action: "Increase payroll deduction", due_date: null, date_raised: "2026-03-15" },
  { domain: "calendar", no_flags: true, last_updated: "2026-04-10" },
  ...
]
```

## Configuration

No configuration required. Auto-discovers plugins from vault/ directory structure. If vault/chief/config.md contains an `installed_plugins` field with a comma-separated list, auto-discovery is constrained to only those named plugins (useful if unused plugin vaults exist in the directory).

## Error Handling

- **vault/ directory missing:** Return empty result with error: "No vault directory found at ~/Documents/aireadylife/vault/."
- **open-loops.md unreadable:** Skip that domain and note in result: "{domain}: open-loops.md unreadable — check file permissions."
- **open-loops.md malformed (no checkbox format):** Parse as best-effort; flag items without a priority marker as 🟢 by default.

## Vault Paths

- Reads from: `~/Documents/aireadylife/vault/chief/01_prior/` — prior period records
- Reads from: ~/Documents/aireadylife/vault/*/open-loops.md
- Writes to: ~/Documents/aireadylife/vault/chief/02_briefs/ (via calling op, not directly)
