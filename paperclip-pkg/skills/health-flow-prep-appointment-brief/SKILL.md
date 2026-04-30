---
type: flow
trigger: called-by-op
description: >
  Builds a 24-hour pre-visit packet for an upcoming appointment. Aggregates last-visit
  summary, current medication list, open lab flags with trend deltas, vitals trend since
  last visit, and three prepared questions tailored to the appointment type (annual physical,
  follow-up, specialist). Produces a single one-page brief the user can print or read on
  the way to the appointment. PHI is redacted before any text leaves the vault folder.
---

# health-prep-appointment-brief

**Trigger:** Called by `op-appointment-readiness`, on-demand by user.
**Produces:** One-page pre-visit brief in `vault/health/02_briefs/`.

## What It Does

Converts the vault from passive archive into "walk in as the most informed patient." The brief is structured for the visit type and limited to one page so it actually gets read.

**Sections produced:**
- **Visit context:** date/time, provider name, specialty, in-network status, copay
- **Last visit summary:** date, reason, key findings, follow-up actions taken (or not)
- **Current medications:** name, dose, frequency, prescribing provider, adherence note
- **Open lab flags:** any out-of-range biomarker from the last 12 months with prior-value + trend direction (calls `task-attach-trend-context`)
- **Vitals trend:** weight, BP, resting HR since last visit (if wearable + manual data exist)
- **Three prepared questions:** generated from the visit type and any open-loops tagged for the relevant body system or specialty
- **Logistics:** address, parking, what to bring (insurance card, ID, payment method, list of meds)

**PHI handling:** every string written to `02_briefs/` runs through `task-redact-phi-for-brief` first. Identifiers (full name, DOB, MRN, raw lab values) are scrubbed; the brief uses categorical descriptions (e.g., "fasting glucose: above range, trending up") rather than raw numbers.

## Steps

1. Read appointment record from `vault/health/00_current/appointments.md`
2. Read last visit summary for the same provider from `01_prior/`
3. Read current medications, open-loops, recent labs
4. For each open lab flag, call `task-attach-trend-context` to get prior value + delta
5. Generate three appointment-appropriate questions based on visit type and open issues
6. Compose one-page brief; run `task-redact-phi-for-brief` on the assembled text
7. Write to `vault/health/02_briefs/YYYY-MM-DD-{provider-slug}-prep.md`

## Configuration

`vault/health/config.md`:
- `appointment_brief_lead_hours` (default 24)
- `appointment_brief_question_count` (default 3)

## Vault Paths

- Reads: `vault/health/00_current/`, `vault/health/01_prior/`, `vault/health/open-loops.md`
- Writes: `vault/health/02_briefs/YYYY-MM-DD-{provider}-prep.md`
