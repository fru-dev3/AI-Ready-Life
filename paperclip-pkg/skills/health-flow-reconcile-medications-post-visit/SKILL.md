---
type: flow
trigger: called-by-op
description: >
  After a visit note or after-visit summary lands in the vault, diffs the new prescriptions
  and discontinuations against the active medication list. Adds new prescriptions, marks
  discontinued meds inactive, updates dose changes, and writes a reconciliation note. Closes
  the "medication list current after every visit" non-negotiable that monthly medication
  reviews don't address. Distinct from refill tracking — this is about list correctness, not
  supply management.
---

# health-reconcile-medications-post-visit

**Trigger:** Called by `op-lab-review`, `op-medication-review`, or fired automatically when a new visit note is detected in `vault/health/00_current/visit-notes/`.
**Produces:** Updated `medications.md` + reconciliation entry in `vault/health/01_prior/med-reconciliation-log.md`.

## What It Does

Most medication errors come from a stale list, not a missed refill. This flow keeps the active list synchronized with the most recent provider visit.

**For each new visit note (from patient portal export or manual upload):**
1. Extract the post-visit medication list from the after-visit summary or visit note
2. Diff against the current `medications.md`:
   - **Added:** new prescription not previously listed → append with prescriber, indication, start date
   - **Discontinued:** previously active med absent from new list → mark inactive with discontinue date and reason (if stated)
   - **Changed:** same medication, different dose/frequency → update with old → new transition note
   - **Unchanged:** no action
3. Write a reconciliation entry to `01_prior/med-reconciliation-log.md` summarizing the diff
4. Surface any unexpected discontinuation (med dropped without explicit reason in note) as a MEDIUM open-loop for user confirmation

**Edge cases:**
- If the visit note doesn't contain a structured medication list, prompt the user to confirm the active list is still accurate
- If a controlled substance is added or stopped, tag as HIGH-severity for the user to acknowledge
- If multiple visits happened since last reconciliation, process them in chronological order

## Steps

1. Identify unprocessed visit notes (newer than `last_med_reconciliation_date` in config)
2. For each, parse medication section
3. Diff vs current `medications.md`
4. Apply changes; preserve fill-date and pharmacy fields on unchanged entries
5. Write reconciliation log entry
6. Update `last_med_reconciliation_date`
7. Surface unexpected drops to open-loops

## Configuration

`vault/health/config.md`:
- `visit_notes_path` (default `vault/health/00_current/visit-notes/`)
- `last_med_reconciliation_date` (auto-updated)

## Vault Paths

- Reads: `vault/health/00_current/visit-notes/`, `vault/health/00_current/medications.md`
- Writes: `vault/health/00_current/medications.md`, `vault/health/01_prior/med-reconciliation-log.md`
- Updates via task: `vault/health/open-loops.md`
