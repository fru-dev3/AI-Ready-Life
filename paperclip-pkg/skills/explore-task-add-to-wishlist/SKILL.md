---
type: task
trigger: user-or-flow
description: >
  Adds a destination, trail, restaurant, or experience to a structured wishlist that
  flow-suggest-next-outing and trip planning read from. Tags by scope (solo / partner /
  family / group) and activity type so suggestions stay relevant.
---

# explore-add-to-wishlist

**Trigger:**
- User input: "add to wishlist", "save this trail", "I want to go to {place}"
- Called by: `task-log-experience-reflection` (when `recommend_to_others: yes`), `flow-trip-pattern-analysis`

## What It Does

Captures a candidate destination or experience in a single structured file so future suggestion and trip-planning skills read from one place instead of scraping notes.

**Wishlist entry schema:**
- `name` — e.g., "Glacier National Park" or "Owamni restaurant"
- `kind` — destination / trail / restaurant / experience / event
- `location` — city, region, or coordinates
- `activity_tags` — hike / run / paddle / city / dining / cultural / festival / other
- `scope_tags` — solo / partner / family / group / any (multiple allowed)
- `season` — best months or `any`
- `prep_required` — none / light / heavy (permits, lottery, advance reservation)
- `source` — who recommended, link, or trigger context
- `priority` — high / medium / low
- `status` — unvisited / planned / visited / abandoned
- `notes` — freeform
- `added_date` — YYYY-MM-DD

**Deduplication:** If an entry with matching name + location already exists, the task updates priority / source / notes rather than appending a duplicate. Status auto-transitions: `unvisited → visited` when a matching outing or trip is logged.

**Universal:** Wishlist is not constrained to outdoor or local-only. International bucket-list trips, neighborhood restaurants, music festivals, and city visits all live in the same list with different `kind` and `activity_tags`.

## Steps

1. Receive wishlist entry from user (free-form ok; task structures it)
2. Read `vault/explore/00_current/wishlist.md`
3. Check for duplicate by name + location
4. If duplicate: update priority / notes; otherwise append new entry
5. Write file
6. Return confirmation with current wishlist count

## Configuration

`vault/explore/config.md`:
- `default_scope_for_new_entries` (default `any`)
- `wishlist_max_active` (soft cap; warn over 100)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/explore/00_current/wishlist.md`
- Writes: `~/Documents/aireadylife/vault/explore/00_current/wishlist.md`
