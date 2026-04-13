---
name: arlive-calendar-collect-deadlines
type: flow
trigger: called-by-op
description: >
  Scans all installed plugin open-loops.md files and extracts items with explicit
  due dates within the next 60 days, sorted chronologically with urgent items
  (due within 7 days) flagged separately.
---

# arlive-calendar-collect-deadlines

**Trigger:** Called by `arlive-calendar-deadline-alert`, `arlive-calendar-weekly-agenda`, `arlive-calendar-deadline-planning`
**Produces:** A sorted list of cross-domain deadline items with urgency flags, passed to the calling op for agenda building or deadline planning.

## What it does

Reads the `open-loops.md` file from every installed plugin vault directory (health, wealth, tax, career, estate, insurance, content, vision, etc.) and extracts any item that contains an explicit due date. Parses dates in ISO format (YYYY-MM-DD) and natural language formats (e.g., "by end of month", "April 15"). Items are sorted chronologically from nearest to furthest. Any item due within 7 days is tagged as urgent and surfaced at the top of the output regardless of domain. Items due 8-30 days out are tagged as upcoming. Items due 31-60 days out are tagged as horizon. Items beyond 60 days are excluded from output to keep focus actionable. Returns the structured list to the calling op for further processing.

## Steps

1. Read `open-loops.md` from each installed plugin vault directory
2. Extract all items that contain an explicit due date field or date phrase
3. Parse and normalize all dates to ISO format (YYYY-MM-DD)
4. Sort items chronologically, nearest first
5. Tag items: urgent (≤7 days), upcoming (8-30 days), horizon (31-60 days)
6. Flag items tagged urgent with no preparation activity logged

## Apps

vault file system

## Vault Output

`vault/calendar/00_deadlines/`
