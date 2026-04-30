---
type: task
trigger: user-or-flow
description: >
  Generates 00_current/INDEX.md — the canonical written index of every document in the vault
  with category, holder, expiration, physical and digital storage locations, and which
  domain agents depend on it. Closes the paragon non-negotiable: "vault index exists and is
  current."
---

# records-build-vault-index

**Cadence:** Monthly (called by `op-monthly-sync`) and on-demand after large document additions.
**Produces:** `~/Documents/aireadylife/vault/records/00_current/INDEX.md`

## What It Does

Walks every document record in `00_current/` (and any configured subfolders) and produces a single human-readable index. The index is grouped by category — Identity, Legal, Financial, Insurance, Medical, Vehicle, Tax, Professional, Other — and within each category sorted by holder, then by expiration date ascending.

Each index row captures: document type, holder, expiration (or "no-expire" with last-reviewed date), physical storage location, digital storage location, and a comma-separated list of dependent domain agents (e.g., a passport row notes "explore" since travel reads it; a will row notes "wealth, legacy"). Documents missing either physical or digital storage are tagged with a storage-gap flag in the index itself, so the index doubles as the audit input.

A short header summarises totals: documents tracked, documents expiring within 90 days, documents with storage gaps, and documents with no last-reviewed date in >12 months.

## Steps

1. Enumerate every document record file under `00_current/`.
2. Parse each record for: type, holder, dates, storage locations, classification.
3. Map each document type to dependent domain agents using the mapping table in config.
4. Compute summary headlines.
5. Sort by category → holder → expiration ascending.
6. Write `00_current/INDEX.md` with the full table and headline block.
7. Hand any storage-gap or stale-review flags to `task-update-open-loops`.

## Configuration

`~/Documents/aireadylife/vault/records/config.md`:
- `document_categories` — overrides the default category list
- `agent_dependency_map` — per-category list of domain agents that should receive paths

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/records/00_current/`
- Writes: `~/Documents/aireadylife/vault/records/00_current/INDEX.md`
- Writes via task: `~/Documents/aireadylife/vault/records/open-loops.md`
