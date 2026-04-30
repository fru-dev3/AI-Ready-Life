---
type: task
trigger: user-or-flow
cadence: annual-with-quarterly-checks
description: >
  OWNER-ONLY. Logs annual property-tax assessment + payment schedule (typically
  semi-annual or quarterly depending on jurisdiction). Surfaces appeal-deadline
  awareness when assessment increases >assessment_increase_threshold_pct YoY (default
  10%) — most jurisdictions have a 30–90 day appeal window. Auto-skips if home_type
  is "rent".
---

# home-track-property-tax

**Owner-only.** If `home_type` in config is "rent", this skill exits with:
"Property-tax tracking applies to homeowners. Skipping — your config shows you rent."

**Trigger:**
- User input: "log property tax", "track property tax", "property tax appeal"
- Called by `op-monthly-sync` (quarterly check), `op-monthly-synthesis`

## What It Does

Maintains the property-tax record per property, including:

- **Assessment year + assessed value** — written when the new annual assessment lands
  in mail or county portal.
- **YoY assessment change** — % increase / decrease.
- **Appeal-window deadline** — read from config (jurisdiction-specific) or user input;
  flagged in open-loops with HIGH severity if assessment jumped >threshold.
- **Payment schedule** — first half / second half (or quarterly depending on
  jurisdiction); each due date logged with paid date and amount.
- **Escrowed vs. paid-direct** — if mortgage has tax escrow, payments are made by
  servicer; the task still tracks the schedule for awareness.

**Appeal flag rules:**
- Assessment increase >threshold AND appeal window still open → HIGH-severity flag
  with deadline countdown.
- Assessment increase >threshold AND appeal window closed → low-severity note for
  next year.

## Steps

1. Confirm `home_type` is "own"; otherwise exit.
2. Read input: tax year, assessed value, payment due date, amount, paid status.
3. Append to `vault/home/00_current/property-tax-log.md`.
4. Compute YoY % change vs. prior assessment.
5. If above threshold and appeal window open, flag.
6. Track payment-due dates; flag any unpaid within 30 days of due.

## Configuration

`vault/home/config.md`:
- `home_type` (must be "own")
- `property_tax_jurisdiction`
- `property_tax_appeal_window_days` (e.g., 30, 60, 90)
- `assessment_increase_threshold_pct` (default 10)
- `property_tax_escrowed` (true / false)
- `property_tax_due_dates` (varies by jurisdiction — e.g., one annual installment, or two semi-annual installments)

## Vault Paths

- Reads: `vault/home/config.md`, `vault/home/00_current/property-tax-log.md`
- Writes: `vault/home/00_current/property-tax-log.md`, `vault/home/open-loops.md`
