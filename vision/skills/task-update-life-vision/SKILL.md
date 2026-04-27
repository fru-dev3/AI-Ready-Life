---
type: task
trigger: user-or-flow
description: >
  Writes and versions the life vision document with explicit 5-year, 10-year, and 25-year
  horizons. Enforces coverage of every configured vision domain. The vision doc is the
  foundational artifact every other vision skill depends on; this task is the only way it
  gets created or updated.
---

# vision-update-life-vision

**Trigger phrases:**
- "update life vision"
- "rewrite my vision"
- "set my 25-year vision"
- "edit vision document"

**Trigger:** User-facing; also called by `op-annual-review`, `flow-validate-vision-completeness`.

## What It Does

Captures or refreshes the life vision document — the written description of the life the user is aiming for at three time horizons: 5 years, 10 years, and 25 years out.

Every horizon must address each vision domain configured in `config.md`. Defaults to the standard six (health, wealth, career, family, creativity, contribution); users may extend up to thirteen (adding learning, social, home, explore, records, insurance, calendar) or trim to a smaller set. Whatever the user lists in `vision_domains`, every horizon section must touch each one — even if the answer is "no change from today."

Output is plain markdown so any editor or future Claude session can read and revise it without tooling.

## Steps

1. Read `~/Documents/aireadylife/vault/vision/config.md` for `vision_domains`.
2. Read existing `~/Documents/aireadylife/vault/vision/00_current/life-vision.md` if present.
3. If updating: archive the prior version to `01_prior/life-vision-YYYY-MM-DD.md` before overwriting.
4. Walk the user through each horizon (5y, 10y, 25y) and each configured domain.
5. Write the refreshed doc to `00_current/life-vision.md` with version date in the frontmatter.
6. Call `flow-validate-vision-completeness` to confirm all horizons + domains are covered.
7. Note any gaps in `open-loops.md` via `task-update-open-loops`.

## Output Format

```
---
version: YYYY-MM-DD
horizons: [5y, 10y, 25y]
---

# Life Vision

## 5-Year Horizon
### [Domain 1]
[Description]
...

## 10-Year Horizon
...

## 25-Year Horizon
...
```

## Configuration

`vault/vision/config.md`:
- `vision_domains` — list of domains every horizon must cover (default: health, wealth, career, family, creativity, contribution)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/vision/00_current/life-vision.md`
- Writes: `~/Documents/aireadylife/vault/vision/00_current/life-vision.md`, `~/Documents/aireadylife/vault/vision/01_prior/life-vision-YYYY-MM-DD.md`
