---
name: arlive-learning-log-completion
type: task
cadence: as-completed
description: >
  Records a completed course, certification, or book to vault/learning/02_completed/ with title,
  type, date completed, key takeaways, and rating.
---

# arlive-learning-log-completion

**Cadence:** As-completed (when a course, certification, or book is finished)
**Produces:** Completion record in `vault/learning/02_completed/`

## What it does

This task creates a completion record each time a learning item is finished, building a searchable
archive of everything learned over time. Each record captures the title, item type (course,
certification, book, podcast series), completion date, 1-3 key takeaways that capture the most
valuable things learned, a personal rating (1-5), and any credential or certificate earned with
its ID or URL. These records feed into reading pace calculations, YTD learning counts, and the
quarterly goal review's assessment of what skills have actually been built.

## Apps

None

## Vault Output

`vault/learning/02_completed/`
