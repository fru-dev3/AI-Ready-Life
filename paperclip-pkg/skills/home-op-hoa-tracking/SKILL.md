---
type: op
trigger: user-facing
cadence: monthly
description: >
  OWNER-ONLY. Tracks HOA dues, special assessments, meeting calendar, voting items,
  and rule changes. Auto-skips if home_type is "rent" or hoa_active is false.
  Surfaces upcoming meetings, unpaid dues, and any rule change that affects the user
  (rentals, exterior modifications, pets, parking).
---

# home-hoa-tracking

**Owner-only and HOA-only.** Exits with skip message if `home_type` is "rent" or
`hoa_active` is false in config.

**Trigger phrases:**
- "HOA review"
- "HOA dues"
- "HOA meeting"
- "track HOA"

**Cadence:** Monthly check; meeting-based when meeting calendar surfaces an item.

## What It Does

Keeps the HOA surface current so dues stay paid, meetings get attended (or
absentee-voted), and rule changes don't catch the user off-guard.

**Tracked surfaces:**
- **Dues** — monthly / quarterly / annual amount, payment method, paid through date,
  any late fee history.
- **Special assessments** — purpose, amount, due date, payment plan if offered.
- **Meeting calendar** — annual meeting, board meetings, town halls; agenda + voting
  items + user attendance / proxy.
- **Rule changes** — newly proposed or adopted CC&R amendments; flagged with
  "affects you" tag if they touch rentals, exterior changes, pets, parking, fences,
  satellite dishes, ADUs, short-term rentals.
- **Documents** — current bylaws, CC&Rs, architectural review process, reserve study
  (most recent), financial statements (annual).

**Flags:**
- Dues unpaid within 7 days of due → HIGH.
- Special assessment due within 60 days → MEDIUM.
- Annual meeting within 30 days → MEDIUM (with meeting prep prompt).
- Rule change adopted that affects user → HIGH (with action: file objection / comply
  / update other plans).

## Steps

1. Confirm `home_type` is "own" and `hoa_active` is true; otherwise exit.
2. Read HOA records from `vault/home/00_current/hoa/`.
3. Check dues paid-through and next due.
4. Pull meeting calendar (manually entered or scraped from HOA portal if app
   available); flag upcoming.
5. Compare current bylaws / CC&Rs to last-recorded version; surface diffs.
6. Write brief if anything flagged.

## Configuration

`vault/home/config.md`:
- `home_type` (must be "own")
- `hoa_active` (must be true)
- `hoa_management_company`
- `hoa_dues_amount` and `hoa_dues_cadence`
- `hoa_portal_url` (if applicable)

## Vault Paths

- Reads: `vault/home/config.md`, `vault/home/00_current/hoa/`
- Writes: `vault/home/02_briefs/YYYY-MM-DD-hoa.md` (when items flagged),
  `vault/home/open-loops.md`
