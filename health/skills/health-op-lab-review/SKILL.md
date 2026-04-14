---
name: aireadylife-health-op-lab-review
type: op
cadence: as-received
description: >
  Triggered when lab results arrive; downloads PDFs from the patient portal, flags
  out-of-range biomarker values, and builds a structured lab summary. Triggers:
  "lab results came in", "new lab report", "blood work is ready".
---

# aireadylife-health-lab-review

**Cadence:** As-received (triggered when new lab results are available)
**Produces:** Structured lab summary in vault/health/01_labs/, flagged open-loop items in vault/health/open-loops.md

## What it does

Runs whenever new lab results arrive from a patient portal or uploaded manually. It reads the incoming PDF or structured data, parses each biomarker value, and compares it against standard reference ranges. Any value outside the normal range is handed off to `aireadylife-health-flag-out-of-range-value` for logging — the flag records the biomarker name and severity but deliberately omits raw values to avoid storing PHI in plain text. The op then calls `aireadylife-health-build-lab-summary` to produce a consolidated panel view grouped by test category (metabolic, lipid, CBC, thyroid, etc.) with trend arrows vs. the prior panel.

## Calls

- **Flows:** `aireadylife-health-build-lab-summary`
- **Tasks:** `aireadylife-health-flag-out-of-range-value`, `aireadylife-health-update-open-loops`

## Apps

Patient portal (read), vault filesystem (write)

## Vault Output

`vault/health/01_labs/`
