---
type: task
trigger: user-or-flow
description: >
  Builds a comprehensive inventory of every online account / login the user has, drawn from
  1Password, Gmail account-confirmation emails, and manual additions. Foundational for
  digital-legacy planning, breach response, and account cleanup. Reads metadata only —
  never reads passwords.
---

# records-build-account-inventory

**Cadence:** Quarterly (called by `op-document-audit`) and on-demand.
**Produces:** `~/Documents/aireadylife/vault/records/00_current/account-inventory.md`

## What It Does

Most adults have hundreds of online accounts spread across multiple password managers, browsers, and forgotten signups. Without an inventory, breach response is reactive and digital-legacy planning is impossible.

This task assembles the inventory from three sources, in priority order:
1. **1Password (or other password manager metadata)** — item titles, URLs, categories, last-modified date. Passwords are never read.
2. **Gmail account-confirmation emails** — "welcome to X" / "confirm your account" / "your X account is ready" patterns over a long lookback window.
3. **Manual additions** — accounts the user knows about that aren't in either source.

For each account it captures: service name, URL, account email, category (banking, brokerage, email, social, shopping, utility, work, other), criticality (critical / standard / low), 2FA status if known, and a notes field for legacy guidance ("transfer to spouse," "delete on death," "shared with family"). Critical accounts (primary email, banking, brokerage, employer) are highlighted at the top.

## Steps

1. List all items in the configured 1Password vault via `app-1password` (titles + URLs only, never passwords).
2. Query Gmail for account-confirmation patterns over a 5-year lookback.
3. Merge and de-duplicate by domain.
4. Read prior `account-inventory.md`; preserve manual notes and criticality tags.
5. Classify category and criticality using the rules in config.
6. Write `00_current/account-inventory.md` sorted by criticality desc, category asc, service name asc.
7. Surface accounts with no 2FA on critical services to `task-update-open-loops`.

## Configuration

`~/Documents/aireadylife/vault/records/config.md`:
- `account_inventory_sources` — list (1password, gmail, manual)
- `account_criticality_rules` — domain patterns mapped to critical / standard / low
- `account_inventory_lookback_years` (default 5)

## Vault Paths

- Reads: `app-1password` output, Gmail (via connector), prior inventory
- Writes: `~/Documents/aireadylife/vault/records/00_current/account-inventory.md`
