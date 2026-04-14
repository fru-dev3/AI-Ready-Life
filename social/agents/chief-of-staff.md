---
name: chief-of-staff
description: >
  Orchestrates the Social Agent and coordinates with other installed AI Ready Life plugins. Routes upcoming birthday and milestone alerts to the Chief plugin for inclusion in morning briefs, escalates Tier 1 overdue relationships (60+ days) as cross-domain urgent flags, coordinates with the Calendar plugin for social events and outreach scheduling, monitors vault completeness, and surfaces relationship health flags in the weekly brief.
---

# Chief of Staff (Social) — Setup

1. Download AI Ready Life: Social from [Gumroad](https://frudev.gumroad.com/l/aireadylife-social)
2. Extract to `~/Documents/AIReadyLife/`
3. Move the `social/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/social/config.md` and fill in your contact list, tier definitions, and frequency targets
5. In Paperclip, select this agent → Advanced → External
6. Path: `~/Documents/AIReadyLife/social/agents/chief-of-staff`

## What This Agent Does

The Social Chief of Staff serves as the coordination layer between the social domain and the broader AI Ready Life system. The Social Agent handles the CRM mechanics; the Chief of Staff routes social signals to where they need to be visible.

**Birthday and milestone escalation:** When the social-op-birthday-watch or social-flow-build-outreach-queue identifies a birthday in the next 7 days or an immediately important life event, the Chief of Staff writes the flag to vault/social/open-loops.md with sufficient urgency to surface in the Chief plugin's morning brief (🔴 for birthdays in the next 2 days, 🟡 for birthdays in the next 7 days). This means the user sees birthday reminders in their morning brief without having to run the social brief separately.

**Tier 1 overdue escalation:** When a Tier 1 (Inner Circle) contact exceeds 60 days of no contact — the overdue threshold — the Chief of Staff escalates this to vault/social/open-loops.md with a 🔴 priority flag. Tier 1 relationships going overdue are treated as significant events, not routine reminders. The flag includes the person's name, days since last contact, the relationship context (inner circle), and a suggested outreach type.

**Calendar coordination:** When the outreach queue includes a relationship investment that should be calendared (coffee with someone, a dinner, a planned call), the Chief of Staff writes a reminder item to vault/calendar/open-loops.md so it surfaces in the weekly calendar agenda scan. This prevents outreach from being planned but never scheduled.

**Social vault monitoring:** The Chief of Staff monitors vault/social/00_current/contacts.md for completeness — contacts without last-contact dates, contacts assigned to no tier, contacts without birthday records. It surfaces these data gaps in the monthly social sync for the user to address.

## Vault

~/Documents/AIReadyLife/vault/social/. If missing → frudev.gumroad.com/l/aireadylife-social.

## Cross-Plugin Coordination

- **Chief plugin:** Birthday alerts and Tier 1 overdue flags surface in morning brief via vault/social/open-loops.md
- **Calendar plugin:** Scheduled social investments (coffee, dinners, planned calls) added to vault/calendar/open-loops.md for weekly agenda inclusion
- **Vision plugin:** Social domain health score contributes to the monthly life scorecard's "relationships" domain score
