---
type: task
trigger: user-or-flow
description: >
  Maintains the lifetime-goals roster — things to do once, big or small (run a marathon,
  see northern lights, write a book, learn an instrument). Distinct from current-quarter
  OKRs. Read by flow-cross-domain-vision-pull and op-vision-snapshot.
---

# vision-update-bucket-list

**Trigger phrases:**
- "bucket list"
- "add to bucket list"
- "update bucket list"
- "lifetime goals"

**Trigger:** User-facing; also called when the annual review surfaces an item as completed.

## What It Does

Captures the user's running list of lifetime ambitions in one place, separate from the OKR system. Each item has: title, optional domain tag, status (active / planning / done / dropped), date added, date completed (if done), 1-line note.

The bucket list is intentionally aspirational and unbounded; the discipline is in keeping it current rather than letting it sprawl into a dead document. Active items can be promoted into a quarter's OKRs; completed items get a note in the year-in-review.

## Steps

1. Read `~/Documents/aireadylife/vault/vision/00_current/bucket-list.md`. If absent, create.
2. Apply the requested change:
   - **Add:** new item, default status `active`, today's date.
   - **Update status:** active → planning / done / dropped (capture completion date for done).
   - **Edit:** title or note.
   - **Delete:** archive the line into the file's bottom "removed" section rather than deleting.
3. Sort items by status (active first, then planning, then done at top of done section, then dropped).
4. Write the updated file.
5. If an item moved to `done`, optionally call `task-log-milestone` with the completion details.

## Output Format

```
# Bucket List

## Active
- [ ] [Title] — [domain] — added YYYY-MM-DD — [note]

## Planning
- [ ] [Title] — [domain] — added YYYY-MM-DD — [note]

## Done
- [x] [Title] — completed YYYY-MM-DD — [note]

## Dropped
- ~~[Title]~~ — dropped YYYY-MM-DD — [reason]
```

## Configuration

None required.

## Vault Paths

- Reads / writes: `~/Documents/aireadylife/vault/vision/00_current/bucket-list.md`
