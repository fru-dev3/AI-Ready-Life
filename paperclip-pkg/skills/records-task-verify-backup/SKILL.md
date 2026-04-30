---
type: task
trigger: user-or-flow
description: >
  Monthly check that critical-document backups are current. Verifies cloud-sync timestamps
  for the configured backup target, confirms an offsite copy exists for legal documents, and
  records the verification in 00_current/backup-verification-log.md.
---

# records-verify-backup

**Cadence:** Monthly (called by `op-monthly-sync`) and on-demand.
**Produces:** Append entry to `~/Documents/aireadylife/vault/records/00_current/backup-verification-log.md`.

## What It Does

A backup that hasn't been verified is a hope, not a backup. This task runs three checks:

1. **Primary cloud sync freshness** — the configured cloud target (iCloud Drive, Google Drive, Dropbox, OneDrive) shows a sync timestamp within the last 24 hours for the vault folder. Stale sync (>72h) is flagged.
2. **Offsite legal-document copy** — confirms that at least one of the legal documents (will, POA, healthcare directive, trust) is mirrored to a configured offsite location: a second cloud provider, an attorney's portal, a fireproof safe with last-verified date, or a trusted family member's hands. The plugin does not move files — it just confirms the user-recorded offsite copy exists and was verified within the configured window.
3. **Encrypted-archive integrity (optional)** — if the user maintains an encrypted local archive (e.g., a `.zip` under password, a Time Machine snapshot, an encrypted external drive), the task records the most recent verification date. The user runs the integrity check; the task logs the result.

Each verification is appended (never overwritten) to `00_current/backup-verification-log.md` with a date, target, status, and any flags. Stale or failed checks raise an entry in `open-loops.md`.

## Steps

1. Read `backup_targets` from config.
2. For each cloud target, read the sync timestamp via the OS / connector and compare to threshold.
3. For offsite legal copies, read user-recorded last-verified date; flag if stale.
4. For encrypted archives, prompt the user to run integrity check and report the result.
5. Append a new row to `00_current/backup-verification-log.md`.
6. Surface any stale or failed check to `task-update-open-loops`.

## Configuration

`~/Documents/aireadylife/vault/records/config.md`:
- `backup_targets` — list of (name, type, path, freshness_threshold_hours)
- `offsite_legal_copies` — list of (document, location, last_verified)
- `encrypted_archive_enabled` (default false)

## Vault Paths

- Writes: `~/Documents/aireadylife/vault/records/00_current/backup-verification-log.md`
- Writes via task: `~/Documents/aireadylife/vault/records/open-loops.md`
