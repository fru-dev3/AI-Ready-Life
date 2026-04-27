---
type: flow
trigger: called-by-op
description: >
  Iterates the user's configured carriers, calls `app-insurance-portal.portal` to log in
  and download the latest declarations PDF for each policy, then routes each PDF through
  `task-extract-policy-terms` to produce a normalized policy record. Handles the
  common case where some policies are portal-fetchable and others must be manually
  uploaded — manual uploads are first-class, not a fallback.
---

# insurance-sync-policy-docs

**Trigger:** Called by `op-coverage-audit`, `op-renewal-watch`, `op-monthly-sync`, or on-demand ("sync my policy docs").

## What It Does

Brings vault policy records up to date by pulling the latest declarations page for every carrier the user has configured. Two paths, run in sequence per policy:

1. **Portal-fetch path:** For carriers with a working `app-insurance-portal.portal` recipe (most major US carriers — Progressive, GEICO, State Farm, Allstate, Nationwide, Liberty Mutual, Travelers, USAA, plus landlord/rental specialists), the flow logs in via cookie session, navigates to the documents area, and downloads the most recent declarations PDF into `vault/insurance/00_current/inbox/`.
2. **Manual-upload path:** For carriers without a portal recipe, smaller mutuals, supplemental policies, or anything MFA-locked, the flow surfaces a checklist of "policies expected, no fresh PDF found in last 12 months" and prompts the user to drop PDFs into `vault/insurance/00_current/inbox/`.

Either path lands a PDF in the inbox. The flow then calls `task-extract-policy-terms` for every PDF in the inbox, normalizes the record, and moves the source PDF to `vault/insurance/00_current/policies/source/`.

## Steps

1. Read configured carriers and policy types from `vault/insurance/config.md`.
2. For each carrier with a portal recipe: invoke `app-insurance-portal.portal` to download the most recent declarations PDF.
3. For each carrier without a recipe: emit a manual-upload reminder line.
4. Process every PDF in `vault/insurance/00_current/inbox/` through `task-extract-policy-terms`.
5. Move processed PDFs to `vault/insurance/00_current/policies/source/`.
6. Return a sync summary: policies refreshed, policies pending manual upload, errors.
7. Surface stale records (>12 months without a fresh PDF) via `task-update-open-loops`.

## Configuration

`vault/insurance/config.md`:
- `carriers` — list with carrier name, policy type, and `portal_supported: true|false`
- `manual_upload_only_carriers` — explicit list of carriers the user knows must be manual

## Error Handling

- **Portal login fails or MFA required:** Skip that carrier; emit manual-upload reminder.
- **Inbox PDF unreadable:** Hand off to `task-extract-policy-terms` error path.

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/insurance/config.md`, `~/Documents/aireadylife/vault/insurance/00_current/inbox/`
- Writes: `~/Documents/aireadylife/vault/insurance/00_current/policies/`, `~/Documents/aireadylife/vault/insurance/00_current/policies/source/`
