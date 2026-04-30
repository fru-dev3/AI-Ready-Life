---
type: flow
trigger: called-by-op
description: >
  Emits per-domain document manifests (tax-docs.json, health-docs.json, insurance-docs.json,
  career-docs.json, etc.) under 02_briefs/manifests/ that other domain agents read to find
  the canonical path of any document they depend on. Closes the paragon non-negotiable
  "cross-agent accessibility."
---

# records-share-paths-with-agents

**Trigger:** Called by `op-monthly-sync` and after `task-build-vault-index`. On-demand when a new domain plugin is installed.
**Produces:** Per-domain JSON manifests at `~/Documents/aireadylife/vault/records/02_briefs/manifests/{domain}-docs.json`.

## What It Does

The records vault is the shared foundation that every other domain plugin draws from. Without an explicit cross-agent contract, each domain has to re-discover where documents live. This flow publishes a stable, machine-readable manifest per domain so any agent can resolve "give me the user's most recent W-2" or "give me the homeowners policy declaration" with a single read.

Each manifest is a JSON array of records, one per document the domain agent depends on. Fields: `document_type`, `holder`, `category`, `path` (absolute path to the canonical record file), `scan_path` (absolute path to the scanned file if present), `expires_on`, `last_reviewed`, `source` (e.g., "task-log-document"). The manifest is regenerated from the vault index on every run; the agents-side contract is read-only.

Default domain manifests:
- `tax-docs.json` — W-2s, 1099s, 1098s, K-1s, prior returns, estimated-payment receipts.
- `health-docs.json` — insurance cards, EOBs, prescription docs, medical directives.
- `insurance-docs.json` — auto, home, life, umbrella, disability declarations.
- `career-docs.json` — pay stubs, offer letters, professional licenses, education credentials.
- `wealth-docs.json` — investment statements, mortgage docs, debt statements (cross-referenced; primary source is wealth vault).
- `legacy-docs.json` — wills, POAs, healthcare directives, trust docs.
- `vehicle-docs.json` — registration, title, insurance card, maintenance log.

## Steps

1. Read `00_current/INDEX.md` for the canonical document table (rebuild via `task-build-vault-index` if missing).
2. Read `agent_dependency_map` from config to determine which document types feed each domain manifest.
3. For each domain in the map, build the JSON array.
4. Write each manifest to `02_briefs/manifests/{domain}-docs.json`.
5. Write a `manifests/README.md` explaining the schema for downstream agents.

## Configuration

`~/Documents/aireadylife/vault/records/config.md`:
- `agent_dependency_map` — overrides default domain → document-type mapping
- `manifests_enabled_domains` — restrict which manifests are written

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/records/00_current/INDEX.md`
- Writes: `~/Documents/aireadylife/vault/records/02_briefs/manifests/{domain}-docs.json`
