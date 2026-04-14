---
name: aireadylife-brand-flow-analyze-mentions
type: flow
trigger: called-by-op
description: >
  Scans recent brand mentions for sentiment, source type, and context. Flags mentions needing a
  response and surfaces notable sources.
---

# aireadylife-brand-analyze-mentions

**Trigger:** Called by `aireadylife-brand-monthly-synthesis`
**Produces:** Mention analysis report with sentiment breakdown, notable source callouts, and response-needed flags

## What it does

Reads the mention log from vault/brand/01_mentions/ where all logged brand mentions are stored with
platform, author, date, content summary, and sentiment pre-classification from when they were
logged. Aggregates mentions by sentiment category (positive, neutral, negative) and calculates the
sentiment distribution for the period. Identifies notable sources — defined as journalists,
publications, accounts with high follower counts, or accounts from target industries — and flags
them separately for the user's attention. Scans for any mentions that are negative or neutral and
have not been marked as "responded" to surface response opportunities before they age out.
Identifies patterns in mention context (what topics drive mentions, which platforms generate the
most discussion) to help the user understand what content and actions drive brand visibility.
Returns the full analysis to the calling op for embedding in the monthly brief.

## Configuration

Mentions must be logged via the log-mention task to vault/brand/01_mentions/ with consistent
fields. Set a "notable source threshold" (follower count or source type list) in
vault/brand/01_mentions/config.md to control what triggers a high-priority flag.

## Steps

1. Read mention log from vault/brand/01_mentions/ for the current period
2. Classify by sentiment (positive / neutral / negative) and calculate distribution
3. Identify notable sources based on configured threshold; flag for immediate review
4. Flag unresponded negative and neutral mentions that are still within the response window

## Apps

None

## Vault Output

`vault/brand/01_mentions/`
