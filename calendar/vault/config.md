# Calendar Vault Config

Fill in the fields below before running your first calendar skill.

---

## Identity
name:
timezone:               # e.g. America/Chicago

---

## Calendars
# List every calendar you want skills to read/write. 1–N entries; mix any roles.
# role: one of personal | work | family | shared | secondary
calendars:
  - id:                 # e.g. you@gmail.com
    label:              # e.g. Personal
    role: personal
  - id:
    label:
    role: work
  # add more as needed (family, shared team, secondary personal, etc.)

default_calendar_id:    # calendar id used when a skill doesn't specify

---

## Work Schedule
work_days:              # e.g. Mon-Fri
work_hours_start:       # e.g. 09:00
work_hours_end:         # e.g. 17:00
focus_time_target_hrs:  # ideal deep work hours per day e.g. 4

---

## Recurring Commitments
standing_meetings:      # e.g. Mon 10am team standup
commitments:            # e.g. school pickup 3:30pm daily

---

## Protected Blocks (used by flow-protect-recurring-blocks)
# Each block: type, label, days, start, end, rrule
recurring_blocks: []
protect_blocks_calendar:        # which calendar receives protected blocks
protected_block_types: [deep-work, family, workout]

---

## Time Allocation Targets (used by op-time-allocation-review + quarterly rebalance)
time_buckets: [deep-work, meetings, health, family, admin, learning, rest]
time_allocation_targets: {}     # bucket -> hours/week
time_review_variance_threshold_pct: 25

---

## Holidays + Observances (used by op-holiday-observance-sync)
observances: [us_federal]       # add: christian, jewish, muslim, hindu, buddhist, custom
custom_observances: []
holidays_calendar:
holidays_protect: true

---

## Birthdays (used by task-import-birthdays-from-social)
birthdays_calendar:
birthday_reminder_lead_days: [7]
social_roster_path: ~/Documents/aireadylife/vault/social/00_current/contacts.md

---

## PTO / OOO (used by task-track-pto-ooo; leave blank if contractor / self-employed)
pto_accrual_rate_days_per_period:
pto_period:                     # e.g. monthly
pto_carryover_cap:
pto_event_title_patterns: OOO|PTO|Vacation|Sick

---

## Travel Buffers (used by task-add-travel-buffer + task-block-after-travel-recovery)
airport_arrival_domestic_minutes: 120
airport_arrival_international_minutes: 180
jetlag_threshold_hours: 3
jetlag_min_trip_days: 4
default_drive_time_minutes: 30
recovery_calendar:

---

## Conflict Scan (used by op-conflict-scan)
conflict_scan_horizon_days: 14

---

## Recurring-Event Audit (used by op-recurring-event-audit)
audit_attendance_threshold_pct: 50
audit_modification_threshold_pct: 30
audit_age_threshold_days: 365

---

## Decline Templates (used by task-decline-template)
decline_voice: warm-direct
meeting_acceptance_rules:       # windows when meetings are OK

---

## Energy-Aware Scheduling (v2; used by flow-energy-aware-scheduling)
chronotype:                     # morning | early-afternoon | late-afternoon | evening | flexible

---

## Approval Policy (used by task-create-confirmed-event)
auto_approve_types: []          # leave empty for paragon-correct explicit approval
