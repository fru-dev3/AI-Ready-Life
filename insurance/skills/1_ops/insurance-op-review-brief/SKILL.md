---
name: arlive-insurance-op-review-brief
type: op
cadence: monthly
description: >
  Monthly insurance review brief. Compiles all policy premiums, renewal alerts, active claims,
  and gap analysis into a single briefing doc.
  Triggers: "insurance brief", "insurance review", "policy review", "coverage check".
---

# arlive-insurance-review-brief

**Cadence:** Monthly (1st of month)
**Produces:** Insurance brief — all policy premiums, renewal alerts, active claims, gap analysis

## What it does

Generates your monthly insurance brief. Reads from vault/insurance/ to compile: all active policies with premiums and next renewal dates, any policies renewing within 60 days (with recommended action steps), active claims and their status, total monthly and annual premium spend, and the top coverage gaps flagged by the gap analysis. Formats as a concise brief with ACTION ITEMS sorted by urgency.

## Configuration

Configure your vault at `vault/insurance/config.md` with all your policies. In demo mode, reads from `vault-demo/insurance/state.md`.

## Calls

- **Flows:** `arlive-insurance-build-review-brief`
- **Tasks:** `arlive-insurance-update-open-loops`

## Apps

`gdrive` (optional — for writing brief to Google Docs)

## Vault Output

`vault/insurance/03_briefs/YYYY-MM-insurance-brief.md`
