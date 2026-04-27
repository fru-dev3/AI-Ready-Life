---
type: task
trigger: user-or-flow
description: >
  Tracks professional licenses (PE, CPA, RN, MD, JD, bar admission, etc.), industry
  certifications (AWS, GCP, Azure, PMP, CISSP, CFA, SHRM, etc.), and continuing-education
  credits. Logs renewal deadlines, required CEU hours and completion progress, and surfaces
  any renewal coming up in the next 90/60/30 days. Skipped entirely for users without any
  licensed/certified credentials.
---

# career-track-license-cert-renewal

**Trigger phrases:**
- "track my licenses"
- "add a certification"
- "log CEU credit"
- "when does my license renew"
- "certification renewal check"

**Cadence:** Per-event for adds/edits; quarterly automatic scan for renewal proximity.

## What It Does

Maintains `vault/career/00_current/credentials.md` with one entry per license or certification. Per entry:

- `name` (e.g., "Washington State CPA License", "AWS Solutions Architect Professional")
- `type` (license / certification / continuing-ed-credit)
- `issuing_body`, `credential_id`, `issued_date`, `expiry_date`
- `renewal_method` (CEU credits / re-exam / fee-only / hybrid)
- `ceu_hours_required`, `ceu_hours_completed`, `ceu_period_start`, `ceu_period_end`
- `last_proof_filed_date` (when proof of credit hours was last submitted to the issuer)
- `cost_to_renew` (fee + study time estimate)
- `notes`

**Renewal scan:**
- Expiry within 90 days → MEDIUM open-loop
- Expiry within 60 days AND CEU hours incomplete → HIGH open-loop
- Expiry within 30 days regardless of CEU status → HIGH open-loop with explicit "schedule renewal action this week"
- Already expired → CRITICAL open-loop (legal/professional risk)

**CEU progress check (when applicable):** if `ceu_hours_required` is set, compute `ceu_hours_completed / ceu_hours_required` and compare to `(today - ceu_period_start) / (ceu_period_end - ceu_period_start)`. If completion ratio lags pace ratio by more than 25%, flag MEDIUM with "off-pace for CEU requirement."

## Steps

1. Collect input: add credential, update credential, log CEU hours, or scan-only.
2. For add/update: validate required fields by `type` (CEU fields only required for license types that need them).
3. Append or update entry in `vault/career/00_current/credentials.md`.
4. Run renewal-proximity scan across all entries.
5. Run CEU pace check across entries with `ceu_hours_required` set.
6. Call `task-update-open-loops` with all flags from the scans.
7. Return summary: count of credentials tracked, count by status (current / approaching renewal / overdue / off-pace).

## Configuration

`vault/career/config.md`:
- `credential_renewal_warn_days` (default 90)
- `credential_renewal_urgent_days` (default 30)
- `ceu_pace_lag_threshold_pct` (default 25)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/career/00_current/credentials.md`
- Writes: `~/Documents/aireadylife/vault/career/00_current/credentials.md`, `open-loops.md`
