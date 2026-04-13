---
name: arlive-real-estate-update-open-loops
type: task
description: >
  Writes all real-estate flags (market shifts, affordability changes, interesting listings, buy
  window signals) to vault/real-estate/open-loops.md and resolves completed items.
---

# arlive-real-estate-update-open-loops

**Trigger:** Called by real-estate ops and flows
**Produces:** Updated `vault/real-estate/open-loops.md` with current action items

## What it does

This task maintains the real-estate domain's open-loops file as the active watchlist for market
signals and purchasing considerations. It appends flags generated during market scans (significant
price movements, inventory drops, buy window signals) and affordability reviews (rate change
impact, updated max purchase price). It also tracks listings saved for follow-up and notes whether
any have been toured, passed on, or gone under contract. Items are resolved when the underlying
trigger is no longer relevant — a listing sold, a market signal normalized, or a decision made.

## Apps

None

## Vault Output

`vault/real-estate/open-loops.md`
