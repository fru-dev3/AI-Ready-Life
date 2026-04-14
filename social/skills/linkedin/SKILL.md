---
name: linkedin
type: app
description: >
  Accesses LinkedIn connections list, profile activity, and messaging for
  relationship management and professional outreach. Used by social-agent for
  network review and reconnection queuing. Configure in vault/social/config.md.
---

# LinkedIn

**Auth:** Playwright + Chrome cookies
**URL:** https://www.linkedin.com
**Configuration:** Set your profile URL and Chrome profile path in `vault/social/config.md`

## Data Available

- Connections list (name, title, company, last interaction)
- Connection request history (sent, pending, accepted)
- Messaging thread history per connection
- Profile view notifications (who viewed your profile)
- Birthday and work anniversary notifications
- Mutual connections for new contacts

## Configuration

Add to `vault/social/config.md`:
```
linkedin_profile_url: https://www.linkedin.com/in/YOUR-HANDLE
linkedin_chrome_profile: /Users/YOU/Library/Application Support/Google/Chrome/Default
```

## Notes

- Requires headless=False to avoid bot detection
- Connections export: Settings → Data Privacy → Get a copy of your data → Connections CSV
- Rate-limit outreach messages: max 10–15 per day to avoid restrictions

## Used By

- `aireadylife-social-relationship-review` — audit dormant connections and flag relationships to re-engage
- `aireadylife-social-build-outreach-queue` — compile list of priority contacts for reconnection

## Vault Output

`vault/social/network/`
