---
type: task
trigger: user-or-flow
description: >
  Maintains the single source of truth for drug allergies, food allergies, environmental
  allergies, adverse reactions, and current active medications — formatted for ER/EMS
  readability. One file, one format, used by every flow that needs an authoritative
  allergy/medication picture (appointment briefs, emergency card generation, post-visit
  reconciliation). Critical because allergy lists drift across portals and providers.
---

# health-update-allergy-medication-list

**Trigger:**
- User input: "add an allergy", "update medication list", "I had a reaction to X"
- Called by: `flow-reconcile-medications-post-visit`, `task-prepare-emergency-medical-info`, `flow-prep-appointment-brief`

## What It Does

Allergies and active medications are the single most important information for any clinical or emergency interaction. This task keeps them in one canonical, ER-readable file.

**File: `vault/health/00_current/allergies-meds.md`**

**Allergy section:**
- Substance (drug, food, environmental, latex, contrast dye)
- Reaction type (hives, anaphylaxis, GI upset, swelling, breathing difficulty, rash) — uses standard adverse-reaction vocabulary so ER staff parse it instantly
- Severity (mild / moderate / severe / life-threatening)
- Onset date / discovery date
- Last reaction date
- Verified by (self-reported, allergist-confirmed, ER-documented)

**Active medication section** (mirrors `medications.md` but ER-formatted):
- Name (generic + brand)
- Dose
- Frequency
- Indication (why taking it — important for ER triage)
- Prescribing provider

**Adverse reaction section** (distinct from allergy — for non-allergic intolerances):
- Substance
- Reaction (e.g., metformin → severe GI; statin → muscle pain)
- Note ("not a true allergy but avoid")

**Format rules:**
- Plain text, scannable in <30 seconds
- Severe / life-threatening allergies appear at the top in bold
- Names use generic + brand to survive formulary swaps

## Steps

1. Receive input (new allergy, reaction note, medication change)
2. Validate reaction type against the allowed vocabulary; if novel, prompt user to map to closest standard term
3. If severity is `severe` or `life-threatening`, also write to `vault/health/00_current/emergency-card.md` (via `task-prepare-emergency-medical-info`)
4. Update file; preserve order (severe at top, then alphabetic)
5. Write a change-log entry to `01_prior/allergy-med-changelog.md`

## Configuration

`vault/health/config.md`:
- `allergy_severity_levels` (default: mild, moderate, severe, life-threatening)
- `auto_propagate_severe_to_emergency_card` (default true)

## Vault Paths

- Reads/writes: `vault/health/00_current/allergies-meds.md`
- Writes: `vault/health/01_prior/allergy-med-changelog.md`
- May trigger: `task-prepare-emergency-medical-info`
