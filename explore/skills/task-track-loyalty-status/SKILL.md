---
type: task
trigger: user-or-flow
description: >
  Tracks airline, hotel, rental car, and credit-card travel-loyalty programs: current tier,
  miles/points balance, status-renewal date, and expiring miles. Most adults have 2-3
  programs and lose value to expiry — this surfaces it in time.
---

# explore-track-loyalty-status

**Trigger:**
- User input: "log loyalty balance", "update status", "miles expiring?"
- Called by: `op-monthly-sync`, `op-review-brief`, `flow-build-trip-summary` (read)

## What It Does

Maintains a single ledger of every travel-loyalty program the user is enrolled in, so status decisions (mileage runs, status matches, redemption deadlines) and expiry warnings are visible in one place.

**Program ledger (one row per program in `vault/explore/00_current/loyalty.md`):**
- `program` — e.g., "Delta SkyMiles", "Hilton Honors", "Hertz Gold", "Chase Sapphire UR"
- `kind` — airline / hotel / rental / credit_card / cruise / other
- `member_id` — last 4 only; full ID lives in 1Password / records plugin
- `current_tier` — e.g., "Silver Medallion", "Diamond"
- `tier_qualifying_units_ytd` — miles, segments, nights, dollars (units vary by program)
- `tier_target_next` — units needed for next tier
- `tier_renewal_date` — when current tier expires if not requalified
- `points_balance` — current
- `points_expiry_date` — earliest expiry, if program expires unused points
- `last_activity_date` — used by programs with rolling activity expiry (e.g., AAdvantage 24-month)
- `notes` — co-brand cards, status-match opportunities

**Expiry warnings:**
- 🔴 if any expiry is within 60 days
- 🟡 if any expiry is within 180 days
- 🟢 ongoing tier-progress reminders if user is within 25% of next tier

**Cross-domain:** Loyalty balances are not financial assets but the user's total point liquidity is summarized in monthly briefs. Annual-fee credit-card decisions consume this data.

## Steps

1. Receive update from user (or call): program, balance, tier, expiry
2. Read `vault/explore/00_current/loyalty.md`
3. Update or append row
4. Compute days-to-expiry and tier-renewal-date deltas
5. If thresholds breached: call `task-update-open-loops`
6. Write file
7. Return summary of programs needing action

## Configuration

`vault/explore/config.md`:
- `loyalty_expiry_warn_days` (default 60)
- `loyalty_expiry_advisory_days` (default 180)
- `tier_progress_alert_pct` (default 25)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/explore/00_current/loyalty.md`
- Writes: `~/Documents/aireadylife/vault/explore/00_current/loyalty.md`, `~/Documents/aireadylife/vault/explore/open-loops.md`
