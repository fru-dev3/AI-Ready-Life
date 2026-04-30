---
type: task
trigger: user-or-flow
description: >
  Scans Gmail for receipts, policy documents, account confirmations, IRS letters, and other
  records-worthy attachments. Surfaces candidates that should be filed via task-log-document.
  Closes the "important documents stuck in email" gap. Uses the native Gmail connector when
  available; otherwise falls back to the IMAP / Gmail API path.
---

# records-ingest-from-gmail

**Cadence:** Weekly (or on-demand) — paragon non-negotiable is "no important document only in email for >7 days."
**Produces:** Candidate document list at `00_current/gmail-ingest-YYYY-MM-DD.md` and one `task-log-document` invitation per candidate.

## What It Does

Reads the user's Gmail inbox over a configurable lookback window (default 14 days) and identifies messages that contain records-worthy material: PDF/image attachments, receipt-shaped subject lines, account-confirmation patterns, IRS / state-tax letters, insurance policy declarations, medical EOBs, professional-license correspondence, and lease / mortgage / vehicle paperwork.

Each candidate is classified into a likely document category (identity, legal, financial, insurance, medical, vehicle, tax, professional, other) so the user can confirm the routing in `task-log-document`. The task does not auto-file — it surfaces. The user reviews the list and runs `task-log-document` per accepted candidate. Rejected candidates are recorded in `00_current/gmail-ingest-ignored.md` so they aren't re-flagged on the next run.

## Steps

1. Confirm Gmail connector is connected (native Claude Desktop connector preferred; fall back to OAuth if configured).
2. Query messages within the lookback window matching attachment + classifier filters.
3. For each message: extract sender, subject, date, attachment names, classifier tag.
4. Cross-check against `gmail-ingest-ignored.md` and skip already-rejected items.
5. Write candidate list to `00_current/gmail-ingest-YYYY-MM-DD.md`, sorted by classifier tag.
6. Present the list; for each accepted item, hand off to `task-log-document` with prefilled fields.

## Configuration

`~/Documents/aireadylife/vault/records/config.md`:
- `gmail_lookback_days` (default 14)
- `gmail_ingest_categories` (subset of: identity, legal, financial, insurance, medical, vehicle, tax, professional)

## Vault Paths

- Reads: Gmail (via connector)
- Writes: `~/Documents/aireadylife/vault/records/00_current/gmail-ingest-YYYY-MM-DD.md`
- Writes: `~/Documents/aireadylife/vault/records/00_current/gmail-ingest-ignored.md`
