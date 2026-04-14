---
name: aireadylife-intel-op-source-scan
type: op
cadence: weekly
description: >
  Weekly source health audit. Checks all configured sources for availability, quality,
  and relevance. Flags stale or low-quality sources and suggests replacements.
  Triggers: "source scan", "audit sources", "source health", "check my news sources".
---

# aireadylife-intel-source-scan

**Cadence:** Weekly (Sunday)
**Produces:** Source health report — stale or low-quality source flags with replacement suggestions

## What it does

Audits the full source list in vault/intel/sources/. Checks each source for: availability (HTTP status), recent activity (last published date), signal-to-noise ratio (useful articles vs. filler), and coverage gaps (topics with no active source). Flags sources that are paywalled, inactive, or low-quality. Suggests alternatives for flagged sources. Outputs a source health report.

## Configuration

Source list lives at `vault/intel/sources/source-list.md`. Add, remove, or adjust source categories there.

## Calls

- **Flows:** `aireadylife-intel-check-source-availability`, `aireadylife-intel-assess-source-quality`
- **Tasks:** `aireadylife-intel-update-source-list`

## Apps

`brave-search` (for finding source replacements), `port` (for checking source availability)

## Vault Output

`vault/intel/sources/YYYY-MM-DD-source-health.md`
