---
type: op
trigger: user-facing
cadence: on-demand (also triggered annually after coverage audit)
description: >
  For each active policy category, generates a one-page claims runbook the user can hit
  the moment something happens. Each runbook includes carrier claim phone, claim portal
  URL, doc checklist, deadline to file, what to say (and not say), and what comes next.
  The point is that you should not be reading your policy for the first time at the
  scene of an accident.
---

# insurance-document-claims-process

**Trigger phrases:**
- "document claims process"
- "claims runbook"
- "what to do if I need to file a claim"
- "build claims playbook"

**Cadence:** Annual or whenever a new policy is added.

## What It Does

Most users only read their claims process at the worst possible moment. This op pre-builds the runbook. One page per active policy category, all stored in `vault/insurance/02_briefs/claims-runbooks/`.

**Per-category runbook contents:**
- Carrier name + claim department phone (toll-free)
- Claim portal URL + login hint
- Filing deadline (most policies require notice "as soon as practicable" — for auto/home that often means 24-72 hrs; for life it can be longer; spell it out)
- Document checklist (police report for auto, photos for property, medical records for health, death certificate for life, etc.)
- "Say this" / "do not say this" bullets — generic guidance, not legal advice (e.g. don't admit fault at scene; do document everything; don't sign settlement releases without review)
- What happens next: adjuster contact window, inspection process, settlement timeline
- Where the active claim should be tracked (`task-track-claim-status`)

## Steps

1. Read all active policy records from `vault/insurance/00_current/policies/`.
2. Group by policy category (auto, home/renters, landlord, life, disability, health, umbrella, pet, other).
3. For each category present, generate or refresh `vault/insurance/02_briefs/claims-runbooks/{category}.md` using the carrier-specific contact info from the policy record.
4. For categories with multiple policies (e.g. multiple vehicles or properties), one runbook per policy, named `{category}-{property-or-vehicle-slug}.md`.
5. Update an index file `vault/insurance/02_briefs/claims-runbooks/README.md` linking each runbook with the active policy.
6. Surface to open-loops: any active policy with insufficient claims-contact data in its record.

## Configuration

Optional in `vault/insurance/config.md`:
- `claim_contact_overrides` — manual override of carrier claim numbers if the policy record is incomplete
- `attorney_contact` — optional; surfaced for high-severity claim categories

## Error Handling

- **No policies in vault:** Output guidance to run `flow-sync-policy-docs` first.
- **Claim contact not in policy record:** Use carrier's published claims line as fallback; flag for manual verification.

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/insurance/00_current/policies/`, `~/Documents/aireadylife/vault/insurance/config.md`
- Writes: `~/Documents/aireadylife/vault/insurance/02_briefs/claims-runbooks/`
