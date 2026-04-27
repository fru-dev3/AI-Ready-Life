---
type: task
trigger: user-or-flow
description: >
  Reads a policy PDF (declarations page or full contract) and produces a plain-language
  one-page summary: carrier, policy number, coverage type, effective and renewal dates,
  premium, deductible, out-of-pocket max, coverage limits, named insureds, key
  exclusions, and the claims contact line. Normalizes carrier-specific jargon into
  consistent vault fields so other skills can read it.
---

# insurance-extract-policy-terms

**Trigger:**
- User input: "summarize this policy", "extract policy terms", "what does this policy actually cover"
- Called by: `flow-sync-policy-docs`, `op-coverage-audit` (when a policy record is missing structured fields)

## What It Does

Insurance documents are dense and inconsistent. Each carrier organizes its declarations page differently and uses its own naming for limits, deductibles, and endorsements. This task is the normalization layer between raw policy PDFs and the structured records the rest of the plugin reads.

**Inputs accepted:** PDF in `vault/insurance/00_current/` (or a path the user provides), an image scan, or pasted policy text.

**Output fields (consistent across carriers):**
- `carrier`, `policy_type` (auto / home / renters / landlord / life / disability / umbrella / health / pet / other)
- `policy_number`, `named_insureds`, `effective_date`, `renewal_date`
- `annual_premium`, `payment_cadence`
- `deductibles` (per coverage line)
- `oop_max` (health policies)
- `coverage_limits` (per-occurrence and aggregate where applicable)
- `endorsements` (riders, scheduled property, etc.)
- `key_exclusions` (the 3-5 most material; not a full legal list)
- `claims_contact` (phone, portal URL, email, claim filing deadline)
- `source_pdf_path`

## Steps

1. Read input PDF or text.
2. Identify carrier and policy type from the document header.
3. Extract structured fields above. Use carrier-naming-to-canonical mapping (e.g. "Coverage A — Dwelling" → `dwelling_coverage`).
4. Summarize key exclusions in plain English (1-2 lines each).
5. Write structured record to `vault/insurance/00_current/policies/{policy_type}-{carrier-slug}.md`.
6. If a record already exists at that path: diff fields and surface changes (renewal premium delta, limit changes, new exclusions).
7. Return the structured record to the caller.

## Configuration

`vault/insurance/config.md`:
- `carriers` — optional override list of expected carriers per policy line

## Error Handling

- **Unreadable PDF:** Surface the file path and ask the user to provide a clearer scan or the carrier portal export.
- **Unknown carrier or policy type:** Save under `policies/unknown-{slug}.md` with raw text and flag for manual classification.

## Vault Paths

- Reads: input PDF (any path), `~/Documents/aireadylife/vault/insurance/00_current/policies/`
- Writes: `~/Documents/aireadylife/vault/insurance/00_current/policies/{policy_type}-{carrier-slug}.md`
