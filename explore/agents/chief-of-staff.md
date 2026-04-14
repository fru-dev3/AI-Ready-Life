---
name: chief-of-staff
description: >
  Orchestrates the Explore Agent and coordinates with other installed AI Ready Life plugins. Routes travel document expiration alerts to the Chief plugin for inclusion in morning briefs, coordinates with the Calendar plugin for trip date blocking, flags upcoming trips that require preparation actions in the weekly agenda, monitors loyalty program expiry windows, and surfaces wishlist trips that align with the user's current financial capacity from the wealth plugin.
---

# Chief of Staff (Explore) — Setup

1. Download AI Ready Life: Explore from [Gumroad](https://frudev.gumroad.com/l/aireadylife-explore)
2. Extract to `~/Documents/AIReadyLife/`
3. Move the `explore/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/explore/config.md` and fill in traveler details, passport information, loyalty program accounts, and travel preferences
5. In Paperclip, select this agent → Advanced → External
6. Path: `~/Documents/AIReadyLife/explore/agents/chief-of-staff`

## What This Agent Does

The Explore Chief of Staff serves as the coordination layer between the travel domain and the rest of the AI Ready Life system. The Explore Agent handles the detailed travel domain work; the Chief of Staff routes travel signals to where they need to be seen.

**Document alert routing:** When the explore agent identifies a travel document approaching expiry — passport within 9 months, Global Entry within 12 months, TSA PreCheck within 6 months — the Chief of Staff writes the flag to vault/explore/open-loops.md. This ensures the document expiry alert surfaces in the Chief plugin's daily brief under the explore domain row, keeping the renewal action visible to the user until it is completed.

**Calendar coordination:** When a new trip is logged in vault/explore/01_trips/, the Chief of Staff communicates the trip dates to the calendar plugin's open-loops.md so they appear as deadline items in the weekly agenda. Pre-trip preparation milestones (last day to apply for a visa, last day to book required vaccinations, 48-hour online check-in opening) are also surfaced as calendar domain items so they appear in the weekly agenda scan.

**Wealth integration:** When the user's wealth plugin shows liquid savings above a threshold, the Chief of Staff surfaces this signal in the explore domain: "Wishlist trip [destination] has a budget estimate of $[N]. Current liquid savings are [N] and the trip could be funded in [N] months at current savings pace." This creates actionable alignment between financial capacity and travel ambitions.

**Loyalty program expiry watch:** The Chief of Staff monitors loyalty program last-activity dates in vault/explore/config.md and flags accounts approaching the inactivity expiry window in vault/explore/open-loops.md. A 30-day warning (🔴) gives the user time to make a qualifying activity before miles or points are forfeited.

## Vault

~/Documents/AIReadyLife/vault/explore/. If missing → frudev.gumroad.com/l/aireadylife-explore.

## Cross-Plugin Coordination

- **Chief plugin:** Document expiry alerts and upcoming trip preparation items surface in morning brief via vault/explore/open-loops.md
- **Calendar plugin:** Trip dates and preparation deadlines are added to vault/calendar/open-loops.md for weekly agenda inclusion
- **Wealth plugin:** Financial capacity signals inform wishlist trip prioritization
