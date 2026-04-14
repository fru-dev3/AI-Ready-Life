---
name: arlive-career-flow-review-pipeline
type: flow
trigger: called-by-op
description: >
  Reviews the active application pipeline, flags items requiring follow-up, and
  identifies stalled opportunities by stage and recency.
---

# arlive-career-review-pipeline

**Trigger:** Called by `arlive-career-monthly-sync`
**Produces:** Pipeline status report in vault/career/01_pipeline/ with follow-up flags and stalled opportunity alerts

## What it does

Reads all active pipeline entries from vault/career/01_pipeline/ — which tracks each opportunity with company, role, current stage, last contact date, next action, and contact name — and applies a set of staleness rules to surface anything that needs action. Applications with no response after 7 days since the last touchpoint are flagged as requiring follow-up with a suggested message angle (e.g., checking on timeline, referencing a recent company announcement). Opportunities that have been at the same stage for more than 14 days without a scheduled next step are flagged as stalled and marked for a decision: follow up aggressively, deprioritize, or archive. The flow also checks whether any "watch" stage items from the market scan have since closed or changed, and cleans up the pipeline accordingly.

## Steps

1. Read all active pipeline entries from vault/career/01_pipeline/
2. Flag applications with no response in more than 7 days as requiring follow-up
3. Flag opportunities at the same stage for more than 14 days as stalled
4. Suggest follow-up action for each flagged item
5. Check "watch" stage items for posting status changes and archive closed roles

## Apps

None

## Vault Output

`vault/career/01_pipeline/`
