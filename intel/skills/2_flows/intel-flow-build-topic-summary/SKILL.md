---
name: arlive-intel-build-topic-summary
type: flow
trigger: called-by-op
description: >
  Aggregates recent coverage on a specific topic into a structured summary: current state, key
  players, recent developments, and open questions.
---

# arlive-intel-build-topic-summary

**Trigger:** Called by `arlive-intel-topic-deep-dive`
**Produces:** Multi-paragraph topic brief saved to vault/intel/02_topics/

## What it does

This flow gathers all relevant recent coverage on the requested topic from vault sources and any
newly fetched material, then synthesizes it into a structured brief. It identifies the key players
(individuals, organizations, governments) driving the story and their positions, surfaces the 3-5
most significant recent developments in chronological order, and notes where expert or source
perspectives diverge. The brief concludes with a list of open questions and signals to monitor so
the user knows what to watch for as the topic evolves.

## Steps

1. Read recent sources covering the topic from `vault/intel/` and fetch any new material
2. Identify key voices, players, and perspectives on the topic
3. Synthesize state of play into 3-5 paragraphs covering background, current status, and recent shifts
4. List open questions and developments to watch

## Apps

None

## Vault Output

`vault/intel/02_topics/`
