---
name: aireadylife-brand-task-flag-profile-inconsistency
type: task
description: >
  Writes a flag to vault/brand/open-loops.md when a platform profile field diverges from the
  master brand profile. Records platform, field, current value, expected value, and fix action.
---

# aireadylife-brand-flag-profile-inconsistency

**Trigger:** Called by `aireadylife-brand-profile-audit` when a discrepancy is found
**Produces:** Per-discrepancy flag entry in vault/brand/open-loops.md

## What it does

Receives a discrepancy record from the profile-audit op or check-profile-consistency flow and
writes a structured flag to vault/brand/open-loops.md for each inconsistency. Each flag entry
records the platform where the inconsistency was found (e.g. LinkedIn, Twitter/X, GitHub), the
specific field that is wrong (e.g. "bio", "website URL", "headshot"), the current value on the
platform, the expected value from the master profile, and a plain-language fix action (e.g.
"Update LinkedIn bio from 'Software engineer' to current tagline"). Flags profile fields that
affect SEO or discoverability (bio, URL, handle) as 🟡 watch, and flags missing URLs or wrong
contact info as 🔴 urgent. Purely cosmetic inconsistencies (minor bio wording variations) are
logged as 🟢 info. Checks for an existing unresolved flag for the same platform-field combination
before writing to avoid duplicates.

## Configuration

No special configuration required. Works from the discrepancy data passed by the calling op.

## Apps

None

## Vault Output

`vault/brand/open-loops.md`
