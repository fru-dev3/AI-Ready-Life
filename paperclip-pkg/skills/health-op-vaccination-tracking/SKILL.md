---
type: op
trigger: user-facing
description: >
  Records and reviews vaccination history (childhood + adult) and flags upcoming due
  vaccinations against the CDC adult immunization schedule: annual flu, COVID boosters per
  current guidance, Tdap every 10 years, shingles starting at 50, pneumonia at 65, HPV
  catch-up through 26, and any travel vaccines the user has logged. Reads from any imported
  immunization records (patient portal export or manual entry).
---

# health-vaccination-tracking

**Trigger phrases:**
- "vaccination check"
- "am I due for any shots"
- "immunization review"
- "when is my next booster"
- "log a vaccine"

**Cadence:** Annual full review; on-demand any time. Also called by `op-monthly-sync` to surface anything due in the next 60 days.

## What It Does

Maintains a vaccination log and compares against the CDC adult immunization schedule to flag what's due now or soon.

**Vaccination log fields:**
- Vaccine name (flu, Tdap, MMR, varicella, HPV, hepatitis A, hepatitis B, shingles, pneumonia, COVID, travel-specific)
- Date administered
- Dose number (for multi-dose series)
- Lot number (optional)
- Administering provider / pharmacy
- Source (patient-portal export, paper record, pharmacy receipt)

**CDC schedule check (deterministic rules):**
- Flu: annually, before flu season (flag in September if no current-season dose)
- Tdap: every 10 years
- COVID: per current CDC guidance — flag if current-season booster missing
- Shingles: 2-dose series starting at age 50
- Pneumonia: PCV15 / PCV20 / PPSV23 starting at age 65 (or earlier with conditions)
- HPV: catch-up through age 26 (or 45 with shared decision-making)
- Hepatitis A and B: per risk factors
- Tetanus: any wound after 5+ years since last Tdap → flag

**Output:** Markdown brief listing what's current, what's due now, what's due in next 60 days, and what's overdue.

## Steps

1. Read `vault/health/00_current/vaccinations.md`
2. Read user age and risk factors from `config.md`
3. Apply CDC schedule rules
4. Categorize each vaccine: `current`, `due now`, `due in 60d`, `overdue`
5. Write `vault/health/02_briefs/YYYY-vaccination-review.md`
6. Surface `due now` and `overdue` to open-loops

## Configuration

`vault/health/config.md`:
- `date_of_birth` (used for age-based rules; redacted before any brief leaves the vault)
- `vaccine_risk_factors` (e.g., immunocompromised, healthcare worker, traveler)

## Vault Paths

- Reads: `vault/health/00_current/vaccinations.md`, `config.md`
- Writes: `vault/health/02_briefs/YYYY-vaccination-review.md`
- Updates: `vault/health/open-loops.md`
