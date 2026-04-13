---
name: arlive-insurance-flag-coverage-gap
type: task
description: >
  Writes a coverage gap flag to vault/insurance/open-loops.md with coverage type,
  current limit, recommended limit, estimated premium impact, and recommended action
  (increase coverage, add policy, or shop for better terms).
---

# arlive-insurance-flag-coverage-gap

**Produces:** A new coverage gap flag entry in `vault/insurance/open-loops.md`.

## What it does

Called by `arlive-insurance-coverage-audit` whenever the gap analysis identifies a meaningful coverage shortfall. Writes a structured flag entry to `vault/insurance/open-loops.md` that includes: the coverage type (life, disability, liability, umbrella, property), a description of the gap (current limit vs. recommended limit with the benchmark used to derive the recommendation), the severity rating (minor: <10% shortfall, moderate: 10-25% shortfall, significant: >25% shortfall or missing policy type), the estimated annual premium impact to close the gap (ballpark range from market averages), and the recommended action with specificity: "increase life insurance face value from $800K to $1.2M — contact existing carrier for increase, or shop term policy at 20-year horizon." Also includes the financial exposure calculation showing what the gap means in concrete terms — not just "you're underinsured" but "if disability occurs today, your LTD benefit covers $4,200/month vs. $6,000/month needed to cover essential expenses." Prevents duplicate flags for the same coverage type by checking for existing open loop entries before writing. Flags are updated (not duplicated) on subsequent audit runs if the gap persists but the numbers change.

## Apps

vault file system

## Vault Output

`vault/insurance/open-loops.md`
