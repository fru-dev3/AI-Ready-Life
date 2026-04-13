---
name: arlive-brand-profile-audit
type: op
cadence: quarterly
description: >
  Quarterly audit of brand profile consistency across platforms (LinkedIn, Twitter/X, GitHub,
  YouTube, personal site). Checks bio, headshot, handle, URL, and bio text for drift from master
  profile. Triggers: "profile audit", "brand consistency", "update my profiles".
---

# arlive-brand-profile-audit

**Cadence:** Quarterly (January, April, July, October)
**Produces:** Profile consistency report, flagged discrepancies per platform, updated open-loops entries

## What it does

Reads the master brand profile from vault/brand/02_profiles/master-profile.md, which defines the
canonical bio text, headshot filename, handle format, website URL, and tagline. Then compares the
stored current-state profile snapshot for each platform (LinkedIn, Twitter/X, GitHub, YouTube,
personal site) against the master to identify any fields that have drifted — outdated bio, missing
URL, wrong headshot, handle inconsistency, or stale tagline. For each discrepancy found, calls the
flag-profile-inconsistency task to write a prioritized fix action to vault/brand/open-loops.md.
Writes a full audit summary to vault/brand/04_briefs/ with a per-platform status table (green / needs
update) so the user has a clear picture of brand consistency across all channels.

## Configuration

Maintain vault/brand/02_profiles/master-profile.md as the single source of truth for brand identity
fields. Store per-platform snapshots (last known profile state) in vault/brand/02_profiles/{platform}.md.

## Calls

- **Flows:** `arlive-brand-check-profile-consistency`
- **Tasks:** `arlive-brand-flag-profile-inconsistency`, `arlive-brand-update-open-loops`

## Apps

None

## Vault Output

`vault/brand/04_briefs/profile-audit-{quarter}-{year}.md`
