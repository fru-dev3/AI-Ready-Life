---
type: task
trigger: user-or-flow
description: >
  Tracks any learning budget the user configures — employer stipend, personal
  annual budget, tuition reimbursement, or none. Logs spend by category, computes
  remaining balance, and flags unspent funds 90 / 30 days before fiscal-year or
  anniversary expiry. Users with no budget skip this skill entirely.
---

# learning-track-learning-budget

**Trigger:**
- User input: "log learning spend", "what's left in my learning budget", "track tuition reimbursement"
- Called by: `op-monthly-sync`, `op-monthly-reflection`

## What It Does

Maintains a single ledger of learning-related spend against a user-configured budget cap.

**Budget model (configurable):**
- `budget_amount` (annual, in user's currency).
- `budget_cycle` — `calendar_year`, `fiscal_year` (with `fiscal_year_start_month`), or `anniversary` (with `anniversary_date`).
- `budget_source` — free-text label (e.g. "employer stipend", "personal", "tuition reimbursement", "GI Bill"). Generic.
- `categories_allowed` — list of categories the budget covers (default: course, book, conference, certification-exam, software, coaching, subscription).

**Per-spend entry:**
- `date`, `amount`, `category`, `vendor`, `description`, `reimbursement_status` (n/a / submitted / approved / paid), `receipt_path`.

**Expiry flagging:**
- 90 days before cycle end with >25% balance unspent → MEDIUM open-loops entry.
- 30 days before cycle end with any balance unspent → HIGH open-loops entry.
- If `reimbursement_status` is `submitted` for >30 days → MEDIUM flag.

**Skip rule:** if `budget_amount` is empty in config, this skill exits cleanly with no output.

## Steps

1. Read `vault/learning/config.md`. If no `budget_amount`, exit.
2. Read existing ledger `vault/learning/00_current/budget-ledger.md`.
3. Append new entry (if invoked with one) and recompute balance.
4. Compute days remaining in cycle.
5. Apply expiry rules; call `task-update-open-loops` for any flags.
6. Write current balance + spend-by-category summary back to ledger header.

## Configuration

`vault/learning/config.md`:
- `budget_amount`, `budget_cycle`, `fiscal_year_start_month`, `anniversary_date`, `budget_source`, `categories_allowed`.

## Vault Paths

- Writes: `vault/learning/00_current/budget-ledger.md`, `vault/learning/open-loops.md`
