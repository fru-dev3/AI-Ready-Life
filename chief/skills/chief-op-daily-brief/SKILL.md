---
name: chief-op-daily-brief
type: op
cadence: daily
description: >
  Generates today's prioritized brief: top 3 actions, domain alerts, calendar items, and open
  loops across all installed plugins. Triggers: "morning brief", "daily brief", "what's today",
  "chief brief", "what do I need to do today".
---

# chief-daily-brief

**Cadence:** Daily (morning)
**Produces:** Prioritized daily brief written to ~/Documents/aireadylife/vault/chief/02_briefs/daily-YYYY-MM-DD.md

## What It Does

The daily brief is your life operating system's most important output — a single document that tells you exactly what matters today across every domain you're managing. It runs every morning before anything else competes for attention.

The skill calls `chief-flow-collect-domain-alerts` first, which auto-discovers every installed plugin by scanning ~/Documents/aireadylife/vault/ for subdirectories containing an open-loops.md file. No manual configuration is needed — if a domain vault exists with an open-loops.md, it's included. Each domain's open loops are parsed: every unresolved item (unchecked checkbox) is extracted with its priority marker (🔴/🟡/🟢), description, action required, due date (if present), and date raised.

Next, it calls `chief-task-pull-domain-status` for each discovered domain to read that plugin's state.md. This provides: the date the domain was last reviewed, any domain-level score or health indicator (net worth trend in wealth, wellness score in health, filing status in tax), and a confirmation that the plugin is active and current. Domains not updated in 30+ days are marked stale (🟡 in the alert table regardless of their open-loop count).

All collected signals are passed to `chief-flow-build-daily-brief`, which applies the urgency ranking algorithm and assembles the final document. The ranking logic: items with today's due date or overdue date → items marked 🔴 → items marked 🟡 with due dates in the next 7 days → items marked 🟡 without due dates → items marked 🟢. The Top 3 ACTION TODAY items are selected from the top of this ranked list. If fewer than 3 items are 🔴, the remaining Top 3 slots are filled with the highest-priority 🟡 items.

The calendar section reads from ~/Documents/aireadylife/vault/calendar/00_current/ and ~/Documents/aireadylife/vault/calendar/00_current/ if the calendar plugin is installed, pulling any events or deadlines due today or within the next 24 hours. If the calendar plugin is not installed, this section displays "Calendar plugin not installed."

Every 🔴 item found during the brief run triggers `chief-task-flag-urgent-item`, which writes a persistent alert record to vault/chief/00_current/ for cross-run tracking. This ensures that if a 🔴 item is not resolved, it will keep surfacing in every subsequent brief without relying on the source domain's open-loops.md alone.

The completed brief is written as a dated markdown file to vault/chief/02_briefs/daily-YYYY-MM-DD.md. If Notion credentials are configured in vault/chief/config.md, the brief is also pushed to the configured Notion page via the notion skill.

## Triggers

- "morning brief"
- "daily brief"
- "what's on my plate today"
- "chief brief"
- "what do I need to do today"
- "life update"
- "run my brief"

## Steps

1. Verify vault/chief/config.md exists; if missing, stop and prompt setup
2. Call `chief-flow-collect-domain-alerts` to scan all vault/*/open-loops.md files
3. Parse all unresolved items; extract priority, description, action, due date, date raised per item
4. Call `chief-task-pull-domain-status` for each discovered domain; collect last-updated, score, open-loop count
5. Mark any domain not updated in 30+ days as stale (🟡 regardless of open-loop state)
6. Read calendar items from vault/calendar/00_current/ and vault/calendar/00_current/ (if installed)
7. Apply urgency ranking: overdue → today's deadline → 🔴 → 🟡 with date → 🟡 no date → 🟢
8. Select Top 3 ACTION TODAY items from ranked list (fill from 🟡 if fewer than 3 are 🔴)
9. Pass all inputs to `chief-flow-build-daily-brief` for document assembly
10. Call `chief-task-flag-urgent-item` for every 🔴 item to write persistent alert record
11. Write completed brief to vault/chief/02_briefs/daily-YYYY-MM-DD.md
12. If Notion configured: push brief to Notion page via `notion` skill
13. Return formatted brief to user as chat output

## Input

- ~/Documents/aireadylife/vault/*/open-loops.md (all installed plugin vaults)
- ~/Documents/aireadylife/vault/*/state.md (per-domain status)
- ~/Documents/aireadylife/vault/calendar/00_current/ (if calendar plugin installed)
- ~/Documents/aireadylife/vault/calendar/00_current/ (if calendar plugin installed)
- `vault/chief/01_prior/` — prior period records for trend comparison
- ~/Documents/aireadylife/vault/chief/config.md (plugin list, Notion/GDrive credentials)

## Output Format

```
# Daily Brief — [Day, Month DD YYYY]

## ACTION TODAY
1. 🔴 [Domain]: [Specific action — e.g., "Make Q1 estimated tax payment — due today"]
2. 🔴/🟡 [Domain]: [Specific action]
3. 🟡 [Domain]: [Specific action]

## Domain Alerts
| Domain   | Last Run   | 🔴 | 🟡 | 🟢 | Top Flag                        |
|----------|------------|----|----|-----|---------------------------------|
| [name]   | YYYY-MM-DD | N  | N  | N  | [top flag description]          |
| ...

## Calendar Today
- HH:MM — [event name] — [location or meeting link]
- [or "No calendar items today" / "Calendar plugin not installed"]

## Open Loops
### [domain] ([N] items)
- 🔴 [item description] → [action required]
- 🟡 [item description] → [action required]
...
```

## Configuration

Required fields in vault/chief/config.md:
- `installed_plugins` — comma-separated list of installed plugin names (or leave blank for auto-discovery)
- `notion_api_key` — optional; enables Notion sync
- `notion_briefs_page_id` — optional; Notion page where briefs are appended
- `gdrive_briefs_folder_id` — optional; Google Drive folder for brief archiving

## Error Handling

- **vault/chief/config.md missing:** Stop. Display: "Chief vault not found. Purchase at frudev.gumroad.com/l/aireadylife-chief and complete setup."
- **No plugin vaults found:** Display: "No installed plugins detected. Install at least one AI Ready Life domain plugin and ensure its vault/ folder is present."
- **Plugin vault exists but open-loops.md missing:** Record domain as "no active flags" — don't error.
- **state.md missing for a domain:** Record as "not initialized" in the domain alert table — don't error.
- **Calendar plugin not installed:** Display "Calendar plugin not installed" in the calendar section rather than skipping the section silently.

## Vault Paths

- Reads from: `~/Documents/aireadylife/vault/chief/01_prior/` — prior period records
- Reads from: ~/Documents/aireadylife/vault/*/open-loops.md, ~/Documents/aireadylife/vault/*/state.md, ~/Documents/aireadylife/vault/calendar/00_current/, ~/Documents/aireadylife/vault/calendar/00_current/
- Writes to: ~/Documents/aireadylife/vault/chief/02_briefs/daily-YYYY-MM-DD.md, ~/Documents/aireadylife/vault/chief/00_current/YYYY-MM-DD-{domain}-{slug}.md
