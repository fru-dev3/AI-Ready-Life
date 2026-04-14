---
name: arlive-benefits-task-flag-enrollment-window
type: task
cadence: annual
description: >
  Writes an enrollment deadline alert to vault/benefits/open-loops.md when the open enrollment
  window opens. Includes enrollment period dates, decisions needed, and plan comparison link.
---

# arlive-benefits-flag-enrollment-window

**Trigger:** Called by `arlive-benefits-enrollment-review` when enrollment window is detected
**Produces:** Enrollment deadline flag in vault/benefits/open-loops.md

## What it does

When called by the enrollment-review op, reads the open enrollment window dates from
vault/benefits/00_plans/ (or as provided by the calling op) and writes a 🔴 urgent flag to
vault/benefits/open-loops.md. The flag records the enrollment window start date, end date,
a plain-language list of decisions that need to be made (medical plan selection, HSA contribution
election, FSA election, dependent coverage changes), and a reference to where the plan comparison
output can be found in vault/benefits/04_briefs/. The flag remains in open-loops.md until it is
manually resolved or until the enrollment window has passed, at which point the update-open-loops
task clears it as resolved. Also appends a calendar reminder note so ben can surface the deadline
in the daily brief.

## Configuration

Enrollment window dates must be present in vault/benefits/00_plans/ or passed by the calling op.
The alert is a no-op if enrollment dates cannot be determined.

## Apps

None

## Vault Output

`vault/benefits/open-loops.md`
