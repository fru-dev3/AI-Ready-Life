---
type: op
trigger: user-facing
cadence: event-driven (also scanned monthly)
description: >
  Watches for life events that should trigger an insurance coverage review: marriage,
  divorce, baby, home purchase, mortgage payoff, job change, retirement, death of a
  named insured. When detected (manual flag, vault signal, or cross-domain hint),
  surfaces the specific coverage adjustments to consider per policy line.
---

# insurance-life-event-coverage-trigger

**Trigger phrases:**
- "got married — what should I update"
- "had a baby — insurance check"
- "bought a house — insurance review"
- "I'm changing jobs — coverage transition"
- "life event review"

**Cadence:** Event-driven; also runs as part of `op-monthly-sync` to catch events logged elsewhere.

## What It Does

Life events change insurance needs in specific, predictable ways. The op turns a generic "you should review your coverage" into concrete, per-policy action items.

**Event → recommended coverage actions (subset):**
- **Marriage:** Add spouse to auto and home; revisit life insurance face value (income replacement now factors a partner); add spouse as primary beneficiary on life and retirement; review combined umbrella need.
- **Divorce:** Remove ex from auto, home, and beneficiaries (especially retirement and life); split policies if jointly held; reconsider life insurance need; update emergency contacts.
- **New child:** Increase life insurance to 10-12× income (multiplier rises with dependents); add child to health plan within 30-day special enrollment window; update beneficiaries to add child via trust mechanism if minor; reconsider disability adequacy; consider 529 setup.
- **Home purchase:** Bind homeowners coverage at closing; update auto for new garaging zip; reconsider umbrella as net worth steps up; remove renters policy.
- **Mortgage payoff:** Optionally drop force-placed lender requirements but keep replacement-cost coverage; revisit life insurance need (one large debt removed).
- **Job change:** Bridge health coverage between employer plans (COBRA / marketplace); reassess group life and disability — they often don't port; update employer life beneficiary.
- **Retirement:** Trigger Medicare planning op (if 65+); shift LTD review (employer LTD ends); reconsider life insurance need (income replacement may no longer be needed).
- **Death of a named insured:** File claim per `op-document-claims-process`; remove from policies; update beneficiaries downstream.

## Steps

1. Read recent life events from `vault/insurance/config.md` (and `vault/calendar/`, `vault/social/`, `vault/home/` if present).
2. For each event since last run: look up the event-to-actions mapping above.
3. For each affected policy line, compose an action item: "review", "increase coverage", "remove beneficiary", etc.
4. Write event-driven brief to `vault/insurance/02_briefs/life-event-{event-type}-{YYYY-MM-DD}.md`.
5. Call `task-update-open-loops` for each generated action.
6. For events that imply imminent enrollment windows (new child, marriage, job change), tag actions URGENT with the special-enrollment deadline date.

## Configuration

`vault/insurance/config.md`:
- `recent_life_events` — list of `{event_type, date, notes}`
- `last_life_event_run` — timestamp; the op only processes events newer than this

## Error Handling

- **Unknown event type:** Generate a generic "review all policies" action and surface for manual mapping.
- **Cross-domain vault unavailable:** Operate on insurance config only.

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/insurance/config.md`, optional `~/Documents/aireadylife/vault/{calendar,social,home}/`
- Writes: `~/Documents/aireadylife/vault/insurance/02_briefs/life-event-*.md`, `~/Documents/aireadylife/vault/insurance/open-loops.md`
