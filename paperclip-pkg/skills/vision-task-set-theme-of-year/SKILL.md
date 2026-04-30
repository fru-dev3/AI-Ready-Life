---
type: task
trigger: user-or-flow
description: >
  Captures a single word or short phrase framing for the year ("build", "rest", "depth",
  "ship"). Lightweight discipline that compounds across the year — every quarterly plan,
  monthly scorecard, and decision check can reference it.
---

# vision-set-theme-of-year

**Trigger phrases:**
- "set theme of year"
- "this year's word"
- "annual theme"
- "word of the year"

**Trigger:** User-facing; recommended after `op-year-in-review`.

## What It Does

Stores a single chosen word or short phrase for the calendar year. The theme is intentionally constrained: one word or a 2–4 word phrase, no paragraphs. Constraint is the feature.

The theme sits at the top of the vision snapshot and is referenced by quarterly planning. It is not a goal, a metric, or an OKR. It is the lens the user wants to look through this year.

## Steps

1. Read existing `~/Documents/aireadylife/vault/vision/00_current/theme-of-year.md` if present.
2. If a theme already exists for the current year, confirm whether the user wants to replace it; if so, archive the prior to `01_prior/theme-YYYY.md`.
3. Prompt the user for the word or phrase.
4. Optional: capture 2–3 sentences of context — why this theme, what it means in practice, what it is not.
5. Write to `00_current/theme-of-year.md` with year and version date.

## Output Format

```
---
year: YYYY
set_on: YYYY-MM-DD
---

# Theme: [Word or phrase]

## What it means
[2-3 sentences]

## What it is not
[1-2 sentences]
```

## Configuration

None.

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/vision/00_current/theme-of-year.md`
- Writes: `~/Documents/aireadylife/vault/vision/00_current/theme-of-year.md`, `~/Documents/aireadylife/vault/vision/01_prior/theme-YYYY.md`
