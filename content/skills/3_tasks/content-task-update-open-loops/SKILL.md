---
name: arlive-content-task-update-open-loops
type: task
description: >
  Writes all content flags (revenue dips, SEO gaps, publishing misses, channel
  anomalies) to vault/content/open-loops.md and resolves completed items.
---

# arlive-content-update-open-loops

**Produces:** An updated `vault/content/open-loops.md` with new flags appended and resolved items marked complete.

## What it does

Maintains the canonical open-loops file for the content domain. Receives flags from every content op (revenue dips, SEO ranking drops, channel underperformance, missed publishing targets, uncovered keywords) and writes them as structured entries to `vault/content/open-loops.md`. Each entry includes the flag type, the specific finding, the recommended action, a priority level, and the date it was surfaced. On every run, also checks existing open loop items against current vault data to resolve any that are no longer applicable — a revenue dip resolved, a flagged content piece updated, a keyword gap filled. Keeps the file to a manageable length by archiving resolved items to a separate `vault/content/open-loops-archive.md` rather than deleting them, preserving history for pattern analysis. The file is read by `arlive-calendar-collect-deadlines` for cross-domain deadline scanning, so entries with explicit action-by dates will surface in weekly agendas automatically.

## Apps

vault file system

## Vault Output

`vault/content/open-loops.md`
