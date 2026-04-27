---
type: task
trigger: user-or-flow
description: >
  Per-trip travel-insurance evaluation: worth it or not, given trip cost, destination risk,
  trip type, age, pre-existing conditions, and existing credit-card / employer / annual-policy
  coverage. Optional per trip (v2).
---

# explore-evaluate-travel-insurance

**Trigger:**
- User input: "do I need travel insurance for {trip}?", "evaluate insurance"
- Called by: `op-trip-planning-review` (auto when destination is international, trip cost > threshold, or traveler age > threshold)

## What It Does

Decides — based on the user's facts and trip facts — whether buying travel insurance for a specific trip is worth it, and if so, what coverage tier and approximate cost.

**Inputs:**
- Trip record: destination, dates, total trip cost, traveler ages, trip type
- Existing coverage from `config.md` and the insurance plugin (if installed): credit card travel benefits (trip cancel / interruption / delay / baggage / rental car / medical), annual travel policy, employer business-travel coverage, primary health insurance international scope
- Risk factors: destination advisory level, activity tags (skiing, scuba, etc. often excluded by default), pre-existing conditions, age-based premium escalation

**Decision matrix the task applies:**
- If trip is fully refundable, low-cost, and domestic with intact health insurance → likely skip
- If international + trip cost > $2000 + no existing trip-cancel coverage → recommend at least medical + cancellation tier
- If destination has limited medical evac options or remote activity is planned → recommend evac coverage specifically
- If credit card already covers the relevant categories → recommend gap-only policy or skip
- If age > 70 or pre-existing condition flagged → recommend specialist provider; do not assume mass-market policies cover

**Output (in trip file under `## Travel Insurance Evaluation`):**
- Recommendation: skip / gap policy / standard tier / premium tier / specialist
- Rationale (1–3 bullets)
- Estimated cost band (e.g., "$80-150 for this trip")
- Comparison cue: "Compare quotes from 2–3 providers"
- Any 🟡/🔴 entries to open-loops if departure is approaching and decision is unmade

**Cross-domain:** Reads insurance-plugin policy docs if present (annual travel rider, credit-card benefits PDF). The task does NOT shop for insurance — it evaluates whether to.

## Steps

1. Read trip record + traveler ages + activity tags
2. Read `config.md` for declared existing coverage
3. (If insurance plugin installed) Read credit-card benefits and annual policies
4. Apply decision matrix
5. Write `## Travel Insurance Evaluation` to trip file
6. If departure < 30 days and decision is unmade: surface to open-loops
7. Return summary

## Configuration

`vault/explore/config.md`:
- `existing_credit_card_travel_benefits` (provider, summary)
- `annual_travel_policy` (yes/no, provider, scope)
- `travelers_with_preexisting_conditions` (boolean per traveler)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/explore/00_current/{trip-file}.md`, `~/Documents/aireadylife/vault/explore/config.md`, optional `~/Documents/aireadylife/vault/insurance/00_current/`
- Writes: trip file, `~/Documents/aireadylife/vault/explore/open-loops.md`
