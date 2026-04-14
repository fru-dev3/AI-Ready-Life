---
name: contacts
type: app
description: >
  Reads contact data (names, birthdays, notes) from iOS Contacts or Google
  Contacts for relationship tracking and birthday monitoring. Used by social-agent
  for birthday alerts and interaction logging. Configure in vault/social/config.md.
---

# Contacts

**Auth:** iOS Shortcuts export (device-local) or Google People API
**URL:** iOS Contacts app / contacts.google.com
**Configuration:** Set your sync method and paths in `vault/social/config.md`

## Data Available

- Contact names and relationship type (family, friend, colleague)
- Birthday dates (from contact birthday field)
- Last interaction date (if stored in contact notes field)
- Email addresses and phone numbers (for outreach)
- Custom labels and groups
- Google Contacts notes field (used for interaction tracking)

## Configuration

Add to `vault/social/config.md`:
```
contacts_sync_method: google_people_api
google_people_api_key: YOUR_API_KEY
contacts_export_path: vault/social/contacts/contacts-export.vcf
```

## Export Methods

1. **iOS Shortcuts:** Shortcut → Export Contacts → iCloud Drive → Mac sync (vCard format)
2. **Google People API:** `GET https://people.googleapis.com/v1/people/me/connections`
3. **Google Takeout:** contacts.google.com → Export → vCard

## Used By

- `aireadylife-social-birthday-watch` — scan for upcoming birthdays in the next 30 days
- `aireadylife-social-log-interaction` — update contact note with most recent interaction date

## Vault Output

`vault/social/contacts/`
