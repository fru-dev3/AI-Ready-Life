---
name: arlive-estate-op-tenant-review
type: op
cadence: monthly
description: >
  Monthly tenant review; checks lease expiration dates, rent payment status,
  security deposit tracking, and renewal/vacancy planning. Flags leases expiring
  within 90 days requiring renewal outreach.
  Triggers: "tenant review", "lease review", "rent status", "tenant update".
---

# arlive-estate-tenant-review

**Cadence:** Monthly (1st of month)
**Produces:** A tenant status report in `vault/estate/01_tenants/` with lease timelines, payment status, and renewal/vacancy flags in open loops.

## What it does

Reviews the complete tenant picture across all rental properties monthly. Reads tenant records from `vault/estate/01_tenants/` and checks each tenancy against four key dimensions. Lease timeline: flags any lease expiring within 90 days (requires renewal outreach to begin) and within 30 days (requires immediate decision on renewal or vacancy prep). Rent payment status: checks logged rent payment records for any late payments (>5 days past due date) or missed months, flags patterns of repeated lateness. Security deposit tracking: verifies the held deposit amount matches the lease agreement for each property, flags any missing or mismatched deposits. Renewal/vacancy planning: for leases expiring within 90 days, prompts a renewal vs. vacancy decision based on current rental market conditions and tenant payment history. For known vacancies, tracks days vacant and flags if a property has been vacant more than 30 days without a signed lease. Updates open loops with any tenant issues requiring follow-up action.

## Calls

- **Flows:** `arlive-estate-build-portfolio-summary`
- **Tasks:** `arlive-estate-update-open-loops`

## Apps

vault file system

## Vault Output

`vault/estate/01_tenants/`
