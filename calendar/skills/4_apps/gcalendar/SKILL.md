---
name: gcalendar
type: app
description: >
  Reads and creates calendar events via the Google Calendar API. Used by
  calendar-agent for weekly agenda generation, deadline blocking, and event
  creation. Configure OAuth credentials in vault/calendar/config.md.
---

# Google Calendar

**Auth:** OAuth2 via Google Calendar API
**URL:** https://calendar.google.com
**Configuration:** Set your credentials and calendar IDs in `vault/calendar/config.md`

## Data Available

- Upcoming events in a date range (title, time, location, description)
- Event creation (single event, recurring)
- Event update and deletion
- Free/busy query for scheduling
- Multiple calendar support (personal, work, shared)
- Event reminders and notifications

## Configuration

Add to `vault/calendar/config.md`:
```
gcal_credentials: vault/calendar/keys/gcal-oauth.json
gcal_primary_calendar_id: YOUR_EMAIL@gmail.com
gcal_work_calendar_id: YOUR_WORK_EMAIL@company.com
```

## Key API

```
GET https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events?timeMin=...
POST https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events
Scopes: https://www.googleapis.com/auth/calendar
```

## Used By

- `aireadylife-calendar-weekly-agenda` — pull and format upcoming week's events
- `aireadylife-calendar-build-agenda` — create structured agenda with deadlines and priorities

## Vault Output

`vault/calendar/agendas/`
