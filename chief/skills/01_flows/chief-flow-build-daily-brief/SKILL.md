---
name: aireadylife-chief-flow-build-daily-brief
type: flow
trigger: called-by-op
description: >
  Assembles the daily brief from domain alerts, calendar items, and open loops into a prioritized
  ACTION TODAY format with Top 3 callout, domain alert table, and full open-loops list.
---

# aireadylife-chief-build-daily-brief

**Trigger:** Called by `aireadylife-chief-op-daily-brief`
**Produces:** Fully formatted daily brief document written to ~/Documents/AIReadyLife/vault/chief/02_briefs/daily-YYYY-MM-DD.md

## What It Does

This flow receives the pre-collected domain alerts and calendar items from the calling op and assembles the final brief document. It does not do its own data collection — it is a pure formatting and prioritization engine that takes inputs and produces a structured output.

**Prioritization algorithm:** The flow applies a five-level urgency ranking to all items. Level 1 (highest): items that are overdue (past their due date). Level 2: items due today. Level 3: items marked 🔴 with no due date or a future due date. Level 4: items marked 🟡 with a due date in the next 7 days. Level 5: items marked 🟡 with no near-term due date. Items marked 🟢 are not eligible for the Top 3 selection — they appear only in the open loops list at the bottom of the brief.

**Top 3 ACTION TODAY selection:** The flow selects the top 3 items from the ranked list. If fewer than 3 items are Level 1-3 (🔴 or overdue), the remaining slots are filled from the top of Level 4 (🟡 with near-term due dates). Each Top 3 item is formatted as: priority emoji + domain name + specific action in plain language (not a raw task description — if the task description is vague, the flow synthesizes a clear action statement). The Top 3 section is the first thing the user sees and must contain no ambiguity about what to do.

**Domain alert table:** One row per installed plugin, regardless of whether it has active flags. Columns: Domain, Last Run (from state.md), 🔴 count, 🟡 count, 🟢 count, Top Flag (description of the highest-priority active flag, or "No active flags"). Domains not updated in 30+ days get a "(stale)" note in the Last Run column.

**Calendar section:** Lists events from vault/calendar/00_current/ and vault/calendar/00_current/ that fall today or within the next 24 hours. Events are displayed as: HH:MM — title — location. If no calendar items exist for today, displays "No calendar items today." If the calendar plugin is not installed, displays "Calendar plugin not installed."

**Open loops section:** Grouped by domain, sorted by priority within each group. 🔴 items first, then 🟡, then 🟢. Resolved items (checked checkboxes) are not included. Each item shows: priority emoji + description + recommended action. Items in the Top 3 are not duplicated in the open loops list — they appear only in the Top 3 callout.

## Steps

1. Receive domain alerts (sorted list from collect-domain-alerts) and calendar items from calling op
2. Apply five-level urgency ranking to all alert items
3. Select Top 3 ACTION TODAY items from ranked list (fill with 🟡 if fewer than 3 are 🔴)
4. Write plain-language action statements for each Top 3 item (not raw task descriptions)
5. Build domain alert table: one row per installed plugin, with counts and top flag description
6. Build calendar section from today's calendar items, or display appropriate placeholder
7. Build open loops section: grouped by domain, sorted by priority, excluding Top 3 items
8. Assemble complete brief document in the standard four-section format
9. Return formatted brief document to calling op for vault write

## Input

- Sorted domain alerts list (from chief-flow-collect-domain-alerts)
- Per-domain status records (from chief-task-pull-domain-status)
- Calendar items for today (passed by calling op from vault/calendar/)

## Output Format

```
# Daily Brief — [Weekday, Month DD YYYY]

## ACTION TODAY
1. 🔴 [Domain]: [Clear specific action in plain language]
2. [Priority] [Domain]: [Clear specific action]
3. [Priority] [Domain]: [Clear specific action]

## Domain Alerts
| Domain      | Last Run        | 🔴 | 🟡 | 🟢 | Top Flag                                  |
|-------------|-----------------|----|----|-----|-------------------------------------------|
| tax         | 2026-04-10      | 1  | 0  | 2  | Q1 estimated payment due April 15         |
| benefits    | 2026-04-01      | 0  | 1  | 1  | HSA contribution below annual limit       |
| calendar    | (stale 38 days) | 0  | 0  | 0  | No active flags                           |

## Calendar Today
- 09:00 — Team standup — Zoom
- 14:00 — Doctor appointment — [location]
[or: "No calendar items today"]

## Open Loops
### tax (3 items)
- 🔴 Q1 estimated payment due April 15 → Log payment in vault/tax/payments.md
- 🟢 Review 2025 state return for carryforward items → Review by May 1
...

### benefits (2 items)
- 🟡 HSA contribution below $4,300 annual limit → Increase payroll deduction
...
```

## Configuration

- `focus_block_minimum_hours` in vault/chief/config.md — default 1.5 (not used in daily brief, only weekly preview)
- Stale threshold: 30 days (domains not updated beyond this get "(stale N days)" in Last Run column)

## Error Handling

- **Fewer than 3 eligible items across all domains:** Fill Top 3 with however many exist; do not pad with empty or made-up items.
- **Domain alert table has no rows (no plugins installed):** Display "No plugins detected" in the table body rather than an empty table.
- **Calendar items malformed (no time field):** List the event without a time rather than excluding it.

## Vault Paths

- Reads from: inputs passed by calling op (no direct vault reads)
- Writes to: ~/Documents/AIReadyLife/vault/chief/02_briefs/daily-YYYY-MM-DD.md (via calling op)
