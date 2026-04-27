---
type: op
cadence: on-demand
description: >
  Lightweight current-state snapshot of wealth. Reads the most recent net worth, cash
  flow, and any active open-loops, returns a 30-second summary. Distinct from
  op-monthly-synthesis (which is the full monthly process that runs all flows fresh
  and produces deep briefs). Use this when you want to know "where do I stand right now"
  without re-running anything heavy.
---

# wealth-review-brief

**Trigger phrases:**
- "wealth snapshot"
- "where do I stand financially right now"
- "quick wealth review"
- "what's the wealth picture"

**Cadence:** On-demand. Runs against the most recent stored briefs without re-computing them.

## What It Does

Reads the latest available wealth artifacts and returns a 30-second snapshot. No new analysis is performed; this is a read-only view of what's already in `02_briefs/` and `open-loops.md`.

**Output (one screen):**
- Net worth: most recent figure + MoM delta (from latest `02_briefs/YYYY-MM-net-worth.md`)
- Cash flow: latest month income vs expenses (from latest `02_briefs/YYYY-MM-cash-flow.md`)
- Top 3 open loops by severity from `open-loops.md`
- Last full synthesis date — flags if older than 35 days with note: "Run `op-monthly-synthesis` for fresh analysis"

## Steps

1. Find newest net-worth brief in `vault/wealth/02_briefs/` matching `*-net-worth.md`
2. Find newest cash-flow brief
3. Read open-loops.md, sort by severity, take top 3
4. Compose snapshot, no fresh computation
5. Note synthesis freshness; if stale, prompt user

## Vault Paths

- Reads only: `vault/wealth/02_briefs/`, `vault/wealth/open-loops.md`
- Writes nothing
