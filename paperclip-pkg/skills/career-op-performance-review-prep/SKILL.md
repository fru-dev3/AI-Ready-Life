---
type: op
cadence: annual-or-semiannual
description: >
  Pulls every captured achievement from the review period, drafts a self-evaluation narrative
  organized by company-stated review competencies (or sensible defaults if none configured),
  and flags which accomplishments belong on the resume + LinkedIn. Replaces blank-page paralysis
  the day the form opens. Triggers: "performance review prep", "self-eval", "review packet",
  "my self-review is due", "draft my self-evaluation".
---

# career-performance-review-prep

**Cadence:** Per review cycle (typically annual or semiannual); user-triggered when the form opens.

## What It Does

Most performance reviews fail not on substance but on retrieval — the user has done the work but can't reconstruct it under deadline. This op solves retrieval and drafting in one pass.

**What it produces:**

1. **Achievement timeline** — every entry from `vault/career/00_current/achievements.md` filtered to the review period (configurable, typically Jan 1 – Dec 31 or Jul 1 – Jun 30), grouped by category and quantified-impact magnitude.

2. **Self-eval narrative organized by review competency** — reads competency / dimension list from `vault/career/config.md` (e.g., "delivery", "scope", "leadership", "craft", "collaboration", or whatever the company uses) and assigns 1-3 best-fit achievements per competency. For each assignment, drafts 3-5 sentences in first-person STAR form. The user edits, doesn't start blank.

3. **Promotion signal check** — if the user is configured `targeting_promotion: true`, runs an extra pass: which dimensions would an above-bar packet need to demonstrate, and is there enough evidence in the achievement log to argue them? If gaps exist, flag them while there's still time to engineer visibility.

4. **Resume / LinkedIn refresh recommendation** — picks the top 3-5 achievements (by impact and external defensibility) and flags them as "should appear on resume" and "should appear on LinkedIn About / Experience." Cross-checks against current resume; flags any that are missing.

5. **Calibration prep** — drafts 2-3 talking points for the live calibration / 1:1 conversation: biggest contribution, what changed about scope or impact this cycle, and one question to ask manager about feedback or growth direction.

## Triggers

- "performance review prep"
- "self-eval prep"
- "draft my self-review"
- "review packet"
- "my review is due"
- "annual review prep"

## Steps

1. Read review-period dates and competency list from `vault/career/config.md`.
2. Read all achievements in `vault/career/00_current/achievements.md` within the review period.
3. Group achievements by category + impact magnitude; build the timeline.
4. For each competency, rank candidate achievements; select top 1-3; draft a 3-5 sentence STAR-form narrative for each.
5. If `targeting_promotion: true`, run the gap-vs-next-level analysis (calls `flow-build-skills-gap-summary` against the JD for the next level, scoped to the dimensions on the review form).
6. Pick top 3-5 achievements by impact for resume/LinkedIn flag; diff against current resume to identify missing.
7. Draft 2-3 calibration-conversation talking points.
8. Write packet to `vault/career/02_briefs/YYYY-{H1|H2}-review-prep.md`.
9. Call `task-update-open-loops` with: form-due reminder, resume-update flag, LinkedIn-update flag.

## Configuration

`vault/career/config.md`:
- `review_period_start`, `review_period_end`
- `review_competencies` (list — falls back to default 5 if blank)
- `targeting_promotion` (bool)
- `next_level_jd_path` (optional — path to a captured JD for the next level)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/career/00_current/achievements.md`, `resume.md`, `linkedin-profile.md`, `vault/career/config.md`
- Writes: `~/Documents/aireadylife/vault/career/02_briefs/YYYY-{H1|H2}-review-prep.md`, `open-loops.md`
