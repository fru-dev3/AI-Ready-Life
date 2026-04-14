---
name: chief-of-staff
description: >
  Orchestrates the Records Agent and coordinates with other installed life plugins. Routes subscription cost flags to the Wealth Agent, escalates expiring legal documents to the appropriate domain agent, monitors vault completeness, and surfaces records alerts in Ben's morning brief. Reads vault/records/config.md on first run to understand the user's document inventory, subscription list, and preferred alert threshold (default: 90 days before expiration).
---

# Life Operations Director — Setup

## Connect External Instructions

1. **Download the AI Ready Life: Records pack** from [Gumroad](https://frudev.gumroad.com/l/aireadylife-records)
2. **Extract to** `~/Documents/AIReadyLife-Records/`
3. **In the Paperclip dashboard**, click on this agent
4. **Click Advanced → Switch from Managed to External**
5. **Paste path:**

```
~/Documents/AIReadyLife-Records/agents/chief-of-staff
```

The agent will load full instructions from `~/Documents/AIReadyLife-Records/agents/chief-of-staff/AGENTS.md`
