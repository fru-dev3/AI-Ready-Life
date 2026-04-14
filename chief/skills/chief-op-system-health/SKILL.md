---
name: aireadylife-chief-op-system-health
type: op
cadence: weekly
description: >
  Weekly system health check. Verifies all installed plugin vaults are readable,
  agents are configured, and no domain has gone stale.
  Triggers: "system health", "check all agents", "life OS health".
---

# aireadylife-chief-system-health

**Cadence:** Weekly (Sunday)
**Produces:** System health report written to ~/Documents/AIReadyLife/vault/chief/03_system/health-YYYY-MM-DD.md

## What It Does

The system health check is the maintenance op for your entire AI Ready Life installation. It runs every Sunday to give you a complete picture of which plugins are active, current, and working correctly — before the week begins and any stale data can pollute a Monday brief.

The op discovers all installed plugins by scanning ~/Documents/AIReadyLife/vault/ for subdirectories that have either a config.md, an open-loops.md, or a state.md file. For each discovered plugin, it evaluates three health signals:

**Staleness:** Reads state.md (if present) and checks the last-updated date. Any domain not updated in 30+ days is marked stale. Stale domains get a 🟡 status — they're installed but not being actively maintained. Domains not updated in 60+ days get 🔴 status — degraded, likely abandoned or broken.

**Backlog Accumulation:** Reads open-loops.md and calculates the net change in open items over the past 4 weeks by comparing the current unresolved count against prior brief snapshots in vault/chief/01_briefs/. If a domain is accumulating items faster than it's resolving them over a 4-week window, it gets a 🟡 backlog flag. If it has 5+ unresolved items total and the count has grown every week for 3+ weeks, it gets a 🔴 accumulation flag.

**Critical Flag Persistence:** Reads vault/chief/01_alerts/ and checks whether any 🔴 alert for this domain has been unresolved for 7+ days. A 🔴 item that has been sitting for a week without action suggests either the item is stuck (blocked, needs more clarity) or it was never seen. These items get escalated explicitly in the health report with their age in days.

The health report also runs a configuration check: it verifies that vault/chief/config.md contains a valid plugin list or that auto-discovery found at least 2 active plugins. If only 1 plugin is installed, it notes this and recommends installing additional plugins to get full cross-domain brief value.

## Triggers

- "system health"
- "check all agents"
- "life OS health"
- "plugin health"
- "vault status"
- "what's working"

## Steps

1. Scan ~/Documents/AIReadyLife/vault/ for all plugin subdirectories
2. For each discovered plugin: read state.md → check last-updated date → assign staleness status
3. For each discovered plugin: read open-loops.md → count unresolved items → compare to prior 4 weeks from brief archive
4. Assign backlog accumulation status: growing = 🟡, sustained growth 3+ weeks = 🔴
5. Read vault/chief/01_alerts/ for any 🔴 alerts older than 7 days → list with domain and age in days
6. Check vault/chief/config.md for valid configuration
7. Assign overall domain health status: healthy (all green), stale (last-updated 30-60 days), degraded (60+ days or sustained backlog growth)
8. Compile per-domain health table with all three signals
9. Generate plain-language recommendations for any domain with 🟡 or 🔴 status
10. Write health report to vault/chief/03_system/health-YYYY-MM-DD.md
11. If any domain is 🔴 status: surface in next morning brief as a top-level flag

## Input

- ~/Documents/AIReadyLife/vault/ (directory scan for all plugin subdirectories)
- ~/Documents/AIReadyLife/vault/*/state.md
- ~/Documents/AIReadyLife/vault/*/open-loops.md
- ~/Documents/AIReadyLife/vault/chief/01_alerts/ (persistent 🔴 item tracker)
- ~/Documents/AIReadyLife/vault/chief/01_briefs/ (prior brief archive for trend comparison)
- ~/Documents/AIReadyLife/vault/chief/config.md

## Output Format

```
# System Health Report — YYYY-MM-DD

## Plugin Status
| Plugin   | Last Updated | Staleness | Backlog Trend | Persistent 🔴 | Status    |
|----------|--------------|-----------|---------------|----------------|-----------|
| [name]   | YYYY-MM-DD   | 12 days   | Stable (N→N)  | None           | ✅ Healthy |
| [name]   | YYYY-MM-DD   | 35 days   | Growing (N↑)  | 1 (8 days old) | ⚠️ Stale   |
| [name]   | YYYY-MM-DD   | 72 days   | Growing (N↑)  | 2 (14+ days)   | 🔴 Degraded|

## Persistent Urgent Items (7+ days unresolved)
| Domain  | Item                        | Days Open | Recommended Action          |
|---------|-----------------------------|-----------|-----------------------------|
| [name]  | [item description]          | N days    | [specific action]           |

## Configuration Check
- Installed plugins detected: N
- config.md: [valid / missing fields: ...]
- Auto-discovery: [N plugins found]

## Recommendations
- [domain]: Run [specific skill name] to refresh vault and clear staleness
- [domain]: [N] 🔴 items unresolved — review and either action or explicitly close
```

## Configuration

Required fields in vault/chief/config.md:
- `installed_plugins` — used for config verification; auto-discovery used if blank
- Optional: any Notion/GDrive credentials used by brief-archiving skills

## Error Handling

- **Vault directory entirely missing:** Stop. "Chief vault not found at ~/Documents/AIReadyLife/vault/chief/. Purchase at frudev.gumroad.com/l/aireadylife-chief."
- **Only 1 plugin installed:** Produce the report but include a note: "Only 1 plugin detected. Chief delivers more value with 3+ plugins installed across different life domains."
- **No prior briefs in vault/chief/01_briefs/:** Skip the backlog trend calculation; display "Insufficient history — trend available after 4 weekly brief cycles."
- **state.md missing for a domain:** Record last-updated as "Unknown" and apply 🟡 staleness flag conservatively.

## Vault Paths

- Reads from: ~/Documents/AIReadyLife/vault/ (all), ~/Documents/AIReadyLife/vault/*/state.md, ~/Documents/AIReadyLife/vault/*/open-loops.md, ~/Documents/AIReadyLife/vault/chief/01_alerts/, ~/Documents/AIReadyLife/vault/chief/01_briefs/
- Writes to: ~/Documents/AIReadyLife/vault/chief/03_system/health-YYYY-MM-DD.md
