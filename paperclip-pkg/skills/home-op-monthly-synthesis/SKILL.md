---
type: op
trigger: user-facing
cadence: monthly
description: >
  Full monthly home synthesis. Runs every flow fresh, produces deep monthly brief,
  hands monthly home expenses to wealth-agent (cross-domain handoff), updates
  open-loops, and rolls prior month's records to 01_prior/. Mirrors the monthly
  synthesis pattern used by every other domain plugin. Universal.
---

# home-monthly-synthesis

**Trigger phrases:**
- "monthly home synthesis"
- "deep monthly home review"
- "synthesize home month"
- "close out home month"

**Cadence:** Monthly (1st–3rd of month, after `op-monthly-sync`).

## What It Does

The deep monthly process. Where `op-monthly-sync` is the lightweight cadence run, this
op does the full synthesis: every flow recomputed from scratch, every open loop
re-evaluated, every cross-domain handoff executed.

**Synthesis steps:**
1. Run `flow-build-expense-summary` for the closed month.
2. Run `flow-build-maintenance-schedule` for the current quarter.
3. Run `op-organize-documents` if last run >90 days ago.
4. Re-evaluate every open maintenance item: still relevant? escalated? completed?
5. Roll prior month's records from `00_current/` to `01_prior/YYYY-MM/`.
6. **Cross-domain handoff:** write monthly home spend totals to
   `vault/wealth/00_current/home-expense-handoff.md` so wealth-agent's cash-flow
   review reads them without duplicating ingest. Closes the household-budget
   non-negotiable.
7. Write the deep synthesis brief.

## Output

- `vault/home/02_briefs/YYYY-MM-monthly-synthesis.md` — full brief: expense recap,
  maintenance status, seasonal progress, renewals on the horizon, handoffs executed.
- `vault/wealth/00_current/home-expense-handoff.md` — single file consumed by wealth.

## Steps

1. Confirm prior month is closed (today >= 1st of new month).
2. Run the four sub-flows / ops listed above.
3. Reconcile maintenance items.
4. Roll archives.
5. Write wealth handoff.
6. Write the synthesis brief.
7. Update open-loops with anything carried forward.

## Configuration

`vault/home/config.md`:
- `wealth_handoff_enabled` (default true if wealth plugin installed)
- `archive_retention_months` (default 24)

## Vault Paths

- Reads: `vault/home/00_current/`, `vault/home/01_prior/`, `vault/home/config.md`
- Writes: `vault/home/02_briefs/YYYY-MM-monthly-synthesis.md`,
  `vault/home/01_prior/YYYY-MM/`, `vault/home/open-loops.md`,
  `vault/wealth/00_current/home-expense-handoff.md` (cross-domain)
