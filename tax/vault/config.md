# Tax Vault Config

Fill in the fields below before running your first tax skill. **Optional sections** (self-employment, rental property, equity comp, entities, multistate) only need to be filled in if they apply to you.

---

## Identity
name:
filing_status:          # single | married_filing_jointly | married_filing_separately | head_of_household
state:                  # primary state of residence, e.g. CA
age:                    # drives catch-up contributions, RMDs, QCDs

---

## Income (W-2)
employer:
annual_salary:
bonus_ytd:
estimated_agi:          # ballpark for current year (drives deduction floors, Roth phaseout)

---

## Withholding
federal_withheld_ytd:   # from pay stubs
state_withheld_ytd:
w4_allowances:          # current W-4 setting

---

## Prior Year (required for safe-harbor calc)
prior_year_tax_liability:  # Form 1040 line 24
prior_year_agi:            # Form 1040 line 11

---

## Quarterly Estimates
q1_paid:                # amount paid, YYYY-MM-DD
q2_paid:
q3_paid:
q4_paid:
estimated_tax_method:   # safe_harbor | actual | annualized
eftps_enrolled:         # true | false (controls EFTPS warnings)

---

## Deductions
standard_or_itemized:   # standard | itemized
mortgage_interest_ytd:
charitable_intent_annual:  # ballpark intended giving (for bunching analysis)
hsa_contribution_ytd:
student_loan_interest_ytd:
home_office_method:     # simplified | actual | both — leave blank if not claiming
home_office_sqft:
home_total_sqft:
business_miles_ytd:

---

## Retirement / Benefits Accounts
accounts_401k:
accounts_ira_traditional:
accounts_ira_roth:
accounts_hsa:
accounts_fsa_health:
accounts_fsa_dca:
accounts_sep_ira:       # only if self-employed
accounts_solo_401k:     # only if self-employed
hdhp_coverage:          # true | false (required for HSA contributions)

---

## Self-Employment / Freelance (optional)
freelance_clients:      # list of clients expected to issue 1099-NEC
se_income_ytd:
qbi_eligible:           # true | false (Section 199A 20% QBI deduction)

---

## Equity Comp (optional — tech workers and others with employer equity)
equity_comp_active:     # true | false
marginal_federal_rate_estimate:
state_tax_rate_estimate:

---

## Rental Property (optional)
rental_properties:      # list with name, address, type, placed_in_service_date, cost_basis, land_value
real_estate_professional:  # true | false (removes passive-loss limitation)

---

## Multistate / Residency (optional — multistate workers, snowbirds, recent movers)
multistate:             # true to enable state-residency tracking
domicile_state:
prior_year_states:

---

## Tax Loss Harvesting (optional — investors with taxable accounts)
tax_loss_harvesting_enabled:  # true | false
tlh_loss_threshold:           # default $1,000
marginal_ordinary_rate:
marginal_cap_gains_rate:

---

## Entities (advanced/optional — LLCs, S-corps, partnerships)
entities:               # list with: name, type (single_member | partnership | s-corp | c-corp), state, formation_date, ein
extensions_filed:       # list of entity names where Form 4868 / 7004 was submitted

---

## Accountant
cpa_name:
cpa_firm:
cpa_email:
cpa_phone:
cpa_secure_portal:      # preferred delivery channel for packet
filing_deadline:        # e.g. 2026-04-15 or extension date
