---
type: flow
trigger: called-by-op
scope: advanced/optional
description: >
  ADVANCED / OPTIONAL — for landlords. Builds the Schedule E aggregator across one
  or more rental properties: rental income, deductible expenses (mortgage interest,
  property tax, insurance, repairs, management fees, HOA, utilities), depreciation
  (27.5-year straight-line for residential), and passive-loss carryforward tracking
  (current-year passive losses are limited; excess carries forward until disposition
  or passive income offsets it). Distinguishes repair (deductible now) from
  improvement (capitalized and depreciated).
---

# flow-rental-property-summary

**Scope:** Advanced / optional. Skip if no rental properties in `vault/tax/config.md`.

**Trigger:**
- Called by: `op-cpa-packet`, `op-year-end-planning-sweep`, `op-deduction-review`
- User input: "rental property tax summary", "Schedule E", "rental income summary"

**Produces:** `vault/tax/00_current/YYYY/schedule-e-summary.md` with one section per property and an aggregated total.

## What It Does

Aggregates per-property income, deductions, and depreciation into a Schedule E-ready summary. Cross-domain with the estate plugin if installed (which holds property-level data).

**Per-property fields:**
- Property name / address (last 4 of address line OK for privacy)
- Type (residential / commercial / mixed)
- Date placed in service (drives depreciation start)
- Cost basis (purchase price + capitalized improvements − land value; only the building depreciates)
- Depreciable basis (cost basis − land value)
- **Income:** gross rent received YTD, security deposits forfeited, other (parking, late fees, services rendered in lieu of rent)
- **Deductible expenses:**
  - Mortgage interest (from 1098 or lender statement)
  - Property tax
  - Insurance
  - Repairs (kept in working condition — fixing leak, repainting; deductible now)
  - Maintenance (HOA, lawn, snow, routine cleaning)
  - Management fees and commissions
  - Utilities (if landlord-paid)
  - Travel to property (if not local; mileage at business rate)
  - Professional fees (legal, accounting allocable to rental)
  - Advertising and marketing
- **Improvements (capitalized, NOT expensed):** new roof, HVAC replacement, kitchen remodel, structural additions — added to basis and depreciated over 27.5 years (residential) or 39 years (commercial)
- **Depreciation:** depreciable basis ÷ 27.5 (or 39) for full-year owned; pro-rated mid-month convention for placed-in-service year and disposition year

**Passive loss rules (IRC §469).**
- Rental activity is passive by default; passive losses can only offset passive income
- Active-participation exception: up to $25,000 passive loss can offset active income if AGI ≤$100,000; phased out fully above $150,000
- Real-estate-professional status (≥750 hours and >50% of personal services in real estate) removes the passive limitation entirely
- Excess passive losses carry forward indefinitely; released in full upon disposition of the property
- Track per-property carryforward in `passive-loss-carryforward.md`

**Repair vs improvement classification (Reg §1.263(a)-3).**
- Repair: keeps property in ordinarily efficient operating condition — patch, fix, replace small components
- Improvement: betterment, restoration, or adaptation — full system replacement, capacity increase, new structural element
- De minimis safe harbor: items <$2,500 per invoice can be expensed even if technically improvements
- Routine maintenance safe harbor: recurring activities expected more than once in a 10-year period can be expensed

## Steps

1. Read property list from `vault/tax/config.md` or cross-domain `vault/estate/00_current/`
2. For each property, read income/expense records from `vault/tax/00_current/YYYY/rental-{property-name}/` or estate plugin equivalents
3. Compute depreciation using cost basis, placed-in-service date, and current year (27.5 / 39-year SL)
4. Classify each capital expenditure as repair or improvement using safe-harbor rules
5. Aggregate per-property: net income/loss = rent received − expenses − depreciation
6. Apply passive-loss rules; update carryforward if loss not deductible this year
7. Build aggregated Schedule E summary across all properties
8. Write to `vault/tax/00_current/YYYY/schedule-e-summary.md`
9. Flag any unclassified expenditures or missing 1098s for the property's mortgage

## Configuration

`vault/tax/config.md`:
- `rental_properties` (list with: name, address, type, placed_in_service_date, cost_basis, land_value)
- `real_estate_professional` (true/false; removes passive limitation)
- `active_participation_estimated_agi` (for $25k offset eligibility)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/tax/00_current/YYYY/rental-*/`, optionally `~/Documents/aireadylife/vault/estate/00_current/`
- Writes: `~/Documents/aireadylife/vault/tax/00_current/YYYY/schedule-e-summary.md`, `~/Documents/aireadylife/vault/tax/00_current/YYYY/passive-loss-carryforward.md`
