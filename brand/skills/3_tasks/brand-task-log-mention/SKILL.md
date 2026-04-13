---
name: arlive-brand-log-mention
type: task
cadence: as-received
description: >
  Records a brand mention to vault/brand/01_mentions/ with platform, author, date, sentiment,
  content summary, and link. Flags high-priority mentions (journalist, viral potential) for
  immediate action.
---

# arlive-brand-log-mention

**Trigger:** Called when a brand mention is received or discovered, as-received
**Produces:** Mention log entry in vault/brand/01_mentions/ and an urgent flag in open-loops.md if high-priority

## What it does

Accepts a brand mention — either surfaced by the user or detected via a monitoring alert — and
logs it as a structured record in vault/brand/01_mentions/ with a date-stamped filename. Each
entry captures: platform where the mention appeared, author name and handle, date and time,
sentiment classification (positive / neutral / negative based on tone), a 2-3 sentence summary
of the mention content, and the direct link or URL to the original post. Applies a high-priority
check: if the author is a journalist, a publication, or an account with a follower count above
a configured threshold, or if the post already has significant engagement (indicating viral
potential), writes an immediate 🔴 urgent flag to vault/brand/open-loops.md with a recommended
response action and a 24-hour response window. Standard mentions are logged without an immediate
flag and will be analyzed in the next monthly synthesis run.

## Configuration

Set the high-priority follower threshold in vault/brand/01_mentions/config.md. Optionally
maintain a list of known journalist and publication handles in the same file for auto-flagging.

## Apps

None

## Vault Output

`vault/brand/01_mentions/`
