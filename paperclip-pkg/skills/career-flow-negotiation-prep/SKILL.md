---
type: flow
trigger: user-or-op
description: >
  Compiles a moment-of-decision negotiation packet: BATNA (other live options + market comp
  benchmarks), leverage points (recent achievements, market signals, hard-to-replace skills),
  target range and walk-away number, and counter-language for common objections. Distinct
  from passive comp benchmarking — this fires when an offer is on the table or a comp
  conversation is scheduled.
---

# career-negotiation-prep

**Trigger:** User-triggered when an offer arrives or a comp conversation is scheduled; can also be called by `op-performance-review-prep` or `op-interview-prep` when an offer-decision step is imminent.

## What It Does

Compiles a single packet sized for a 60-90 minute prep session before the negotiation conversation. The objective is not to "win" — it is to walk in with the four things most negotiators forget: a specific number, the data behind it, the alternative if it falls through, and pre-rehearsed language for the three or four predictable counters.

**Four sections:**

1. **BATNA (Best Alternative To Negotiated Agreement)** — pulls live pipeline items from `vault/career/00_current/` filtered to stages (final, offer, late-stage). For each, lists company, role, latest stated comp range or last benchmark, and timeline. Plus the latest market P50 from `vault/career/02_briefs/` for this role+level so even with no other live offers there is a fact-based floor.

2. **Leverage** — top 5 achievements from `vault/career/00_current/achievements.md` ranked by external defensibility (what would the next employer pay to hire someone who did this), recent market signals (skills the user has that JDs flag as required and hard-to-find), and any tenure/loyalty arguments if internal.

3. **Number target + walk-away** — three specific numbers: anchor (the first number you say), target (where you'd accept), walk-away (below this you say no). Anchor is set above target P75; target sits between target P50 and P75; walk-away is at the higher of (current TC + 5%) or (target P50 - 10%). Equity, signing bonus, and start date are addressed separately because they trade differently.

4. **Objection counters** — drafts 3-5 sentence responses to predictable counters: "that's above our band," "we don't typically negotiate equity," "we already gave you our best offer," "what's your current comp" (never answer with a single number — always pivot to expectation), "we need a decision in 24 hours" (always negotiate timeline first).

## Steps

1. Read context: is this an external offer, internal counter-offer, or comp-conversation prep? (Affects which leverage frames apply.)
2. Read live pipeline from `vault/career/00_current/` to populate BATNA section.
3. Read latest comp benchmark from `vault/career/02_briefs/`; pull P50 / P75 / P90 for role + level.
4. Read top achievements from `vault/career/00_current/achievements.md`; rank by external defensibility.
5. Compute anchor / target / walk-away numbers per the rules above.
6. Draft 3-5 objection counters with specific language.
7. Write packet to `vault/career/02_briefs/YYYY-MM-DD-{company}-negotiation-prep.md`.
8. Call `task-update-open-loops` with the decision deadline if an offer is in hand.

## Configuration

`vault/career/config.md`:
- `negotiation_anchor_pct_above_target` (default 10-15%)
- `walk_away_floor_method` (default: max of current_tc * 1.05 or p50 * 0.9)
- `current_tc` (already required for comp review)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/career/00_current/`, `achievements.md`, `02_briefs/` comp benchmarks
- Writes: `~/Documents/aireadylife/vault/career/02_briefs/YYYY-MM-DD-{company}-negotiation-prep.md`, `open-loops.md`
