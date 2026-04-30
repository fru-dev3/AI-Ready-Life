---
type: task
trigger: user-or-flow
description: >
  Maintains a structured family medical history covering first-degree relatives (parents,
  siblings, children) and known second-degree conditions (grandparents, aunts, uncles).
  Captures heart disease, diabetes, cancer types, mental health conditions, autoimmune
  disease, and any genetic/hereditary conditions. Drives risk-aware preventive-care
  decisions and informs lab interpretation by other skills.
---

# health-update-family-medical-history

**Trigger:**
- User input: "add to family history", "update family medical history", "log my dad's diagnosis"
- Called by: `op-preventive-care-review` (annual), `op-vaccination-tracking` (informs risk-factor adjustments)

## What It Does

Family history is one of the strongest non-genetic predictors of risk. It shifts which preventive screenings are appropriate, when they should start, and how lab values should be interpreted.

**File: `vault/health/00_current/family-history.md`**

**Per relative:**
- Relationship (mother, father, sister, brother, son, daughter, maternal grandmother, paternal uncle, etc.)
- Living / deceased + age at death + cause of death (if applicable)
- Conditions, each with age at diagnosis if known:
  - Cardiovascular: heart disease, MI, stroke, hypertension, high cholesterol
  - Metabolic: type 1 diabetes, type 2 diabetes
  - Cancer: type + organ + age at diagnosis (e.g., colon at 45, breast at 60)
  - Mental health: depression, bipolar, schizophrenia, OCD, anxiety, suicide
  - Autoimmune: lupus, RA, MS, Crohn's, ulcerative colitis, type 1 diabetes
  - Neurologic: Alzheimer's, Parkinson's, ALS, epilepsy, dementia
  - Genetic/hereditary: BRCA, Lynch syndrome, hemophilia, sickle cell, cystic fibrosis, Huntington's, etc.

**Risk-relevant patterns surfaced to other skills:**
- First-degree relative with colon cancer before 50 → colonoscopy starts 10y before that age (or 40, whichever earlier)
- Two first-degree relatives with breast/ovarian cancer → BRCA discussion flag
- First-degree relative with MI before 55 (men) / 65 (women) → cholesterol/cardiac risk elevated
- First-degree relative with type 2 diabetes → A1c monitoring cadence increases
- First-degree relative with completed suicide → mental-health screening cadence increases

## Steps

1. Receive input (relative + condition + age at diagnosis)
2. Validate condition vocabulary (map free text to standard category)
3. Append to `family-history.md`
4. Recompute risk-relevant patterns; write summary to top of file
5. If a new pattern triggers a screening shift, surface to open-loops for next preventive-care review to consume

## Configuration

`vault/health/config.md`:
- `family_history_review_cadence_months` (default 12 — annual refresh prompt)
- `family_history_first_degree_only` (default no — include known second-degree)

## Vault Paths

- Reads/writes: `vault/health/00_current/family-history.md`
- Updates via task: `vault/health/open-loops.md`
