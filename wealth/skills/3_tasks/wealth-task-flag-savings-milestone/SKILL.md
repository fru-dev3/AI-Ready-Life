---
name: arlive-wealth-flag-savings-milestone
type: task
cadence: called-by-op
description: >
  Writes a positive milestone flag to vault/wealth/open-loops.md when an account
  hits a savings or payoff target. Includes goal name, amount, and suggested next action.
---

# arlive-wealth-flag-savings-milestone

**Cadence:** Called by debt review and net worth review ops
**Produces:** Milestone entries in vault/wealth/open-loops.md with celebration note and cash reallocation suggestion

## What it does

Called when an account crosses a meaningful threshold: an emergency fund reaching 3 or 6 months of expenses, invested assets crossing $50k, $100k, or $250k, a debt fully paid off, or a savings account hitting a configured target. Writes a structured milestone entry to vault/wealth/open-loops.md that names the goal achieved, the account or metric involved, and the date it was crossed. Unlike other open-loop flags, milestones are informational and positive in tone — they are not "problems to fix." Each milestone also includes a suggested next action: when a debt is paid off, the flag recommends where to redirect the freed monthly payment (e.g., "redirect $450/month to brokerage auto-invest"); when an emergency fund goal is met, it suggests shifting savings focus to the next priority.

## Apps

None

## Vault Output

`vault/wealth/open-loops.md`
