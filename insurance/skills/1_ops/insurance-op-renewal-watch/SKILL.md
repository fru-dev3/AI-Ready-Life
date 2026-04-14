---
name: arlive-insurance-op-renewal-watch
type: op
cadence: monthly
description: >
  Monthly renewal watch. Flags any insurance policy renewing within 60 days with recommended
  action steps — review, shop, or auto-renew.
  Triggers: "insurance renewals", "policy renewals", "renewal check", "insurance due".
---

# arlive-insurance-renewal-watch

**Cadence:** Monthly (1st of month)
**Produces:** Renewal alert list — policies renewing within 60 days with action steps

## What it does

Scans all policy renewal dates and flags anything renewing within 60 days. For each flagged policy, generates recommended action steps: whether to shop for better rates (auto, renters), auto-renew without changes (life term), or schedule a coverage review (umbrella, disability). Includes current premium and any market context for shopping.

## Configuration

Uses renewal dates from `vault/insurance/`. In demo mode, reads from `vault-demo/insurance/state.md`.

## Calls

- **Flows:** `arlive-insurance-check-renewal-dates`, `arlive-insurance-generate-renewal-actions`

## Vault Output

`vault/insurance/00_current/renewal-alerts.md`
