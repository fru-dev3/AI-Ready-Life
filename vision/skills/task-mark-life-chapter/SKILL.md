---
type: task
trigger: user-facing
description: >
  Tags the user's current life chapter (e.g., "early career", "young parent", "empty nest",
  "second act"). The chapter informs which paragon benchmarks apply and which v2 skills
  are surfaced. Optional but useful at major-transition moments.
---

# vision-mark-life-chapter

**Trigger phrases:**
- "set life chapter"
- "I'm entering [chapter]"
- "update life chapter"
- "life stage"

**Trigger:** User-facing only. Typically updated at a major transition (new parent, career pivot, retirement, kids leaving home).

## What It Does

Stores the user's chosen life-chapter tag as a single string in `00_current/life-chapter.md`, with a short description and the date the chapter began. Other plugins read this tag to gate situation-specific skills (e.g., `op-medicare-planning` only applies once the chapter is `pre-retirement` or later).

The chapter is user-defined. The skill suggests common tags but does not enforce a closed list, since users in non-standard arcs (career break, sabbatical, recovery, caregiver) need the freedom to name their own chapter.

Chapter changes are versioned: the prior chapter is moved to `01_prior/life-chapter-history.md` so a long-arc retrospective can reconstruct the user's timeline.

## Steps

1. Read existing `~/Documents/aireadylife/vault/vision/00_current/life-chapter.md` if present.
2. Show the user the current tag and offer common options (early-career, building, young-parent, mid-career, empty-nest, pre-retirement, second-act, sabbatical, caregiver) — but allow any custom string.
3. Capture: chapter tag, started-on date, optional 2–3 sentence note describing what this chapter is about.
4. If updating, append the prior chapter to `01_prior/life-chapter-history.md` with start and end dates.
5. Write the new chapter to `00_current/life-chapter.md`.
6. Note in `open-loops.md` that v2 skills gated on the new chapter may need configuration review.

## Output Format

`00_current/life-chapter.md`:
```
---
chapter: [tag]
started: YYYY-MM-DD
---

# Life Chapter: [tag]

[Optional 2-3 sentence note]
```

## Configuration

None required. Other plugins read `vault/vision/00_current/life-chapter.md` to gate their own behavior.

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/vision/00_current/life-chapter.md`
- Writes: `~/Documents/aireadylife/vault/vision/00_current/life-chapter.md`, `~/Documents/aireadylife/vault/vision/01_prior/life-chapter-history.md`
