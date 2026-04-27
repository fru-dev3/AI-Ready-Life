---
type: op
trigger: user-facing
cadence: quarterly
description: >
  Schedules and prepares the four proactive year-round CPA conversations that turn
  a CPA from a once-a-year preparer into a strategist: Q3 projection (mid-September
  — are estimates on track?), Q4 year-end planning (early November — confirm
  Dec 31 moves), filing-season packet handoff (Feb–Apr), post-filing strategy
  debrief (May — what to change for next year). For each touchpoint, generates a
  briefing note your CPA can read in 5 minutes.
---

# op-cpa-touchpoints

**Trigger phrases:**
- "schedule CPA touchpoints"
- "CPA strategy meeting"
- "Q3 tax check-in with accountant"
- "post-filing debrief"
- "CPA call prep"

**Cadence:** Quarterly anchors (mid-Sep, early Nov, Feb–Apr, May); user-triggered.

## What It Does

A good CPA relationship has 4 touchpoints per year, not just one in March. Each touchpoint has a specific purpose and a specific brief. This op generates the briefing note for the upcoming touchpoint so the conversation produces decisions, not data collection.

**Touchpoint 1 — Q3 Projection Check (mid-September).**
Brief contains: YTD income by stream, YTD payments (withholding + Q1 + Q2 estimates), latest `flow-build-estimate` output, any income surprises (job change, RSU vest, large 1099-NEC), Q3 estimated payment recommendation, AMT-trigger flags (ISO exercises). Decision asked: "Is the Q3 estimate the right amount, or should we adjust?"

**Touchpoint 2 — Q4 Year-End Planning (early November).**
Overlaps with `op-year-end-planning-sweep`. Brief contains: contribution-to-max gaps, charitable bunching analysis, FSA balance, RMD status, Roth conversion candidacy, itemize-vs-standard projection, equity-comp moves, tax-loss harvesting candidates. Decision asked: "Which Dec 31 moves should we make?"

**Touchpoint 3 — Filing Season Packet Handoff (Feb–Apr).**
Brief contains: link to or attached `op-cpa-packet` output, list of any open items, any unusual events the CPA needs to know about (sale of property, inheritance, large gift, residency change). Decision asked: "Anything else needed before you start the return?"

**Touchpoint 4 — Post-Filing Debrief (May).**
Brief contains: filed return summary (AGI, total tax, effective rate, refund or balance due), surprises vs prior year, what the CPA recommends changing for next year (W-4 adjustment, estimated-payment cadence, entity structure, retirement strategy). Decision asked: "What's the playbook for next year?"

## Steps

1. Identify which of the four touchpoints is upcoming (next 30 days) based on calendar
2. Read relevant inputs:
   - Q3: latest `flow-build-estimate`, `task-extract-income-ytd`, equity-comp events
   - Q4: `op-year-end-planning-sweep` output (or run it if missing)
   - Filing season: `op-cpa-packet` output
   - Post-filing: filed return PDF + prior-year return for comparison
3. Generate briefing note at `vault/tax/02_briefs/YYYY-cpa-{touchpoint}.md`
4. Add calendar reminder to schedule the conversation if `gcalendar` configured
5. Add a `cpa-touchpoint` flag to open-loops with the touchpoint date and the decision asked

## Configuration

`vault/tax/config.md`:
- `cpa_name`, `cpa_email`, `cpa_phone` (used in salutation)
- `cpa_secure_portal` (preferred delivery)

## Apps

- `gcalendar` — optional; schedule the touchpoint meeting

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/tax/00_current/`, `~/Documents/aireadylife/vault/tax/02_briefs/`, `~/Documents/aireadylife/vault/tax/01_prior/`
- Writes: `~/Documents/aireadylife/vault/tax/02_briefs/YYYY-cpa-{touchpoint}.md`, `~/Documents/aireadylife/vault/tax/open-loops.md`
