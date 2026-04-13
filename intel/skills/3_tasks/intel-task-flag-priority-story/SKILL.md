---
name: arlive-intel-flag-priority-story
type: task
description: >
  Writes a flag to vault/intel/open-loops.md when a story on a configured priority topic appears
  from a high-credibility source, with headline, source, summary, why it matters, and action needed.
---

# arlive-intel-flag-priority-story

**Trigger:** Called by intel digest and briefing flows
**Produces:** Priority story flag in `vault/intel/open-loops.md`

## What it does

This task fires when a story on a top-priority topic appears from a source with a high credibility
rating during the digest build process. The flag captures the full context needed to decide what
to do with the story: headline, source name and credibility tier, publication date, a 2-3 sentence
summary, an explanation of why this particular story matters (new development, significant source,
contradicts prior reporting), and a suggested action (read in full, share, monitor for follow-up,
or take a specific action if the story involves a financial or personal decision trigger). Flags
are resolved once the action has been taken.

## Apps

None

## Vault Output

`vault/intel/open-loops.md`
