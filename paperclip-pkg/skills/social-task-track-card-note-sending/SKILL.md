---
type: task
trigger: user-or-flow
description: >
  Tracks handwritten cards, thank-you notes, condolence cards, and holiday cards.
  For users who maintain a card-writing practice. Surfaces who is owed a card,
  what's been sent, and who is on the annual holiday-card list. Optional v2 skill.
---

# social-track-card-note-sending

**Trigger:**
- User input: "log a thank-you card", "any cards I owe", "holiday card list"
- Called by: `op-relationship-review` (optional surface), `op-birthday-watch`

## What It Does

For users who keep a written-card practice, this task maintains the ledger so cards don't get forgotten. Three modes:

**Mode 1 — Owed cards:** Lists thank-you notes the user has committed to send (after gifts received, hospitality, condolences offered, congratulations) but not yet sent. Each entry: recipient, occasion, owed-since date, deadline. Cards still owed past 14 days surface in `open-loops.md`.

**Mode 2 — Sent cards log:** Records each card sent with date and occasion. Used to avoid duplicate sends and to tally annual card volume.

**Mode 3 — Holiday card list:** Maintains the recipient list for the user's annual card mailing. Each contact: address (if available, otherwise flag as needs-address), card-style preference if known, last-year-sent yes/no. Pre-Thanksgiving the list surfaces with a count of missing addresses so the user can fill them in before the December rush.

The skill is intentionally narrow. It does not draft card text, does not generate addresses, does not handle ordering. It tracks intent and completion only.

## Steps

1. For "log card sent" or "log card owed": append entry to `00_current/cards.md`
2. For "any cards owed": filter to `status: owed` past their deadline; return list
3. For "holiday card list": filter to `holiday_list: true`; tally missing addresses; flag in `open-loops.md` if November onward and addresses still missing
4. Daily/weekly: any `owed` card past `deadline + 14 days` becomes a HIGH-severity open-loop

## Configuration

`vault/social/config.md`:
- `card_owed_grace_days` (default 14)
- `holiday_card_address_review_month` (default November)

## Vault Paths

- Reads: `00_current/contacts.md`, `00_current/cards.md`
- Writes: `00_current/cards.md`, `open-loops.md`
