# Tax Vault Config

Fill in the fields below before running your first tax skill.

---

## Identity
name:
ssn_last4:              # last 4 digits only, for reference
filing_status:          # single | married_filing_jointly | married_filing_separately | head_of_household
state:                  # e.g. MN

---

## Income
employer:
w2_employer_ein:        # on your W-2 box b
annual_salary:
bonus_ytd:
freelance_ytd:
rental_income_ytd:
other_income_ytd:

---

## Withholding
federal_withheld_ytd:   # from pay stubs
state_withheld_ytd:
w4_allowances:          # current W-4 setting

---

## Quarterly Estimates
q1_paid:                # amount paid, YYYY-MM-DD
q2_paid:
q3_paid:
q4_paid:
estimated_tax_method:   # safe_harbor | actual | annualized

---

## Deductions
standard_or_itemized:   # standard | itemized
mortgage_interest_ytd:
charitable_ytd:
hsa_contribution_ytd:
student_loan_interest_ytd:
home_office_sqft:       # if applicable
business_miles_ytd:     # if applicable

---

## Entities
llc_name:               # if you have an LLC
llc_ein:
llc_state:
llc_type:               # single_member | partnership | s-corp

---

## Accountant
cpa_name:
cpa_firm:
cpa_email:
cpa_phone:
filing_deadline:        # e.g. 2026-04-15 or extension date
