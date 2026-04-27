---
type: task
trigger: user-or-flow
description: >
  Maintains a gear inventory (travel + outdoor) at vault/explore/00_current/gear.md with item,
  category, condition, last-used date, and replacement flags. Pre-trip prep and packing
  checklists read from it.
---

# explore-update-gear-inventory

**Trigger:**
- User input: "add gear", "update gear", "replace {item}", "log gear use"
- Called by: `task-pretrip-packing-checklist`, `op-trip-planning-review` (read-only)

## What It Does

Tracks every piece of travel and outdoor gear the user owns or rents so packing checklists know what's available and pre-trip review can flag worn-out or missing items before they become a problem on a trip.

**Gear schema (one row per item):**
- `item` — name (e.g., "Rab Microlight down jacket")
- `category` — apparel / footwear / shelter / sleep / cooking / electronics / safety / luggage / docs-pouch / other
- `activity_tags` — list (hiking, camping, travel, running, biking, ski, paddle, business)
- `condition` — new / good / worn / needs-replacement / retired
- `last_used` — YYYY-MM-DD, auto-updated by `task-log-outing` and trip return
- `purchased` — YYYY-MM-DD, optional
- `cost` — optional
- `notes` — freeform (e.g., "warranty through 2027")
- `replacement_flag` — boolean; set true when condition becomes `needs-replacement`

**Replacement flagging:** When an item is marked `needs-replacement` or `retired`, a 🟡 entry is written to `open-loops.md` so the user buys before the next relevant trip.

**Last-used auto-update:** When a trip or outing is logged with `gear_used: [item-ids]`, the matching items' `last_used` field updates automatically. Items with `last_used` older than 24 months are surfaced in the year-end pattern analysis as "consider donating or selling."

**Universal:** Categories cover the full range of travel + outdoor activities. Users without certain gear types (e.g., no ski equipment) simply omit those categories.

## Steps

1. Receive gear update from user: add / edit / mark replacement / retire
2. Read current `vault/explore/00_current/gear.md`
3. Apply update to matching row (or append new row)
4. If condition transitioned to `needs-replacement`: call `task-update-open-loops` with replacement flag
5. Write updated gear file
6. Return confirmation

## Configuration

`vault/explore/config.md`:
- `gear_unused_threshold_months` (default 24)
- `default_categories` (override available categories)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/explore/00_current/gear.md`
- Writes: `~/Documents/aireadylife/vault/explore/00_current/gear.md`, `~/Documents/aireadylife/vault/explore/open-loops.md`
