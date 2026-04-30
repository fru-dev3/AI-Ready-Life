---
type: task
trigger: user-or-flow
description: >
  Generates a one-page emergency card containing severe allergies, active medications,
  major medical conditions, blood type (if known), insurance info, and ICE (in-case-of-
  emergency) contacts. Output is formatted for wallet print, phone lock-screen image, and
  Apple Medical ID / Android equivalent. Re-runs whenever any source field changes.
  Critical for any user; not optional.
---

# health-prepare-emergency-medical-info

**Trigger:**
- User input: "update my emergency card", "make an emergency medical card"
- Called by: `task-update-allergy-medication-list` (when severe allergy added), `task-update-family-medical-history` (annual refresh)

## What It Does

A single emergency card the user can keep in their wallet, on their phone lock screen, and in Apple Medical ID / Android equivalent. The data exists scattered across other vault files; this skill assembles it into the standard EMS-readable format.

**Card sections (printed in this order, severity-ranked):**

1. **Identifier line:** First name + age range (no DOB — placed for EMS use, not identity)
2. **Severe allergies:** every allergy with severity `severe` or `life-threatening` from `allergies-meds.md`
3. **Active medications:** name + dose + frequency, max 10 items (most clinically significant first)
4. **Major medical conditions:** from `vault/health/00_current/conditions.md` — diabetes, heart disease, asthma, seizure disorder, etc.
5. **Blood type:** if user has logged it (many users don't know theirs — flag if missing)
6. **Insurance:** carrier name + member ID + group number
7. **ICE contacts:** 1–2 emergency contacts with name, relationship, phone
8. **Primary care provider:** name + phone (from provider directory)
9. **Last updated:** date

**Output formats produced:**
- Markdown card at `vault/health/00_current/emergency-card.md`
- Print-ready text variant fitting on a 3.5" × 2" wallet card
- Phone lock-screen image specs (1170×2532 portrait JPG, generated text-only)
- Apple Medical ID field-by-field guide so the user can copy values into the Health app

## Steps

1. Read all source files: `allergies-meds.md`, `medications.md`, `conditions.md`, `provider-directory.md`, `config.md`
2. Filter allergies to `severe` and `life-threatening`
3. Rank medications by clinical significance (insulin, anticoagulants, antiarrhythmics, seizure meds first; then chronic-condition meds; then everything else)
4. Assemble card in fixed order
5. Write the markdown card
6. Write the print-ready variant
7. Write the Apple Medical ID instructions
8. If blood type is missing, ICE contacts are missing, or insurance is missing, surface to open-loops

## Configuration

`vault/health/config.md`:
- `ice_contacts` — list of name + relationship + phone
- `blood_type` (optional)

## Vault Paths

- Reads: `vault/health/00_current/allergies-meds.md`, `medications.md`, `conditions.md`, `provider-directory.md`, `config.md`
- Writes: `vault/health/00_current/emergency-card.md`, `emergency-card-wallet.txt`, `emergency-card-lockscreen.md`
- Updates: `vault/health/open-loops.md`
