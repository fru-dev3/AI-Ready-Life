---
type: task
trigger: user-or-flow
description: >
  Writes a calendar event via the native Calendar connector for a planned outreach
  (coffee, call, meal, video chat) so social time becomes calendared rather than
  aspirational. Logs the planned commitment to the interaction log as "planned"
  status so reciprocity and outreach-goal tracking can see the intent.
---

# social-schedule-social-commitment

**Trigger:**
- User input: "schedule a call with X", "book coffee with Y", "put dinner with Z on the calendar"
- Called by: `flow-build-outreach-queue`, `op-family-relationships-review`, `op-local-community-review` (when surfacing recommended outreach)

## What It Does

Closes the gap between intention and action. The relationship-review skills can identify *who* the user should reach out to, but unless the outreach lands on the calendar it tends not to happen. This task takes a planned outreach (contact + medium + proposed date) and writes a real Calendar event so the time is reserved.

**Inputs:** contact name, medium (phone call / video / coffee / lunch / dinner / drop-by), proposed date or "find time in next 14 days," duration, optional location.

**What gets written:**
- Calendar event via native Calendar connector — title in the form `[Medium] with [Name]`, attendees include the contact's email if known, default duration per medium (call: 30 min, coffee: 60 min, lunch: 75 min, dinner: 120 min), location as provided.
- Interaction log entry with `status: planned` and the scheduled date so the contact's outreach plan is visible before the event happens.

If "find time in next N days" is requested, the task scans the user's calendar for open slots in the user's preferred social-time windows (configurable, default evenings + weekends) and proposes 2–3 options before writing.

## Steps

1. Validate contact exists in `contacts.md`; pull email + locality
2. Resolve date: explicit date OR find open slot via Calendar
3. Build event payload (title, attendees, duration, location)
4. Write event via native Calendar connector
5. Append `status: planned` entry to `01_interactions/{contact-slug}.md` with scheduled date
6. Return confirmation with event link/id

## Configuration

`vault/social/config.md`:
- `social_time_windows` — preferred days/hours for social commitments
- `default_durations_by_medium`
- `default_calendar_id` (which calendar to write to)

## Vault Paths

- Reads: `00_current/contacts.md`, native Calendar
- Writes: native Calendar, `01_interactions/{contact-slug}.md`
