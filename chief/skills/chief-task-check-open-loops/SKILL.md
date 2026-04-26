---
name: chief-task-check-open-loops
type: task
description: >
  Reads all open-loops.md files across installed plugin vaults and returns a count and priority
  summary. Used by chief flows to understand what needs attention.
---

# chief-check-open-loops

**Trigger:** Called by `chief-op-weekly-preview` and any flow needing a current backlog snapshot
**Produces:** Structured backlog summary — total open-loop count, count by domain, count by priority tier

## What It Does

This task produces a lightweight backlog snapshot used by the weekly preview and any chief flow that needs to understand system-wide open-loop health without loading the full text of every item. It counts, not reads — it does not return item descriptions, only numbers.

The task scans ~/Documents/aireadylife/vault/ for all plugin subdirectories containing an open-loops.md file. For each discovered plugin, it reads the open-loops.md and counts every unresolved item (unchecked checkbox: `- [ ]`). Items are classified by their priority marker (🔴 / 🟡 / 🟢) and counted per tier per domain.

The result is a structured table: domain name, total unresolved items, count per tier. A summary row shows totals across all domains. Any domain with 5+ unresolved items gets a "potential backlog buildup" annotation in the result — this threshold signals that items are accumulating faster than they're being resolved, which is worth investigating. Any domain where the unresolved count increased compared to the snapshot in the prior week's vault/chief/02_briefs/ archive gets a "growing" annotation.

This task intentionally does not return item text — that is the job of `chief-flow-collect-domain-alerts`. check-open-loops is a count-only operation designed to be fast and to give the calling flow a week-over-week trend signal without having to parse and re-sort the full alert list.

## Steps

1. Scan ~/Documents/aireadylife/vault/ for subdirectories with open-loops.md
2. For each discovered domain: read open-loops.md; count unresolved items (unchecked checkboxes)
3. Classify each unresolved item by priority marker: 🔴, 🟡, or 🟢
4. Record count per tier per domain
5. Check vault/chief/02_briefs/ archive for prior week's count per domain (for trend calculation)
6. Annotate domains with 5+ total unresolved items as "potential backlog buildup"
7. Annotate domains where count increased vs. prior week as "growing"
8. Assemble and return structured backlog summary table to calling flow

## Input

- ~/Documents/aireadylife/vault/*/open-loops.md
- ~/Documents/aireadylife/vault/chief/02_briefs/ (prior week's brief for trend comparison)

## Output Format

Returns structured data to calling flow (not written to disk):
```
| Domain     | Total | 🔴 | 🟡 | 🟢 | Trend   | Notes                    |
|------------|-------|----|----|-----|---------|--------------------------|
| tax        | 3     | 1  | 0  | 2  | Stable  |                          |
| benefits   | 6     | 0  | 2  | 4  | Growing | Potential backlog buildup|
| calendar   | 1     | 0  | 1  | 0  | Stable  |                          |
| TOTAL      | 10    | 1  | 3  | 6  | —       |                          |
```

## Configuration

No configuration required. Auto-discovers plugins from vault/ directory structure.

## Error Handling

- **Prior week's brief missing (no trend data):** Return counts without trend annotations; note "Insufficient history for trend — available after 2 weekly brief cycles."
- **open-loops.md missing for a domain:** Record as 0 unresolved items with note "open-loops.md not found."
- **Checkbox format not used in open-loops.md:** Fall back to counting lines starting with `-` that don't start with `- [x]`.

## Vault Paths

- Reads from: ~/Documents/aireadylife/vault/*/open-loops.md, ~/Documents/aireadylife/vault/chief/02_briefs/
- Writes to: ~/Documents/aireadylife/vault/chief/00_current/ (via calling op, not directly)
