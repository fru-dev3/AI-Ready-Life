---
type: task
trigger: user-or-flow
description: >
  After a claim is filed: tracks claim number, carrier, policy, incident date, filing
  date, current status, adjuster contact, expected resolution timeline, document
  requests, and follow-up dates. Surfaces stalled claims (no status update in 30+
  days) and looming response deadlines. Each claim is a record in
  vault/insurance/00_current/claims/ that the user updates as status changes.
---

# insurance-track-claim-status

**Trigger:**
- User input: "log a new claim", "update claim status", "claim follow-up"
- Called by: `op-claims-review`, `op-document-claims-process`, `op-life-event-coverage-trigger` (death event)

## What It Does

Claims often take weeks or months and have multiple deadlines (proof-of-loss, appraisal, settlement response, appeal). Without structured tracking, deadlines get missed and adjusters go quiet. This task is the per-claim ledger.

**Per-claim record contents:**
- `claim_number`, `carrier`, `policy_type`, `policy_number`
- `incident_date`, `incident_description`
- `filing_date`, `claim_status` (open / under-investigation / approved / denied / settled / closed / disputed)
- `adjuster_name`, `adjuster_phone`, `adjuster_email`
- `documents_submitted` (list with dates)
- `documents_requested` (list with deadline dates)
- `expected_resolution_date` (from carrier guidance)
- `last_status_update_date`
- `follow_up_actions` (list with action and date)
- `settlement_offers` (list with amount, date, response)
- `notes_log` (running journal)

**Stall detection:** If `last_status_update_date` is more than 30 days ago, the claim is flagged STALLED. State insurance regulations typically require timely communication; a stall is a prompt to escalate (call adjuster, request supervisor, file complaint with state DOI).

## Steps

1. Receive input: new claim creation, status update, or follow-up note.
2. If new: create `vault/insurance/00_current/claims/{claim-number}.md` with full record.
3. If update: append to the existing record, update status fields, append note to journal.
4. Compute days since last status update.
5. If stalled (>30 days): flag via `task-update-open-loops` with severity HIGH.
6. If a document deadline is within 7 days: flag as URGENT.
7. If a settlement offer is open: flag with response deadline.
8. Return the updated record.

## Configuration

`vault/insurance/config.md`:
- `claim_stall_threshold_days` (default 30)
- `state` — used to surface state-DOI escalation guidance for stalled claims

## Error Handling

- **Claim record exists at same number:** Treat as update, not new.
- **Status update without claim number:** Prompt user to either provide the number or create a new claim record.

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/insurance/00_current/claims/`
- Writes: `~/Documents/aireadylife/vault/insurance/00_current/claims/{claim-number}.md`, `~/Documents/aireadylife/vault/insurance/open-loops.md`
