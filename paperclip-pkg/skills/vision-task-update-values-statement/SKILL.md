---
type: task
trigger: user-or-flow
description: >
  Captures and versions the explicit values statement that sits beneath the life vision
  document. Reviewed annually by op-annual-review and referenced on demand by
  task-decision-alignment-check.
---

# vision-update-values-statement

**Trigger phrases:**
- "update my values"
- "edit values statement"
- "what do I value"
- "review my values"

**Trigger:** User-facing; called annually by `op-annual-review` and read by `task-decision-alignment-check`.

## What It Does

Maintains an explicit, written values statement — a short list of named values (typically 5–9) with a one-sentence definition for each. Values are the criteria the user wants to use when making major decisions; they live beneath the life vision and rarely change year to year, but are reviewed annually so that hidden drift becomes visible.

Versioning is identical to the life vision doc: archive the prior file to `01_prior/` with the date stamp before overwriting `00_current/values.md`.

## Steps

1. Read existing `~/Documents/aireadylife/vault/vision/00_current/values.md` if present.
2. Walk the user through each named value: keep, edit, drop, or add.
3. For every value, capture: name, one-sentence definition, one example of what honoring it looks like, one example of what violating it looks like.
4. Archive the prior file to `01_prior/values-YYYY-MM-DD.md`.
5. Write the refreshed values to `00_current/values.md` with version date.
6. If this update was triggered by `op-annual-review`, return summary; otherwise note the update in the user's running log.

## Output Format

```
---
version: YYYY-MM-DD
---

# Values

## [Value Name]
**Definition:** [One sentence]
**Honoring it looks like:** [Concrete example]
**Violating it looks like:** [Concrete example]
```

## Configuration

`vault/vision/config.md`:
- `values_count_target` (default 5–9) — soft cap to keep the list usable

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/vision/00_current/values.md`
- Writes: `~/Documents/aireadylife/vault/vision/00_current/values.md`, `~/Documents/aireadylife/vault/vision/01_prior/values-YYYY-MM-DD.md`
