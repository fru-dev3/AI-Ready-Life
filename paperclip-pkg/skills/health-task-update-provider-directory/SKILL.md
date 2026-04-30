---
type: task
trigger: user-or-flow
description: >
  Maintains the single provider directory at vault/health/00_current/provider-directory.md.
  Each entry: provider name, specialty (PCP, dentist, eye doctor, dermatologist, OB-GYN,
  mental health, specialist), practice address, phone, patient-portal URL, last-visit date,
  next-visit date, in-network status with the user's health insurance carrier, and notes.
  Foundational — every appointment, coverage-verification, and emergency-info skill reads
  from this file.
---

# health-update-provider-directory

**Trigger:**
- User input: "add my new dentist", "update provider info", "log a new specialist"
- Called by: `op-appointment-readiness` (to verify in-network), `task-prepare-emergency-medical-info`, `flow-prep-appointment-brief`

## What It Does

Single source of truth for every clinician the user sees. Other skills read this file rather than asking the user to repeat information.

**Each entry contains:**
- Provider name
- Specialty (free-text but normalized: `pcp`, `dentist`, `eye`, `derm`, `ob-gyn`, `mental-health`, `cardiology`, etc.)
- Practice / clinic name
- Address
- Phone
- Fax (rarely needed but useful for records-request flows)
- Patient-portal URL and login hint
- Last-visit date
- Next scheduled visit date (if any)
- In-network status: `in-network`, `out-of-network`, `unknown` — verified against the user's health insurance carrier
- In-network last-verified date (so stale verifications can be re-checked)
- NPI number (optional; helpful for insurance disputes)
- Notes — anything the user wants to remember (parking, "ask for the morning slot", etc.)

**Stale-verification flag:** if `in-network last-verified date` is >12 months old, the provider is shown as `unknown` to downstream skills until re-verified.

## Steps

1. Receive input: provider name + at least one identifier (specialty + phone, or specialty + clinic)
2. If entry exists for this provider, merge new fields onto existing entry
3. If new, create entry with all available fields and `in-network: unknown` if not provided
4. Write/update `vault/health/00_current/provider-directory.md` (sorted by specialty then name)
5. If `in-network` is `unknown` and the provider is being added in support of an upcoming appointment, surface a verification reminder via `task-update-open-loops`

## Configuration

`vault/health/config.md`:
- `insurance_carrier` (used for in-network framing)
- `provider_directory_stale_months` (default 12)

## Vault Paths

- Reads/writes: `vault/health/00_current/provider-directory.md`
- Updates via task: `vault/health/open-loops.md`
