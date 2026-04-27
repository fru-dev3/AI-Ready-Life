---
type: task
trigger: user-facing
description: >
  On-demand "is this aligned with my vision and values?" filter for major decisions
  (job change, relocation, large purchase, relationship commitment). Reads the life
  vision doc, values statement, and current OKRs, then returns yes / no / conditional
  with rationale.
---

# vision-decision-alignment-check

**Trigger phrases:**
- "should I take this job"
- "is this aligned"
- "alignment check"
- "decision check"
- "does this fit my vision"

**Trigger:** User-facing only; never called automatically.

## What It Does

Given a major-decision prompt from the user (one of: job change, relocation, large purchase, relationship commitment, business commitment, major time commitment), returns a structured alignment assessment.

Pulls three sources: the current life vision doc (`00_current/life-vision.md`), the values statement (`00_current/values.md`), and the active quarterly OKRs (`00_current/`). For each source, surfaces specific lines that the decision either supports, contradicts, or is silent on.

Output is a single decision (yes / no / conditional) with rationale tied to specific lines from the user's own writing. The skill does not pretend to know the right answer — it shows the user what their own stated vision and values say, so the user can decide with their eyes open.

## Steps

1. Capture the decision: a one-sentence summary plus key facts (cost, time, scope, irreversibility).
2. Read `~/Documents/aireadylife/vault/vision/00_current/life-vision.md`. If missing, prompt user to run `task-update-life-vision` first.
3. Read `~/Documents/aireadylife/vault/vision/00_current/values.md`. If missing, prompt user to run `task-update-values-statement` first.
4. Read current quarterly OKRs from `~/Documents/aireadylife/vault/vision/00_current/`.
5. Score the decision against each source:
   - Vision: which horizon and which domain does this advance / block / not affect?
   - Values: which named values does this honor / violate / not touch?
   - OKRs: does this accelerate, distract from, or not affect the active OKRs?
6. Return one of: ALIGNED, MISALIGNED, CONDITIONAL (with named conditions).
7. Save the assessment to `02_briefs/decision-{YYYY-MM-DD}-{slug}.md` for future reference.

## Output Format

```
# Decision: [Summary]
Date: YYYY-MM-DD
Verdict: ALIGNED | MISALIGNED | CONDITIONAL

## Vision check
[Horizon + domain references with quoted lines]

## Values check
[Named values honored / violated]

## OKR check
[Accelerates / distracts / neutral]

## Rationale
[2-4 sentences synthesizing above]

## Conditions (if CONDITIONAL)
- [Condition 1]
- [Condition 2]
```

## Configuration

None required beyond a populated life vision and values statement.

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/vision/00_current/life-vision.md`, `values.md`, current OKRs
- Writes: `~/Documents/aireadylife/vault/vision/02_briefs/decision-YYYY-MM-DD-{slug}.md`
