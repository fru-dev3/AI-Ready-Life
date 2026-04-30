---
type: op
cadence: annual
trigger: user-facing
description: >
  Backward-looking annual reflection (Dec / Jan). Walks through the year's wins, losses,
  biggest changes, surprises, what worked, what didn't, and the lessons carried forward.
  Distinct from op-annual-review which is forward-looking goal setting; this looks back.
  Triggers: "year in review", "year recap", "looking back", "year reflection".
---

# vision-year-in-review

**Cadence:** Annual (December or early January).
**Produces:** Reflection document at `~/Documents/aireadylife/vault/vision/01_prior/YYYY-year-in-review.md`.

## What It Does

The retrospective companion to `op-annual-review`. Where annual review focuses on numbers, OKR completion, and next-year planning, year-in-review is the human story: what actually happened, what mattered, what surprised, what hurt, what was learned.

Most years, people remember the last six weeks. The milestone log and monthly scorecards are the antidote — feeding the user's own year back to them in chronological order so the full arc becomes visible before reflection begins.

Output is a single narrative document the user can re-read in future years. It is also the seed input that informs `task-set-theme-of-year` for the new year.

## Triggers

- "year in review"
- "year recap"
- "looking back at the year"
- "year reflection"
- "what happened this year"

## Steps

1. Verify vault and config are present.
2. Call `flow-cross-domain-vision-pull` for full-year domain summaries.
3. Read all monthly scorecards from the year (vault/vision/00_current/ and 01_prior/ as needed).
4. Read `vault/vision/00_current/milestones.md`; group all year's milestones by quarter and domain.
5. Walk the user through the structured prompts:
   - Three biggest wins.
   - Three biggest losses or disappointments.
   - One change that surprised you.
   - One lesson carried forward.
   - One thing you would do differently.
   - Who or what mattered most.
6. Capture freeform reflection per prompt; do not push for tidy answers.
7. Assemble the document.
8. Write to `01_prior/YYYY-year-in-review.md`.
9. Recommend running `task-set-theme-of-year` and `op-annual-review` after a sleep cycle.

## Output Format

```
# Year in Review — YYYY

## Milestones
[Chronological list grouped by quarter]

## Three Wins
1. ...
2. ...
3. ...

## Three Losses / Disappointments
...

## The Surprise
...

## Lesson Carried Forward
...

## What I'd Do Differently
...

## Who and What Mattered Most
...

## Cross-Domain Snapshot
[Per-domain one-line state from flow-cross-domain-vision-pull]
```

## Configuration

None required beyond a populated milestones log and monthly scorecards.

## Vault Paths

- Reads: monthly scorecards, `00_current/milestones.md`, all domain vaults via flow.
- Writes: `~/Documents/aireadylife/vault/vision/01_prior/YYYY-year-in-review.md`.
