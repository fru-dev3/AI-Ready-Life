---
name: aireadylife-chief-op-review-brief
type: op
cadence: daily
description: >
  Daily morning executive brief. Polls all installed plugin vaults, synthesizes domain alerts,
  surfaces urgent items, and delivers a prioritized daily brief.
  Triggers: "morning brief", "daily brief", "what's on my plate today", "life summary".
---

# aireadylife-chief-review-brief

**Cadence:** Daily (morning)
**Produces:** Executive AM brief written to ~/Documents/AIReadyLife/vault/chief/01_briefs/daily-YYYY-MM-DD.md

## What It Does

Review brief is the standard entry point for the daily brief. It is functionally identical to `aireadylife-chief-op-daily-brief` and produces the same output — it exists as a named alias so users can invoke it by natural language phrases like "review brief" or "life summary" in addition to "daily brief."

It polls all installed plugin vaults, synthesizes domain alerts by urgency tier (🔴/🟡/🟢), selects the top 3 actions for today, assembles the domain alert table, incorporates calendar data if the calendar plugin is installed, and delivers the full brief in the standard four-section format: ACTION TODAY → Domain Alerts → Calendar Today → Open Loops.

For full documentation on logic, steps, and output format, see `aireadylife-chief-op-daily-brief`.

## Triggers

- "morning brief"
- "daily brief"
- "what's on my plate today"
- "life summary"
- "review brief"
- "what needs my attention"
- "life check-in"

## Steps

1. Verify vault/chief/config.md exists; if missing, stop and prompt setup
2. Delegate to `aireadylife-chief-op-daily-brief` full execution flow
3. Write brief to vault/chief/01_briefs/daily-YYYY-MM-DD.md
4. Return formatted brief to user

## Input

- ~/Documents/AIReadyLife/vault/*/open-loops.md
- ~/Documents/AIReadyLife/vault/*/state.md
- ~/Documents/AIReadyLife/vault/calendar/ (if installed)
- ~/Documents/AIReadyLife/vault/chief/config.md

## Output Format

Same as `aireadylife-chief-op-daily-brief`:
```
# Daily Brief — [Day, Month DD YYYY]

## ACTION TODAY
1. 🔴 [Domain]: [Specific action]
2. 🔴/🟡 [Domain]: [Specific action]
3. 🟡 [Domain]: [Specific action]

## Domain Alerts
| Domain | Last Run | 🔴 | 🟡 | 🟢 | Top Flag |

## Calendar Today
[events or "Calendar plugin not installed"]

## Open Loops
[grouped by domain, sorted by priority]
```

## Configuration

- vault/chief/config.md must exist with at least one installed plugin discovered

## Error Handling

- Same as `aireadylife-chief-op-daily-brief` — all error handling delegates to that skill

## Vault Paths

- Reads from: ~/Documents/AIReadyLife/vault/*/open-loops.md, ~/Documents/AIReadyLife/vault/*/state.md, ~/Documents/AIReadyLife/vault/calendar/
- Writes to: ~/Documents/AIReadyLife/vault/chief/01_briefs/daily-YYYY-MM-DD.md
