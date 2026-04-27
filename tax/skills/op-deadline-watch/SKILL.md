---
type: op
cadence: monthly
description: >
  Monthly tax deadline monitor. Flags all federal and state tax obligations due within
  30 days, plus a 90-day forward look. Covers quarterly estimated payments (Q1 April
  15, Q2 June 15, Q3 Sept 15, Q4 Jan 15), annual return and extension deadlines, and
  — for users with active LLCs / S-corps — entity-level obligations (annual reports,
  franchise tax, Form 941, registered agent renewals). Each flag includes amount,
  payment method, urgency tier, and source reference. Triggers: "check tax deadlines",
  "upcoming tax dates", "what tax is due", "tax deadline alert".
---

# op-deadline-watch

**Cadence:** Monthly (1st of month)
**Produces:** 90-day deadline list at `vault/tax/00_current/YYYY-MM-deadlines.md`; deadline alerts in `vault/tax/open-loops.md`

## What It Does

Runs on the first of each month to surface all tax obligations falling within the next 30 days (urgent action window) plus a 90-day forward look. The monthly cadence ensures no deadline is missed regardless of how infrequently the user thinks about taxes.

**Deadline categories covered:**

- **Federal personal:** Q1 estimate (Apr 15), Q2 (Jun 15), Q3 (Sep 15), Q4 (Jan 15), annual return or extension (Apr 15), extended return (Oct 15).
- **State personal:** state return / extension (most mirror Apr 15; some differ); state estimated payments (most mirror federal). Listed per state from config.
- **Entity-level (advanced/optional, only if entities configured):** S-corp / partnership return (Mar 15 or extension), LLC annual report (varies by state), franchise tax (e.g., California $800 by Apr 15, Texas margin tax by May 15), Form 941 quarterly payroll (Apr 30 / Jul 31 / Oct 31 / Jan 31), Form 940 FUTA (Jan 31), registered agent renewal.

**Q1 (April 15 cluster).** The April 15 deadline drives three obligations that collide: Q1 estimated payment, return / extension decision, and (for entities) C-corp returns. In the March run, all three are flagged with clear separation — extension to file does not extend the time to pay.

**Quarterly payment amounts.** For each estimated-payment deadline, the op checks `vault/tax/00_current/` for a current quarterly estimate. If found, uses the figure; otherwise flags "[Amount TBD — run op-quarterly-estimate]" and recommends running it.

**Entity deadline specificity.** Entity flags include entity name, state, fee, and portal. Common patterns surfaced from config: e.g., California LLC $800 minimum franchise tax (Apr 15); Texas margin tax (May 15); Delaware annual report (Jun 1 LLCs / Mar 1 corps). Skipped entirely for users without entities configured.

**EFTPS enrollment warning.** If any estimated payment exceeds $1,000 and the user has not enrolled in EFTPS (per config), adds: "EFTPS enrollment takes 5–7 business days — enroll now or use IRS Direct Pay for immediate payment."

**Urgency tiering.** ≤7 days: CRITICAL. 8–14 days: HIGH. 15–30 days: MEDIUM. 31–90 days: UPCOMING (awareness only, not flagged).

## Steps

1. Read `vault/tax/config.md`: filing status, states, entities (if any), extensions filed, prior-year tax liability, EFTPS enrollment status
2. Read or generate `vault/tax/00_current/deadline-calendar.md` (master calendar populated from config)
3. Filter to deadlines due within next 90 days; sort by days remaining
4. For each deadline within 30 days, look up payment amount from latest estimate file or fixed fee
5. Build the deadline list and write to `vault/tax/00_current/YYYY-MM-deadlines.md`
6. For each deadline ≤30 days, call `task-update-open-loops` with type `deadline-alert`, severity by urgency tier, exact due date, amount, payment method/portal, and source reference
7. If the master calendar is missing entries for configured entities, prompt user to verify

## Configuration

`vault/tax/config.md`:
- `filing_status`, `states`, `prior_year_tax_liability`
- `entities` (advanced/optional)
- `extensions_filed` (list of entities/personal where Form 4868 / 7004 was submitted)
- `eftps_enrolled` (true/false)

## Calls

- **Tasks:** `task-update-open-loops`

## Apps

- `app-irs.portal` — optional; verify prior payments on transcript
- `gcalendar` — optional; mirror deadline alerts to Google Calendar

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/tax/00_current/`, `~/Documents/aireadylife/vault/tax/config.md`, `~/Documents/aireadylife/vault/tax/01_prior/`
- Writes: `~/Documents/aireadylife/vault/tax/00_current/YYYY-MM-deadlines.md`, `~/Documents/aireadylife/vault/tax/open-loops.md`
