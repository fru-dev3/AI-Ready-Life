---
name: arlive-tax-task-update-open-loops
type: task
cadence: called-by-op
description: >
  Writes all tax flags from the current run to vault/tax/open-loops.md and resolves
  completed items. Called at the end of every tax op.
---

# arlive-tax-update-open-loops

**Cadence:** Called at the end of every tax op
**Produces:** Updated vault/tax/open-loops.md with new flags appended and resolved items closed

## What it does

Serves as the single write point for the tax domain's open-loop tracking file. Every tax op calls this task at the end of its run, passing in all flags generated during execution: approaching payment deadlines, missing tax documents, deduction gaps, entity compliance issues, estimated payment recommendations, and document naming violations. Each flag is written with a timestamp, source op, severity, due date where applicable, and status of "open". The task simultaneously scans existing open items for entries that can be auto-resolved — for example, a missing document flag once the document has been received and logged, or a deadline flag after the payment date has passed. Resolved items are marked with a resolution date rather than deleted, preserving the audit trail.

## Apps

None

## Vault Output

`vault/tax/open-loops.md`
