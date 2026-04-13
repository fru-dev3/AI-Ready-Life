---
name: arlive-intel-topic-deep-dive
type: op
cadence: on-demand
description: >
  On-demand deep dive on a specific topic that pulls recent coverage, identifies key voices, and
  summarizes the state of play. Triggers: "deep dive", "tell me about", "topic research",
  "what's happening with".
---

# arlive-intel-topic-deep-dive

**Cadence:** On-demand (when topic research is needed)
**Produces:** Structured topic summary with current state, key players, developments, and open questions

## What it does

This op goes deeper than the daily briefing on a single topic the user wants to understand fully.
It aggregates recent coverage from multiple sources, identifies the key voices and perspectives on
the issue, and synthesizes a 3-5 paragraph summary of the current state of play. It distinguishes
between factual reporting and opinion, notes where sources agree vs. disagree, and lists open
questions or developments to watch. The output is written to the vault as a topic brief that can
be revisited as the story develops.

## Calls

- **Flows:** `arlive-intel-build-topic-summary`
- **Tasks:** `arlive-intel-update-open-loops`

## Apps

None

## Vault Output

`vault/intel/02_topics/`
