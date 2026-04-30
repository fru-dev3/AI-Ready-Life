---
type: task
trigger: user-or-flow
description: >
  Lints filenames in 00_current/ (and the configured Drive folder, if connected) against the
  convention YYYY-MM-DD_Source-Type-Description.ext. Reports violations and proposes a
  rename plan; only renames files after the user confirms. Closes the paragon non-negotiable
  "naming convention 100% applied."
---

# records-rename-to-convention

**Cadence:** Quarterly (called by `op-document-audit`) or on-demand.
**Produces:** Rename plan at `00_current/rename-plan-YYYY-MM-DD.md`; executes only on user approval.

## What It Does

The convention is `YYYY-MM-DD_Source-Type-Description.ext`:
- `YYYY-MM-DD` — issue or statement date
- `Source` — issuer slug (DMV, IRS, USAA, Vanguard, etc.)
- `Type` — document type slug (Passport, License, 1099, Policy, Statement, etc.)
- `Description` — short human-readable detail (holder initials, account last-4, period)

The task scans every file in `00_current/` (and the configured Drive folder, if `app-gdrive` or the native Drive connector is present), parses the existing name, and proposes a corrected name when the parts can be inferred from the document record metadata or filename heuristics. Files that cannot be corrected automatically (no parseable date, ambiguous source) are flagged for manual rename.

Renames are never applied silently. The task writes a rename plan, presents it to the user, and only executes after explicit confirmation. After execution, references in `INDEX.md` and per-document records are updated to point at the new filenames.

## Steps

1. Enumerate files in `00_current/` and configured Drive folder.
2. Parse each filename; classify as compliant, fixable, or manual-required.
3. For fixable files, derive corrected name from document-record metadata when available, otherwise from filename heuristics.
4. Write `00_current/rename-plan-YYYY-MM-DD.md` with three sections: compliant, proposed renames, manual-required.
5. Present plan; on user approval, execute renames and update cross-references.
6. Re-run `task-build-vault-index` to refresh `INDEX.md`.

## Configuration

`~/Documents/aireadylife/vault/records/config.md`:
- `naming_source_aliases` — map of issuer aliases (e.g., "Internal Revenue Service" → "IRS")
- `naming_apply_to_drive` (default true if Drive is connected)

## Vault Paths

- Reads / writes: `~/Documents/aireadylife/vault/records/00_current/`
- Writes: `~/Documents/aireadylife/vault/records/00_current/rename-plan-YYYY-MM-DD.md`
