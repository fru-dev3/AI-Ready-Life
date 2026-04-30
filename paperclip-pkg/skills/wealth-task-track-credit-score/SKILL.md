---
type: task
trigger: user-or-flow
description: >
  Logs current credit score from any source (Credit Karma, card issuer, Experian,
  TransUnion, Equifax, FICO) to a monthly time series. Flags >20-point drops
  immediately. Scores are kept per bureau because they can differ.
---

# wealth-track-credit-score

**Trigger:**
- User input: "log my credit score"
- Called by: `op-monthly-synthesis`, `op-debt-review`

## What It Does

Maintains a monthly credit-score log. Each entry: date, bureau (Experian / TransUnion / Equifax / FICO / VantageScore composite), score, source app, notes.

**Drop detection:** if any bureau drops >20 points month-over-month, immediately writes to open-loops with severity HIGH and prompts the user to check for fraud, missed payment, or unexpected hard inquiry.

**Stale detection:** if a bureau hasn't been logged in >90 days, surfaces as a reminder in `op-monthly-synthesis`.

## Steps

1. Read input: bureau, score, date, source
2. Append entry to `vault/wealth/00_current/credit-score-log.md`
3. Compare new score to prior entry for same bureau
4. If drop >20 points: write to `vault/wealth/open-loops.md` with severity HIGH
5. Compute average score across bureaus for any single date with multiple entries

## Configuration

`vault/wealth/config.md`:
- `credit_score_drop_threshold` (default 20)
- `credit_score_stale_days` (default 90)

## Vault Paths

- Writes: `vault/wealth/00_current/credit-score-log.md`, `vault/wealth/open-loops.md`
