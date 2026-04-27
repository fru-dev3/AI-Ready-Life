---
type: flow
trigger: called-by-op
description: >
  v2. Suggests scheduling deep work at the user's high-energy times based on a configured
  chronotype + a self-reported energy log. Used by `flow-build-agenda` to choose which 90+ min
  free block to assign to deep work. Skips gracefully if chronotype unset.
---

# calendar-energy-aware-scheduling

**Trigger:** Called by `flow-build-agenda`, `op-weekly-agenda`.
**Produces:** Ranked candidate windows for deep-work block placement.

## What It Does

Combines two inputs to score available focus windows:

1. **Chronotype baseline** from `config.md`: one of `morning`, `early-afternoon`, `late-afternoon`, `evening`, `flexible`. Each baseline maps to default high-energy bands (e.g., `morning` → 07:00–11:00 peak).
2. **Self-reported energy log** at `vault/calendar/00_current/energy-log.md` — optional daily entries (`{date}: high {start-end}, low {start-end}, notes`). When ≥30 entries are present, the flow computes the empirical peak window (mode of `high` ranges) and uses that to override the baseline.

**Output:** for each candidate 90+ min free window the caller passes in, returns a score (0–100) where higher = better energy fit. Flow does not write events — `flow-build-agenda` consumes the score and chooses placement.

**No-op path:** if `chronotype` is unset and energy log is empty, returns equal scores for all candidates (no-op fallback) so the caller behaves identically to a non-energy-aware run.

## Steps

1. Read `chronotype` from config.
2. Read `energy-log.md`; compute empirical peak if ≥30 entries present.
3. For each candidate window, compute overlap with high-energy band → score.
4. Apply low-energy penalty for windows during the user's recorded slumps.
5. Return ranked list to caller.

## Configuration

`vault/calendar/config.md`:
- `chronotype` (one of `morning`, `early-afternoon`, `late-afternoon`, `evening`, `flexible`)
- `energy_log_min_entries_for_empirical` (default 30)

## Vault Paths

- Reads: `vault/calendar/config.md`, `vault/calendar/00_current/energy-log.md`
- Writes: nothing (scores returned to caller)
