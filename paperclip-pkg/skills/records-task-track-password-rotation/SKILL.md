---
type: task
trigger: user-or-flow
description: >
  Tracks password-rotation cadence for high-value accounts (primary email, banking, brokerage,
  work). Optional — many security experts now argue against routine rotation absent a breach,
  so this task is opt-in via config. When enabled, surfaces accounts overdue for rotation
  and accounts implicated in a known breach.
---

# records-track-password-rotation

**Cadence:** Quarterly (when enabled) and on-demand after any breach notice.
**Produces:** Append entry to `~/Documents/aireadylife/vault/records/00_current/password-rotation-log.md`; flags via `open-loops.md`.

## What It Does

Modern guidance (NIST SP 800-63B) discourages rotation on a fixed schedule absent a breach indicator. Some users, organizations, and high-risk accounts still benefit from a rotation discipline. This task is opt-in and respects that nuance.

When enabled, it tracks two signals:

1. **Time-since-last-rotation** for accounts the user has marked high-value (primary email, banking, brokerage, employer SSO, password-manager master). Default rotation cadence is `password_rotation_days` (default 365 — annual). Accounts overdue are listed for action.
2. **Breach-implicated accounts** — when a credential leak is reported (Have I Been Pwned, provider notification), the affected account is flagged for immediate rotation regardless of last-rotation date. Breach notifications are user-supplied or read from Gmail when a recognizable breach-notification pattern is detected.

The task never reads or writes passwords. It records only the rotation event timestamp + the source signal.

## Steps

1. If `password_rotation_enabled` is false, skip with a single-line note.
2. Read `00_current/account-inventory.md` for accounts tagged `rotate: true`.
3. Read prior `password-rotation-log.md` for last-rotation dates per account.
4. Compute days-since-rotation; flag overdue per cadence.
5. Read breach signals (user input or Gmail-detected breach notifications).
6. Write any overdue or breach-flagged account to `task-update-open-loops`.
7. After the user rotates a password, log the event (date, account, source: routine / breach) — never the password itself.

## Configuration

`~/Documents/aireadylife/vault/records/config.md`:
- `password_rotation_enabled` (default false — opt-in)
- `password_rotation_days` (default 365)
- `password_rotation_critical_accounts` — list of accounts that must be rotated regardless of NIST guidance

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/records/00_current/account-inventory.md`
- Writes: `~/Documents/aireadylife/vault/records/00_current/password-rotation-log.md`
- Writes via task: `~/Documents/aireadylife/vault/records/open-loops.md`
