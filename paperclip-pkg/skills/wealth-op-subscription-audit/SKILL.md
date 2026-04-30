---
type: op
trigger: user-facing
description: >
  Annual recurring-charge review. Lists every detected subscription with monthly cost,
  last-charged date, last-used signal where available, and a cancel-or-keep recommendation.
  Reads subscription data from records plugin (if installed) or detects directly from
  cash-flow transaction stream. Universal — most adults have $50–$500/month of stale
  subscriptions.
---

# wealth-subscription-audit

**Trigger phrases:**
- "subscription audit"
- "what am I paying for"
- "find subscriptions to cancel"
- "annual subscription review"
- "where is my money going monthly"

**Cadence:** Annual; on-demand on user request.

## What It Does

Compiles a complete subscription roster, sorts by cost, and flags candidates for cancellation.

**Sources (in preference order):**
1. Records plugin's `task-detect-subscriptions-from-email` output at `vault/records/00_current/subscriptions.md` (if records plugin is installed)
2. Direct detection from transaction stream — recurring charges with consistent merchant + amount + ~monthly cadence
3. Manually maintained subscription list at `vault/wealth/00_current/subscriptions.md`

**For each subscription:**
- Monthly cost (annualized total)
- First-charged date and last-charged date
- Cadence (monthly, quarterly, annual)
- Category (entertainment, software, fitness, news/media, utilities, other)
- Last-used signal where available (login activity, app open recency — usually unknown without manual annotation)
- Recommendation: KEEP, REVIEW (low usage / forgotten), or CANCEL (clear waste)

**Output:** Markdown brief at `vault/wealth/02_briefs/YYYY-subscription-audit.md` with sortable table, total monthly + annual spend, and cancellation candidate list.

## Steps

1. Pull subscription roster from records plugin if available; fall back to direct transaction detection
2. Annotate with category, cadence, last-charged date
3. Compute monthly + annual total
4. Apply heuristics for REVIEW/CANCEL recommendations: services with overlapping function (e.g., 3 streaming platforms), services last-charged but never logged as used, free-trial conversions
5. Write brief
6. Surface flagged cancel candidates to open-loops

## Vault Paths

- Reads: `vault/records/00_current/subscriptions.md` (if records plugin is installed); `vault/wealth/00_current/` transaction records; `vault/wealth/00_current/subscriptions.md` (manual roster)
- Writes: `vault/wealth/02_briefs/YYYY-subscription-audit.md`
- Updates: `vault/wealth/open-loops.md` for cancel candidates
