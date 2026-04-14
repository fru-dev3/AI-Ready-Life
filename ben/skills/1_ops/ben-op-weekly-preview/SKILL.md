---
name: aireadylife-ben-op-weekly-preview
type: op
cadence: weekly
description: >
  Monday morning weekly preview covering this week's deadlines, cross-domain priorities, and
  recommended focus time. Triggers: "weekly preview", "weekly agenda", "what's this week",
  "monday brief".
---

# aireadylife-ben-weekly-preview

**Cadence:** Weekly (Monday morning)
**Produces:** Weekly agenda written to vault/ben/02_agenda/ with cross-domain deadlines, priorities, and focus time recommendations

## What it does

Runs every Monday to give the user a comprehensive view of the week ahead before the day starts.
Calls collect-domain-alerts to pull all active cross-domain open loops and identify which ones
have deadlines falling within the next 7 days. Calls build-weekly-agenda to compile a structured
week view: a deadline table (date, domain, item, priority), a cross-domain priorities section
highlighting the 3-5 most important things to accomplish this week regardless of strict deadlines,
and a focus time section that estimates the hours of deep work required and suggests which days
to block for it. If the calendar plugin is installed, reads vault/calendar/ to incorporate meeting
load into the focus time recommendations (busy meeting days get lighter task loads). Writes the
weekly agenda to vault/ben/02_agenda/ and calls check-open-loops to surface the total count of
unresolved items across all domains so the user has a full picture of backlog going into the week.

## Configuration

No special configuration required. Optionally maintain a "weekly priorities" note in
vault/ben/02_agenda/ if the user wants to set manual priorities that take precedence over
auto-generated ones.

## Calls

- **Flows:** `aireadylife-ben-build-weekly-agenda`, `aireadylife-ben-collect-domain-alerts`
- **Tasks:** `aireadylife-ben-check-open-loops`

## Apps

None

## Vault Output

`vault/ben/02_agenda/week-{date}.md`
