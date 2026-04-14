---
name: aireadylife-learning-flow-build-reading-summary
type: flow
trigger: called-by-op
description: >
  Summarizes reading list progress: books read YTD, currently reading with completion percentage,
  next up, and annual goal pace.
---

# aireadylife-learning-build-reading-summary

**Trigger:** Called by `aireadylife-learning-progress-review`
**Produces:** Reading summary with YTD count, current pace, and projected year-end total

## What it does

This flow reads the vault's reading list and completion log to build a concise reading progress
summary. It counts books completed year-to-date, identifies what is currently being read and how
far along it is, and calculates the current reading pace (books per month) against the annual book
goal. If the current pace projects to finishing above or below the annual goal, it shows the
gap and what monthly pace is needed to hit the target. The next 2-3 queued books are listed so
the reading queue is visible without hunting through the vault.

## Steps

1. Read reading list and status records from `vault/learning/01_reading/`
2. Count books completed YTD from `vault/learning/02_completed/` where type is "book"
3. Calculate current reading pace (books completed / months elapsed this year)
4. Compare pace to annual book goal; project year-end total at current pace
5. Identify currently-reading item with percentage complete and next-up items

## Apps

None

## Vault Output

`vault/learning/01_reading/`
