---
type: op
trigger: user-facing
cadence: on-demand (typically driven by `op-renewal-watch` shop-categorized renewals)
description: >
  Triggered when `op-renewal-watch` flags a property or auto policy as "shop", or when
  the user asks to shop coverage. Compiles current coverage parameters into a single
  apples-to-apples quote sheet, then walks the user through gathering quotes from 3-4
  carriers. PolicyGenius covers life/disability/umbrella only — auto and property
  shopping requires direct carrier contact, so this op is the structured equivalent.
---

# insurance-shop-property-and-auto

**Trigger phrases:**
- "shop my auto insurance"
- "shop my home insurance"
- "compare auto quotes"
- "find a better rate on home"

**Cadence:** Triggered by renewal watch or on-demand. Recommended every 2-3 years per policy at minimum.

## What It Does

Auto and property insurance has 30-50% premium variance between carriers for identical coverage. New-customer pricing is almost always better than renewal pricing. The friction is gathering apples-to-apples quotes — same limits, same deductibles, same endorsements. This op removes that friction.

**What it produces:**
- A quote sheet (one row per carrier) with the user's exact current coverage parameters: liability limits, collision/comprehensive deductibles, dwelling coverage, personal property coverage, deductible, endorsements, named insureds.
- A list of 3-5 carriers to quote, drawn from a configurable carrier pool (auto: e.g. Progressive, GEICO, State Farm, Allstate, USAA, Liberty Mutual, Nationwide; property: same set plus regional mutuals).
- Step-by-step quote-gathering script: which carrier site to visit, what info to have ready, what to record.
- Decision framework: when a quote >10% lower than current is found, what to verify before switching (financial strength rating, claims-handling reputation, coverage-match check).

## Steps

1. Identify the policy line(s) being shopped (auto, home, renters, landlord).
2. Read the current policy record from `vault/insurance/00_current/policies/`.
3. Compile the quote sheet template at `vault/insurance/02_briefs/quote-shop-{policy-line}-{YYYY-MM}/quote-sheet.md`.
4. Pull the configured carrier list for that policy line from `vault/insurance/config.md`.
5. Generate per-carrier quote-gathering instructions (URL, expected fields, what to bring).
6. Optionally call `app-insurance-portal.portal` to retrieve any prior quote saved in a carrier portal.
7. As the user enters each carrier's quote, append to the quote sheet.
8. After ≥3 quotes collected: produce comparison summary (premium, coverage match, recommended action).
9. Call `task-update-open-loops` to record the shopping cycle and any switch decision.

## Configuration

`vault/insurance/config.md`:
- `auto_carriers_to_quote` — list (default: 4-5 major carriers in the user's state)
- `property_carriers_to_quote` — list
- `current_carriers_to_exclude` — to avoid quoting yourself

## Scope Notes

- **Renters:** This op runs for renters policies. Skips dwelling-coverage fields and property-replacement-cost steps.
- **Auto-only or property-only households:** This op runs per policy line; if the user has only one, only one is shopped.

## Error Handling

- **Coverage parameters missing in policy record:** Prompt user to run `flow-sync-policy-docs` first.
- **<3 carriers configured:** Use defaults; warn that quote depth is limited.

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/insurance/00_current/policies/`, `~/Documents/aireadylife/vault/insurance/config.md`
- Writes: `~/Documents/aireadylife/vault/insurance/02_briefs/quote-shop-{policy-line}-{YYYY-MM}/`
