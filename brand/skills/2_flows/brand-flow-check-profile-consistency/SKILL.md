---
name: arlive-brand-flow-check-profile-consistency
type: flow
trigger: called-by-op
description: >
  Compares brand profile elements (bio, headshot, handle, URL) across all platforms to the master
  brand profile and flags any discrepancies.
---

# arlive-brand-check-profile-consistency

**Trigger:** Called by `arlive-brand-profile-audit`
**Produces:** Per-platform consistency check results with specific discrepancy details for each field that has drifted

## What it does

Reads the master brand profile from vault/brand/02_profiles/master-profile.md, which is the
canonical reference for all brand identity fields: bio text (short and long forms), headshot
filename, Twitter/X handle, LinkedIn vanity URL, GitHub username, website URL, and current tagline.
Then reads each platform's current-state snapshot from vault/brand/02_profiles/{platform}.md and
performs a field-by-field comparison. For each field that differs from the master, records the
platform name, field name, current value on the platform, expected value from master, and a simple
recommended action (e.g. "Update LinkedIn bio to current version"). Returns the full discrepancy
list to the calling op. Treats missing platform snapshot files as "unknown — manual verification
needed" rather than treating them as consistent, to avoid false positives.

## Configuration

Requires vault/brand/02_profiles/master-profile.md to be maintained with current canonical values.
Platform snapshots in vault/brand/02_profiles/{platform}.md should be updated after each manual
profile update so the next audit has accurate baselines.

## Steps

1. Read master brand profile from vault/brand/02_profiles/master-profile.md
2. List all platform snapshot files in vault/brand/02_profiles/
3. For each platform, compare each field to master; record discrepancies with current vs expected values
4. Flag missing platform snapshots as "needs manual verification"

## Apps

None

## Vault Output

`vault/brand/02_profiles/`
