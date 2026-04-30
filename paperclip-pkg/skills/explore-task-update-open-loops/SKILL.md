---
type: task
description: >
  Writes all explore flags (expiring documents, unbooked trip items, budget overruns, gear
  replacement, loyalty expiry, entry-requirement gaps) to vault/explore/open-loops.md and
  resolves completed items. This is the single canonical writer; document-expiration logic
  was merged in from the former task-flag-expiring-document.
---

# explore-update-open-loops

**Trigger:** Called by explore ops and flows
**Produces:** Updated ~/Documents/aireadylife/vault/explore/open-loops.md with current action items

## What It Does

This task maintains vault/explore/open-loops.md as the canonical explore domain action list. It handles both writing new flags and resolving completed ones, keeping the file clean and actionable rather than accumulating stale entries.

**New flags written:** Six flag types are written by this task.
(1) **Document expiration flags** (merged in from the former task-flag-expiring-document): written when any travel document — passport, Global Entry, TSA PreCheck, Nexus, country visa, Yellow Fever or other vaccination, REAL ID — is within the alert window for its type. Each entry captures: document type, person it belongs to, exact expiration date, days remaining, renewal lead time specific to that document type, recommended action with URL or phone number, and urgency tier. Urgency calibrates by lead time: a passport with 9 months left and a 10-13 week renewal gets 🟡; same passport at 5 months gets 🔴. Global Entry (2-6 month processing + 3-12 month interview wait) flags 🔴 starting 12 months before expiry. Document flags deduplicate on `{document, person}` — repeated scans update the existing entry's days-remaining and append an escalation timestamp instead of creating duplicates.
(2) **Booking gap flags**: written when a trip has departure within 60 days and one or more critical booking categories (flights, accommodation, insurance) are still unbooked. Format: "🟡 Book travel insurance for [destination] — departure [N] days."
(3) **Budget overrun flags**: written when a trip's actual spend exceeds the estimated budget for any category by 15% or more (🟡) or 30% or more (🔴): "🟡 [Destination] accommodation over budget — est. $1,200, currently $1,600."
(4) **Gear replacement flags**: written when `task-update-gear-inventory` marks an item `needs-replacement` or `retired`. Includes item name and "buy before next {activity} trip" guidance.
(5) **Loyalty expiry flags**: written when `task-track-loyalty-status` finds points or status within 60 days (🔴) or 180 days (🟡) of expiry.
(6) **Entry-requirement flags**: written when `task-check-entry-requirements` finds an unmet visa, eTA, vaccination, or passport-validity requirement for a trip with departure within 90 days.

**Resolution logic:** On every call, the task scans existing open-loop items for resolution conditions. Document flag resolution: the document record in vault/explore/00_current/ has been updated with a new expiry date beyond the alert window — confirmed renewal. Booking gap resolution: the trip record in vault/explore/00_current/ now shows the booking as completed (confirmation number added). Budget overrun resolution: the trip record shows actual cost has been updated and the overrun has been addressed. Gear replacement resolution: the gear inventory shows the item replaced (new `purchased` date and `condition: new` or `good`). Loyalty expiry resolution: balance / tier renewal date pushed past the alert window. Entry-requirement resolution: the trip's `## Entry Requirements` row marks the item ✅. Items are marked resolved with a checked checkbox and a resolution note.

**Priority ordering:** The file is ordered with 🔴 items first (critical document issues, trips within 30 days with missing critical bookings), then 🟡 items (important but not immediate), then 🟢 items (on-radar monitoring). Within each tier, items are sorted by urgency date (nearest date first).

**Archive management:** Items resolved more than 60 days ago are moved to vault/explore/open-loops-archive.md to keep the active file manageable.

## Steps

1. Receive new flags from calling op (document flags, booking gaps, budget overruns)
2. For each new flag: check for existing unresolved entry matching the same document/booking/trip
3. If match: update existing entry with current days-remaining or status; add timestamp; do not duplicate
4. If no match: append new flag in appropriate priority position
5. Scan all existing active flags for resolution conditions
6. For document flags: read vault/explore/00_current/ for updated expiry date; resolve if renewed
7. For booking gaps: read vault/explore/00_current/ for updated booking status; resolve if booked
8. For budget overruns: read vault/explore/00_current/ for updated actuals; resolve if addressed
9. Mark confirmed resolved items with `- [x]`; add resolution note and date
10. Archive items resolved 60+ days ago to vault/explore/open-loops-archive.md
11. Write updated file

## Input

- New flags from calling op
- ~/Documents/aireadylife/vault/explore/open-loops.md (current state)
- ~/Documents/aireadylife/vault/explore/00_current/ (for document renewal verification)
- ~/Documents/aireadylife/vault/explore/00_current/ (for booking completion verification)

## Output Format

vault/explore/open-loops.md structure:
```markdown
# Explore — Open Loops

_Last updated: YYYY-MM-DD_

## Active
- [ ] 🔴 **Renew Global Entry — [Name]** — Expires Mar 1, 2026 (52 days) — Submit NOW at cbp.gov/ttp
- [ ] 🟡 **Book Kyoto accommodation — [Destination] trip** — Departure Nov 15 (216 days) — Need nights Nov 20-25
- [ ] 🟡 **Purchase travel insurance — [Destination] trip** — Departure Nov 15 (216 days) — Required for international travel
- [ ] 🟢 **Renew US Passport — [Name]** — Expires Feb 14, 2027 — Renew by Aug 2026

## Resolved
- [x] **Booked outbound flights — [Destination]** — Resolved 2026-04-10 (Conf: ABC123)
```

## Configuration

No configuration required.

## Error Handling

- **open-loops.md missing:** Create with standard header before writing.
- **Resolution evidence ambiguous:** Leave flag active; note "Mark resolved manually when confirmed."
- **File exceeds 25 active items:** Flag: "Explore open loops building up — schedule a document check or trip planning review to process items."

## Vault Paths

- Reads from: ~/Documents/aireadylife/vault/explore/open-loops.md, ~/Documents/aireadylife/vault/explore/00_current/, ~/Documents/aireadylife/vault/explore/00_current/
- Writes to: ~/Documents/aireadylife/vault/explore/open-loops.md, ~/Documents/aireadylife/vault/explore/open-loops-archive.md
