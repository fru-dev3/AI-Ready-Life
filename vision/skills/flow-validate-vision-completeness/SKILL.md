---
type: flow
trigger: called-by-op
description: >
  Verifies the life vision document covers every configured horizon and every configured
  vision domain. Called by op-annual-review and on demand. Surfaces missing horizons or
  domains as flags in open-loops.md.
---

# vision-validate-vision-completeness

**Trigger:** Called by `task-update-life-vision`, `op-annual-review`; user-facing when the user asks "is my vision complete?"

## What It Does

Parses the life vision document and confirms two things: (1) every horizon listed in `config.md` has a section, and (2) every domain in `vision_domains` is addressed under each horizon.

Configurable: defaults to three horizons (5y, 10y, 25y) and the standard six domains (health, wealth, career, family, creativity, contribution). Users running a smaller (6) or larger (13) domain set will have the validator scoped to whatever they configured. The flow does not opine on what the user wrote — only on whether the structure is complete.

A vision doc that is missing a horizon or domain is flagged in `open-loops.md`. A doc that has every horizon and every domain present (even if a section just says "no change") passes.

## Steps

1. Read `vault/vision/config.md` for `horizons` and `vision_domains`.
2. Read `vault/vision/00_current/life-vision.md`. If absent, return MISSING and flag.
3. Parse markdown headers; for each horizon, collect the domain subsections present.
4. Build a coverage matrix: horizons × domains.
5. List missing cells (e.g., "10y horizon is missing the contribution domain").
6. Compute `vision_age_days` from the doc's version date.
7. If `vision_age_days > 365`, flag stale-vision in open-loops.
8. If any cells are missing, call `task-update-open-loops` with one line per missing cell.
9. Return PASS, MISSING (with cell list), or STALE.

## Output Format

```
Vision completeness: PASS | INCOMPLETE | STALE | MISSING
Horizons configured: [5y, 10y, 25y]
Domains configured: [N domains]
Coverage: [X / Y cells filled]
Missing cells:
- [Horizon] x [Domain]
Vision age: [N] days (threshold [M])
```

## Configuration

`vault/vision/config.md`:
- `horizons` (default 5y, 10y, 25y)
- `vision_domains` (default six)
- `vision_max_age_days` (default 365)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/vision/00_current/life-vision.md`, `config.md`
- Writes (via task): `~/Documents/aireadylife/vault/vision/open-loops.md`
