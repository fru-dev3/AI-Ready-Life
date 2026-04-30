---
type: op
trigger: user-facing
cadence: weekly
description: >
  Generates a weekly meal plan and grocery list aligned to the household's nutrition goals
  and weekly schedule. Reads health-plugin nutrition targets if available (calories,
  macros, dietary restrictions), reads the week's calendar from calendar-plugin if
  available (which nights are eat-at-home vs. eat-out), and produces a 7-day meal plan
  plus a categorized grocery list. Universal — works for solo, couple, or family.
---

# home-meal-grocery-plan

**Trigger phrases:**
- "meal plan"
- "grocery list"
- "weekly meals"
- "what should I cook this week"
- "build a meal plan"

**Cadence:** Weekly (typically Sunday) or on-demand.

## What It Does

Produces a 7-day meal plan and a single consolidated grocery list, calibrated to the
household's nutrition goals and the week's actual at-home meal count.

**Inputs read (in priority order):**

1. `vault/home/config.md` — household size, dietary restrictions, cuisine preferences,
   grocery budget, preferred grocer.
2. `vault/health/00_current/` (if health plugin installed) — daily calorie target,
   protein floor, macro split, allergies, dislikes.
3. `vault/calendar/00_current/` (if calendar plugin installed) — count nights with
   evening commitments to subtract from at-home dinner count.
4. `vault/home/00_current/pantry-inventory.md` (if maintained) — what's already on hand.

**Output:**
- `vault/home/02_briefs/YYYY-MM-DD-meal-plan.md` — 7-day plan: breakfast / lunch /
  dinner per day, target macros per meal where applicable.
- `vault/home/02_briefs/YYYY-MM-DD-grocery-list.md` — categorized list (produce,
  protein, dairy, pantry, frozen, household), with estimated total spend.

## Steps

1. Read config + health nutrition targets + week's calendar.
2. Determine effective at-home dinner count (7 minus evenings out).
3. Pick recipes that hit nutrition targets, respect restrictions, fit cooking-time
   constraint from config (default 30 min weeknight / 60 min weekend).
4. De-duplicate ingredients across recipes; subtract pantry inventory.
5. Categorize remaining ingredients by store section.
6. Estimate total spend against grocery budget; flag if >10% over.
7. Write meal plan + grocery list to briefs folder.

## Configuration

`vault/home/config.md`:
- `household_size` (adults / kids)
- `dietary_restrictions` (vegetarian, gluten-free, allergies, dislikes)
- `weeknight_cook_minutes` (default 30)
- `grocery_budget_weekly` (optional)
- `preferred_grocer` (optional — for app integrations)

## Vault Paths

- Reads: `vault/home/config.md`, `vault/home/00_current/pantry-inventory.md`,
  `vault/health/00_current/` (cross-domain), `vault/calendar/00_current/` (cross-domain)
- Writes: `vault/home/02_briefs/YYYY-MM-DD-meal-plan.md`,
  `vault/home/02_briefs/YYYY-MM-DD-grocery-list.md`
