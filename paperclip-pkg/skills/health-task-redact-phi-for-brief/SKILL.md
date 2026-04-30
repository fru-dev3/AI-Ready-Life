---
type: task
trigger: called-by-flow-or-op
description: >
  Deterministic redaction step run on every string destined for vault/health/02_briefs/.
  Strips direct identifiers (full name, DOB, MRN, SSN, address, phone, email), raw lab
  numerics (replaced with categorical band: below-range / in-range / above-range plus
  trend direction), and clinical interpretations that aren't user-authored. Single
  primitive enforced across labs, flags, briefs, and post-visit summaries. Closes the
  "PHI never leaves vault in briefings" non-negotiable.
---

# health-redact-phi-for-brief

**Trigger:** Called by every flow that writes to `vault/health/02_briefs/` — `flow-prep-appointment-brief`, `flow-build-lab-summary`, `flow-build-wellness-summary`, `flow-build-hsa-utilization-summary`, `flow-eob-reconciliation`, etc.
**Produces:** Cleaned text returned to caller; no vault writes.

## What It Does

Single deterministic redaction primitive. Briefs are derivative documents that may be shared (printed, emailed, dropped into another tool). The vault is the system of record; briefs must not contain raw PHI.

**Redaction rules (applied in order):**

1. **Direct identifiers** — replaced with placeholders:
   - Full name → `[user]`
   - Date of birth → `[DOB]`
   - Medical record number, member ID, group number → `[ID]`
   - SSN, full address, phone, email → `[redacted]`

2. **Raw lab values** — replaced with categorical bands using reference ranges:
   - Below low end of range → `below range`
   - Within range → `in range`
   - Above high end of range → `above range`
   - Trend direction added: `(trending up)`, `(trending down)`, `(stable)` — derived from `task-attach-trend-context` if a prior value exists

3. **Clinical interpretations not authored by the user** — copy-pasted physician notes are summarized to the user-action layer ("provider recommended follow-up in 3 months") rather than verbatim diagnostic language

4. **Provider names** — kept (the user controls who they share the brief with), but any provider note text is paraphrased

5. **Allow-list:** the user's first name, the categorical bands, dates of appointments, medication names, and dosages remain — these are needed for the brief to be useful

## Steps

1. Receive input string + context (caller skill name, which lab values came with prior values)
2. Apply identifier scrub (regex + config-driven name list)
3. For each lab value detected in the string, look up reference range and replace with band
4. Detect physician-note blocks (typically multi-sentence prose) and summarize to action layer
5. Return cleaned string

## Configuration

`vault/health/config.md`:
- `redact_first_name` (yes/no — default no)
- `redact_provider_names` (default no)
- `redact_categorical_only` (default yes — never include raw lab numerics)

## Vault Paths

- Reads: `vault/health/config.md`, lab reference ranges from `vault/health/00_current/lab-reference.md`
- Writes: none (returns cleaned string)
