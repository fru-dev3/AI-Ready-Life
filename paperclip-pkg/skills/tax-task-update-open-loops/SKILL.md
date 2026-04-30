---
type: task
cadence: called-by-op
description: >
  The single write point for vault/tax/open-loops.md. Called at the end of every tax
  op. Appends new flags (approaching deadlines, missing documents, deduction gaps,
  entity compliance issues, estimated payment recommendations, documentation pending)
  with timestamp, source op, severity, and due date. Scans existing OPEN entries for
  items that can be auto-resolved — paid deadlines, received documents, completed
  filings. Preserves resolved items with resolution date for audit trail.
---

# task-update-open-loops

**Cadence:** Called at the end of every tax op
**Produces:** Updated `vault/tax/open-loops.md` with new flags appended and resolved items closed

## What It Does

Serves as the single, authoritative write point for the tax domain's open-loop tracking file. Every tax op calls this task at the end of its run, passing in all flags generated during execution. Direct writes to `open-loops.md` are never done by the ops themselves — all writes flow through this task to ensure consistent structure, deduplication, and resolution logic.

**Append logic.** Each new flag is written as a structured entry with: ISO timestamp, source op name, flag type (deadline-alert / missing-document / deduction-gap / entity-compliance / documentation-pending / payment-recommendation / charitable-receipt-required / contribution-limit / 1099-issuer-pending / equity-comp-event / other), severity (LOW / MEDIUM / HIGH / CRITICAL), one-line summary, full action item text including specific portal or contact, due date (for deadline-type flags), entity (personal or business entity name), and status: OPEN.

**Deadline-alert flags (specific shape).** When a tax deadline is identified within 30 days, the calling op passes a `deadline-alert` flag with these fields, all written verbatim into the open-loops entry:
- Deadline type: Estimated Tax Payment (Q1/Q2/Q3/Q4), Federal Return Due, Extension Due, S-Corp Return, LLC Annual Report, Franchise Tax, Form 941, Registered Agent Renewal, State Return, State Estimated Payment.
- Entity: Personal, or specific entity name.
- Due date in ISO format (YYYY-MM-DD); days remaining computed from today.
- Amount: estimated/required payment, "N/A" for non-payment filings, or "TBD — run quarterly estimate" if not yet calculated.
- Payment / filing method: specific URL or portal — e.g., `irs.gov/payments → Estimated Tax → 1040-ES`, `eftps.gov`, state revenue portal, registered agent renewal portal, payroll provider tax filing module.
- Urgency tier: CRITICAL ≤7 days, HIGH 8–14 days, MEDIUM 15–30 days.
- Source reference: link to the calculation file (e.g., `vault/tax/00_current/YYYY-Q3-estimate.md`).
- Extension note: if `extensions_filed` config covers this deadline, annotate "Extension filed — payment deadline unchanged" (an extension to file does not extend time to pay).
- EFTPS warning: if amount >$1,000 and `eftps_enrolled: false`, add "EFTPS enrollment takes 5–7 business days. Use IRS Direct Pay for immediate payment."

**Deduplication.** Before writing a new flag, the task checks for an existing OPEN entry with the same flag type and identifier. For deadline flags: same deadline type + entity + due date. For document flags: same document type + payer name. If an identical flag already exists, the timestamp is refreshed and updated data (new amount, updated urgency tier) is merged rather than duplicating. This prevents the same estimated tax payment deadline from appearing 4 times across 4 monthly runs.

**Auto-resolution rules.** The task scans all existing OPEN entries and applies resolution logic by flag type:
- Deadline alerts: auto-resolve when the due date has passed; add resolution note "Deadline passed — confirm payment recorded"
- Missing document flags: auto-resolve when the document appears in `vault/tax/00_current/YYYY/` with the correct filename (checked by scanning the directory)
- Deduction documentation pending: auto-resolve when the document reference is updated in the deduction log to "DOCUMENTED" status
- Entity compliance flags: auto-resolve when the confirmed filing date is recorded in `vault/tax/00_current/` after the deadline
- Quarterly estimate flags: auto-resolve when the payment is recorded in `vault/tax/00_current/payment-log.md`

**Severity escalation.** The task applies automatic severity escalation rules: any deadline flag that was MEDIUM (15–30 days) last month and is now within 14 days is escalated to HIGH; any HIGH within 7 days is escalated to CRITICAL. Any missing document that was PENDING (before issuer deadline) and is now past the issuer deadline by 30+ days is escalated to HIGH.

**Resolution record.** Resolved items are marked RESOLVED with a resolution timestamp and a one-line resolution note. They are never deleted. The full history of all tax flags and their resolutions is preserved in `open-loops.md` as a permanent audit trail — this is valuable if the user is ever audited, as it documents the attention paid to each tax obligation throughout the year.

## Apps

None

## Vault Output

- `vault/tax/open-loops.md` — updated with new flags appended and resolved items closed
