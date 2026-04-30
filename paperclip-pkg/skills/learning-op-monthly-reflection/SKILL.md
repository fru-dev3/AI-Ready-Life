---
type: op
trigger: user-facing
description: >
  Monthly reflection brief — distinct from pace review. Captures what was learned,
  what changed in capability or thinking, what blocked progress, and what's next.
  Closes the gap where pace metrics were tracked but qualitative learning
  was never written down.
---

# learning-monthly-reflection

**Trigger phrases:**
- "monthly learning reflection"
- "what did I learn this month"
- "learning retro"
- "reflect on learning"

**Cadence:** Monthly, end-of-month (last 3 days).

## What It Does

Produces a structured reflection brief about the month — qualitative, not quantitative. Read alongside `op-monthly-sync` (which owns pace review): this one answers "what changed in me," not "did I keep pace."

**Sections produced:**
1. **Theme recap** — the named theme from `theme-YYYY-MM.md` and whether the planned applied output shipped.
2. **What I learned** — 3–7 concrete claims of new capability or new mental model. Each ≤2 sentences. Cites source (course, book, paper, conversation).
3. **What changed** — what I'm doing differently now, or what decision was unblocked.
4. **What blocked me** — the friction (time, scope, motivation, gaps in prerequisites). Honest.
5. **Next month's bet** — one-sentence hypothesis about what to learn next, hand-off to `op-monthly-theme-set`.
6. **Cross-domain links** — any items that produced calls to `task-link-learning-to-domain`.

**Inputs read:**
- `vault/learning/00_current/theme-YYYY-MM.md`
- `vault/learning/00_current/applied-outputs.md` (filtered to month)
- `vault/learning/00_current/study-log.md` (filtered to month)
- `vault/learning/00_current/notes/` (notes captured this month, via `task-capture-note`)

## Steps

1. Read inputs above for the closing month.
2. Draft sections 1–6 from inputs; prompt user to edit / confirm sections 2–4 (they need human voice).
3. Save brief to `vault/learning/02_briefs/reflection-YYYY-MM.md`.
4. If next-month theme not yet set, surface as open-loop pointing at `op-monthly-theme-set`.

## Configuration

`vault/learning/config.md`: none required — uses theme + applied-outputs + study-log + notes.

## Vault Paths

- Reads: `vault/learning/00_current/theme-YYYY-MM.md`, `vault/learning/00_current/applied-outputs.md`, `vault/learning/00_current/study-log.md`, `vault/learning/00_current/notes/`
- Writes: `vault/learning/02_briefs/reflection-YYYY-MM.md`, `vault/learning/open-loops.md`
