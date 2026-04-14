---
name: aireadylife-ben-task-check-open-loops
type: task
description: >
  Reads all open-loops.md files across installed plugin vaults and returns a count and priority
  summary. Used by ben flows to understand what needs attention.
---

# aireadylife-ben-check-open-loops

**Trigger:** Called by ben flows that need a current backlog snapshot before building a brief or agenda
**Produces:** Structured summary: total open-loop count, count by domain, count by priority tier

## What it does

Scans the vault/ directory to discover all installed plugins that have an open-loops.md file.
For each plugin vault found, reads the file and counts all unresolved items (not marked complete).
Classifies each item by its priority marker (🔴 / 🟡 / 🟢) and records the count per tier per
domain. Produces a compact structured summary: total count across all domains, a domain breakdown
table (domain name, total items, 🔴 count, 🟡 count, 🟢 count), and a call-out if any domain
has more than 5 unresolved items (potential backlog buildup). This summary is lightweight by
design — it does not return the full text of each item (that is collect-domain-alerts' job), only
the counts needed for the weekly preview's backlog section or any flow that needs to check overall
domain health without loading the full alert list.

## Configuration

No special configuration required. Auto-discovers plugins from vault/ directory structure.

## Apps

None

## Vault Output

`vault/ben/02_agenda/`
