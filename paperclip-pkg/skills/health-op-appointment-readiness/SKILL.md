---
type: op
trigger: user-facing
description: >
  Scans for medical appointments inside the next 7 days, triggers flow-prep-appointment-brief
  for each, and verifies in-network status with the user's health insurance carrier before
  any elective visit or procedure. Closes the "preparation is the gift" non-negotiable —
  no appointment happens without a brief, no elective happens without coverage verification.
  Surfaces missing coverage, missing prior-visit summary, or out-of-network providers as
  HIGH-severity open-loops.
---

# health-appointment-readiness

**Trigger phrases:**
- "any appointments coming up"
- "prep my appointments"
- "appointment readiness"
- "what's on my health calendar"
- "verify coverage for my appointment"

**Cadence:** Weekly (Sunday) and on-demand. Also called nightly by `op-monthly-sync` if any appointment falls inside the lead window.

## What It Does

Two-part operation:

**1. Brief generation:**
- Reads `vault/health/00_current/appointments.md`
- Identifies any appointment within the configured lead window (default 7 days)
- For each, calls `flow-prep-appointment-brief`
- Skips if a brief for that appointment already exists in `02_briefs/`

**2. Coverage verification (elective only):**
- For elective procedures and specialist consults, verifies the provider is in-network with the user's health insurance carrier
- In-network status is read from `vault/health/00_current/provider-directory.md` (maintained by `task-update-provider-directory`)
- If status is unknown or out-of-network: writes a HIGH-severity open-loop "verify coverage with [carrier] before [date]"
- For procedures requiring pre-authorization (configurable list), prompts the user to confirm prior auth was obtained

**Output:** Console summary of appointments in window + brief-file paths + any coverage flags.

## Steps

1. Read upcoming appointments
2. Filter to those inside the lead window
3. For each, check if brief already exists; if not, call `flow-prep-appointment-brief`
4. For elective visits, look up provider in `provider-directory.md` and verify in-network
5. For pre-auth-required procedures, verify pre-auth status field is populated
6. Call `task-update-open-loops` with any coverage or pre-auth gaps
7. Print summary to user

## Configuration

`vault/health/config.md`:
- `appointment_lead_days` (default 7)
- `elective_visit_types` (default: specialist, dermatology, imaging, surgery, procedure)
- `pre_auth_required_procedures` (user-configurable list)

## Vault Paths

- Reads: `vault/health/00_current/appointments.md`, `provider-directory.md`, `config.md`
- Writes via flow + task: `vault/health/02_briefs/`, `vault/health/open-loops.md`
