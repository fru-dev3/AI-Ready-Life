---
type: task
trigger: user-or-flow
description: >
  Versioned snapshot of resume + LinkedIn profile copied to 01_prior/snapshots/{YYYY-MM-DD}/.
  Lets the user diff over time, recover a prior version after a bad edit, and review how the
  story has evolved across years. Runs after major edits and on a quarterly cadence regardless.
---

# career-snapshot-resume-linkedin

**Trigger phrases:**
- "snapshot my resume"
- "back up my resume and linkedin"
- "save current versions"
- "version my profile"

**Cadence:** Quarterly automatic; user-triggered before any major edit; called by `op-performance-review-prep` after the resume-update flag fires.

## What It Does

Saves a dated copy of:
- `vault/career/00_current/resume.md` (and any `resume.pdf` / `resume.docx` siblings)
- `vault/career/00_current/linkedin-profile.md` (the stored markdown export of headline, about, experience, education, skills, recommendations)

into `vault/career/01_prior/snapshots/YYYY-MM-DD/`. Each snapshot folder gets a `manifest.md` that records: snapshot date, trigger reason, and a diff summary vs. the most recent prior snapshot (added bullets, removed bullets, edited bullets, moved items).

**Diff summary** is a section-level diff, not a character-level one. The point is "what story changed" not "what punctuation moved." For each major section, lines added, lines removed, lines edited (>30% change in tokens).

**Retention:** keep all snapshots for 24 months, monthly summary thereafter (1 snapshot per month from 24 months ago back to inception).

## Steps

1. Determine source files present in `vault/career/00_current/`: resume.md, resume.pdf, resume.docx, linkedin-profile.md.
2. Create snapshot folder `vault/career/01_prior/snapshots/YYYY-MM-DD/`.
3. Copy each source file into the snapshot folder.
4. Read the most recent prior snapshot; compute section-level diff for resume.md and linkedin-profile.md.
5. Write `manifest.md` with: timestamp, trigger reason, file list, diff summary.
6. Apply retention rule: prune mid-month snapshots beyond the 24-month window.
7. Return: snapshot path, diff summary headline (e.g., "+2 bullets, -1 bullet, 3 edited").

## Configuration

`vault/career/config.md`:
- `snapshot_retention_months_full` (default 24)
- `snapshot_retention_months_compressed` (after compression: 1 per month indefinitely)

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/career/00_current/resume.*`, `linkedin-profile.md`, prior snapshots
- Writes: `~/Documents/aireadylife/vault/career/01_prior/snapshots/YYYY-MM-DD/`
