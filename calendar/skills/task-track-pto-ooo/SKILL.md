---
type: task
trigger: user-or-flow
description: >
  Tracks PTO / sick / OOO balance against configurable accrual rules. Reads OOO events from
  the work calendar, sums consumed days, compares to balance, surfaces calendar events that
  conflict with available PTO, and flags use-it-or-lose-it deadlines for plans with caps.
  Universal for W-2 employees; degrades gracefully for contractors/self-employed (skips silently).
---

# calendar-track-pto-ooo

**Trigger:**
- User input: "log PTO", "PTO balance", "OOO check"
- Called by: `op-weekly-agenda`, `op-quarterly-time-design-rebalance`

**Produces:** PTO log + flags at `vault/calendar/00_current/pto-log.md`.

## What It Does

Maintains a PTO ledger and a derived balance summary. Each entry: date range, type (PTO / sick / floating / unpaid / bereavement), days consumed, source (manual log or detected from a calendar OOO event).

**Detection:** scans the work calendar for events titled `OOO`, `PTO`, `Vacation`, `Sick`, or matching configurable patterns; suggests new ledger entries for any not yet logged. Ledger writes go through `task-create-confirmed-event` only when scheduling future PTO; back-logged consumption is recorded directly.

**Balance:** computes accrued − consumed using `pto_accrual_rate_days_per_period` and `pto_period` (e.g., 1.67 days/month). Floats and other categories tracked separately.

**Use-it-or-lose-it flag:** if `pto_carryover_cap` is set and current balance would exceed cap by year-end at current consumption rate, surfaces a HIGH severity flag with the latest "must-take-by" date.

**Conflict surface:** if upcoming PTO events would exceed available balance, flags as a scheduling conflict.

If `pto_accrual_rate_days_per_period` is unset (contractor / self-employed), the task no-ops with a single note in the brief.

## Steps

1. Read `vault/calendar/00_current/pto-log.md` and config.
2. Scan work calendar for OOO/PTO events; reconcile against ledger.
3. Compute accrued − consumed; compute projected year-end balance.
4. Compare to `pto_carryover_cap`; flag use-it-or-lose-it if applicable.
5. Cross-check upcoming scheduled PTO against available balance.
6. Write findings via `task-update-open-loops`.

## Configuration

`vault/calendar/config.md`:
- `pto_accrual_rate_days_per_period`
- `pto_period` (e.g., monthly, biweekly)
- `pto_carryover_cap` (optional)
- `pto_event_title_patterns` (default `OOO|PTO|Vacation|Sick`)

## Vault Paths

- Reads: work calendar via native MCP or `app-gcalendar` fallback; `vault/calendar/00_current/pto-log.md`
- Writes: `vault/calendar/00_current/pto-log.md`, `vault/calendar/open-loops.md`
