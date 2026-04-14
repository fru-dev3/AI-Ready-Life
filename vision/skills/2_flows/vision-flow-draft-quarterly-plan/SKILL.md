---
name: arlive-vision-flow-draft-quarterly-plan
type: flow
trigger: called-by-op
description: >
  Drafts next quarter's OKRs based on current domain scores, open milestones,
  and life vision priorities. Identifies 3-5 priority domains and proposes 2-3
  key results per domain.
---

# arlive-vision-draft-quarterly-plan

**Trigger:** Called by `arlive-vision-quarterly-planning`, `arlive-vision-annual-review`
**Produces:** A draft quarterly OKR plan written to `vault/vision/01_okrs/` for review and refinement.

## What it does

Synthesizes the life vision document, current domain scores, and open milestone backlog to draft a focused set of OKRs for the upcoming quarter. Starts by reading the life vision document from `vault/vision/00_goals/` to anchor planning in the 3-5 year picture rather than just reacting to recent performance. Reads the most recent monthly scorecard to identify which domains have declining scores (most in need of intentional attention) and which have strong momentum (candidate for continued investment). Reads open milestone items from `vault/vision/00_goals/` to identify commitments that were planned for prior quarters but not completed. From these inputs, selects 3-5 priority domains for the quarter — typically a mix of domains needing recovery attention and domains where a focused push can create meaningful progress toward the vision. For each priority domain, proposes 2-3 key results that are specific, measurable, time-bound, and achievable within the quarter. Key results are drafted with concrete targets (not vague goals) and linked to the specific vault metric that will be used to measure completion. Writes the draft plan to `vault/vision/01_okrs/YYYY-QN-draft-okrs.md` for review — it's a starting point for the quarterly planning conversation, not a final document. Returns the draft to the calling op with a note on the selection rationale for each priority domain.

## Steps

1. Read life vision document from `vault/vision/00_goals/` for 3-5 year context
2. Read most recent monthly scorecard from `vault/vision/02_scorecard/` for domain scores and trends
3. Read open milestone backlog from `vault/vision/00_goals/` for carry-forward items
4. Select 3-5 priority domains based on: declining score, vision alignment, and carry-forward milestone weight
5. For each priority domain, draft 2-3 specific, measurable key results with concrete targets
6. Link each key result to the vault metric or artifact that will verify completion
7. Write draft OKR plan to `vault/vision/01_okrs/YYYY-QN-draft-okrs.md`
8. Return draft with selection rationale to calling op

## Apps

vault file system

## Vault Output

`vault/vision/01_okrs/`
