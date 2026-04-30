---
type: task
trigger: user-or-op
description: >
  Light CRM for recruiter relationships: who reached out, what role and company, when, comp
  range mentioned, response sent, follow-up status, and whether it's worth keeping warm.
  Turns an unmanaged inbox of recruiter pings into a structured pipeline. Most professionals
  get recruiter touches monthly; without logging, every touch is reinvented.
---

# career-log-recruiter-touch

**Trigger phrases:**
- "log a recruiter touch"
- "recruiter reached out"
- "I got a recruiter message"
- "add to recruiter log"

**Cadence:** Per touch; called by `op-weekly-market-pulse` when new threads are detected.

## What It Does

Each touch creates one row in `vault/career/00_current/recruiter-touches.md`. Rows capture enough to make three decisions next time the same recruiter or company surfaces: do I respond, is this worth a screening call, and is the recruiter themselves worth keeping warm long-term.

**Per-row fields:**
- `date_received`, `recruiter_name`, `recruiter_company` (their employer — recruiting agency or in-house), `client_company` (the hiring company, if external recruiter), `role`, `level`, `comp_range_mentioned` (if any)
- `outreach_channel` (linkedin / email / phone / referral)
- `quality_signal` — based on whether the message used the user's actual context (specific skill, recent work) vs. mass blast
- `response_sent` (yes / no / scheduled), `response_summary` (one line)
- `outcome` (declined / screen-scheduled / advanced / passed / ghosted / parked)
- `keep_warm` (bool — based on quality + role-fit + recruiter behavior)
- `next_touch_date` (if keep_warm is true)

**Quality signal scoring** — used to triage volume:
- HIGH: named target company, specific skill match, comp clearly in range
- MEDIUM: target tier company, role fit but generic message, comp adjacent or unstated
- LOW: out-of-tier, role mismatch, mass-blast template, or comp clearly below floor

When `keep_warm: true`, set `next_touch_date` 90 days out and write to open-loops MEDIUM as a follow-up reminder.

## Steps

1. Collect fields from user message or from `op-weekly-market-pulse` recruiter-inbox sweep.
2. Score quality signal HIGH/MEDIUM/LOW.
3. If client company and role match a configured target list, escalate quality_signal one tier.
4. Append row to `vault/career/00_current/recruiter-touches.md`.
5. If `keep_warm: true`, set follow-up reminder via `task-update-open-loops`.
6. Return summary: row id, quality signal, recommended next action.

## Configuration

`vault/career/config.md`:
- `recruiter_keep_warm_followup_days` (default 90)
- `target_companies` (named list — used to escalate quality signal)

## Vault Paths

- Reads: input message text, `~/Documents/aireadylife/vault/career/config.md`
- Writes: `~/Documents/aireadylife/vault/career/00_current/recruiter-touches.md`, `open-loops.md`
