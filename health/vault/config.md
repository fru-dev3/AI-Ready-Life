# Health Vault Config

Fill in the fields below. Leave a field blank if it doesn't apply. This file is read by every health skill — complete it before running your first report.

---

## Identity

name:
date_of_birth:          # YYYY-MM-DD
sex:                    # male | female
blood_type:             # A+ | A- | B+ | B- | AB+ | AB- | O+ | O-

---

## Primary Care

primary_care_provider:  # Dr. First Last
pcp_practice:
pcp_phone:
pcp_patient_portal:     # URL (e.g. mychart.example.com)

---

## Insurance

insurance_carrier:      # e.g. UnitedHealthcare, BlueCross, Aetna
insurance_plan:         # e.g. Choice Plus PPO
member_id:
group_number:
deductible_individual:  # e.g. 1500
deductible_family:      # e.g. 3000
oop_max_individual:     # e.g. 5000
oop_max_family:         # e.g. 10000
plan_year_start:        # MM-DD (e.g. 01-01 for calendar year, or your employer's start date)

---

## HSA

hsa_account:            # yes | no
hsa_provider:           # e.g. Fidelity, HealthEquity, Optum
hsa_contribution_ytd:   # e.g. 2000
hsa_balance:            # e.g. 4500
hsa_limit_individual:   # 2025 limit is 4300; update each year

---

## Wearable

wearable_type:          # oura | apple_health | both | none
wearable_export_path:   # leave blank to use default (vault/health/00_current/wearable/)
sleep_target_hours:     # default 7.5 — override if your target differs
step_target_daily:      # default 8000 — override if your target differs

---

## Medications

# One line per active medication
# Format: name | dose | frequency | pharmacy | next_refill_date
# Example: Lisinopril | 10mg | once daily | CVS Mail Order | 2026-06-01
medications:
  #

---

## Specialists

# One line per specialist you see regularly
# Format: specialty | Dr. Name | phone | portal_url
# Example: Cardiologist | Dr. Jane Smith | 612-555-0100 | mychart.allina.com
specialists:
  #

---

## Labs

last_lab_date:          # YYYY-MM-DD of most recent blood draw
lab_provider:           # e.g. Quest Diagnostics, LabCorp, hospital lab
lab_portal:             # URL where results appear

---

## Dental & Vision

dentist:
dentist_phone:
last_cleaning:          # YYYY-MM-DD
next_cleaning:          # YYYY-MM-DD

optometrist:
optometrist_phone:
last_eye_exam:          # YYYY-MM-DD
