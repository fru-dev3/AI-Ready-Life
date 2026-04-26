---
name: chief-task-pull-domain-status
type: task
description: >
  Reads the state.md file from a specified plugin vault and returns a summary of current domain
  status: last updated, wellness or score if present, and open item count.
---

# chief-pull-domain-status

**Trigger:** Called by `chief-op-daily-brief` for each installed plugin
**Produces:** Per-domain status snapshot for population of the domain alert table in the daily brief

## What It Does

This task reads a single plugin's state.md and returns a compact status record for that domain. It is called once per installed plugin during the daily brief cycle, enabling the domain alert table to show a complete row for every installed plugin — not just those with active flags.

The task accepts a domain name and reads vault/{domain}/state.md. It looks for three types of information:

**Last-updated date:** The date field in state.md that indicates when the domain was most recently reviewed or synced. This is typically a field named `last_updated`, `last_run`, or `reviewed_at`. If no such field exists, the task falls back to reading the file's modification timestamp. If the last-updated date is more than 30 days ago, the status is annotated as stale (displayed as "(stale N days)" in the brief's domain alert table). More than 60 days without update earns a 🔴 staleness flag.

**Domain score or wellness indicator:** Some plugins store a domain-level score or key metric in state.md — for example, a net worth figure in the wealth plugin, a wellness score in the health plugin, a filing status in the tax plugin, a coverage score in the insurance plugin, or an OKR health score in the vision plugin. If such a field is present (the task looks for fields named `score`, `wellness`, `net_worth`, `health_score`, `coverage_score`, `okr_health`, or similar), it is returned as the domain's key metric for display in the alert table.

**Open item count:** The task reads vault/{domain}/open-loops.md (if present) and counts unresolved items. This count is returned as the total open-loop count for the domain. The breakdown by priority tier is not returned by this task — that granularity is provided by chief-task-check-open-loops and chief-flow-collect-domain-alerts. This task returns only the total count for the alert table row.

If state.md does not exist for the specified domain, the task returns a "not initialized" record rather than erroring. This allows the calling op to still display a row for that domain in the alert table — it just shows "not initialized" in the Last Run column.

## Steps

1. Receive domain name from calling op
2. Read vault/{domain}/state.md (if present)
3. Extract last-updated date from state.md; calculate days since last update
4. Annotate as stale if 30+ days, critically stale if 60+ days
5. Extract domain score or wellness indicator from state.md (if field present)
6. Read vault/{domain}/open-loops.md; count unresolved items (unchecked checkboxes)
7. Return compact status record to calling op

## Input

- ~/Documents/aireadylife/vault/{domain}/state.md
- ~/Documents/aireadylife/vault/{domain}/open-loops.md

## Output Format

Returns structured data to calling op (not written to disk):
```
{
  domain: "tax",
  last_updated: "2026-04-10",
  days_since_update: 3,
  staleness: "current",
  domain_score: "Q1 payment pending",
  open_loop_count: 3
}
```

Or if state.md missing:
```
{
  domain: "benefits",
  last_updated: null,
  staleness: "not_initialized",
  domain_score: null,
  open_loop_count: 2
}
```

## Configuration

No configuration required. Domain name is passed by calling op.

## Error Handling

- **state.md missing:** Return `staleness: "not_initialized"`, `last_updated: null`, `domain_score: null`. Do not error.
- **open-loops.md missing:** Return `open_loop_count: 0`. Do not error.
- **last-updated field absent from state.md:** Fall back to file modification timestamp.
- **Score field not found in state.md:** Return `domain_score: null`. Do not invent a score.

## Vault Paths

- Reads from: ~/Documents/aireadylife/vault/{domain}/state.md, ~/Documents/aireadylife/vault/{domain}/open-loops.md
- Writes to: none (returns data to calling op)
