---
type: flow
trigger: called-by-op
description: >
  Single helper that synthesizes state from every installed domain plugin. Reads each
  domain's open-loops.md, current state files, and recent briefs. Returns a normalized
  per-domain summary that other vision skills consume instead of re-implementing the
  same cross-domain reads.
---

# vision-cross-domain-vision-pull

**Trigger:** Called by `flow-build-scorecard`, `flow-score-domain-progress`, `op-vision-snapshot`, `op-monthly-scorecard`, `op-year-in-review`.

## What It Does

Reads every configured domain plugin's vault and returns a uniform per-domain record. This is the leverage skill of the vision plugin — without it, every vision flow re-implements the same cross-domain read pattern, drifting over time and breaking when a new domain is added.

Per-domain record fields: `domain`, `open_loops_count`, `open_loops_high`, `open_loops_resolved_30d`, `last_brief_date`, `current_state_summary`, `recent_milestones_30d`, `installed`. A domain marked `installed: false` is reported as such and skipped by callers — no error.

## Steps

1. Read `vault/vision/config.md` for `active_domains` (default: all 13 — health, wealth, career, family, relationships, learning, creativity, home, fun, community, spirituality, finance, personal-growth — but configurable to user-specific lists).
2. For each domain, check whether `~/Documents/aireadylife/vault/{domain}/` exists. If not, mark `installed: false` and skip.
3. Read `vault/{domain}/open-loops.md`; count total items, count items tagged HIGH, count items resolved in the last 30 days (by checked-off / archived markers).
4. Read most recent file in `vault/{domain}/02_briefs/` for `last_brief_date`.
5. Read `vault/{domain}/00_current/` for the most recent monthly summary or state file; extract one-sentence summary.
6. Read `vault/vision/00_current/milestones.md`; count milestones tagged with this domain in the last 30 days.
7. Return the array of records, sorted by `domain` matching the user's configured order.

## Output Format

JSON-shaped record per domain:
```
{
  "domain": "health",
  "installed": true,
  "open_loops_count": 4,
  "open_loops_high": 1,
  "open_loops_resolved_30d": 6,
  "last_brief_date": "2026-04-01",
  "current_state_summary": "Q1 labs reviewed; HRV trend stable.",
  "recent_milestones_30d": 2
}
```

## Configuration

`vault/vision/config.md`:
- `active_domains` — list of domain names (default: all 13)

## Error Handling

- **Domain vault missing:** Mark `installed: false`. No error to caller.
- **Domain vault present but open-loops.md missing:** Treat counts as 0; note `state: stale`.

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/{domain}/open-loops.md`, `00_current/`, `02_briefs/` for every active domain.
- Writes: nothing.
