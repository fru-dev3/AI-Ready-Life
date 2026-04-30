---
type: op
trigger: user-facing
cadence: quarterly-or-on-demand
description: >
  Indexes home documents (lease, insurance policy, warranties, appliance manuals, HOA
  docs, utility account info, contractor invoices) from the vault and from Gmail
  attachments into a single searchable index. Surfaces missing categories so retrieval
  takes <2 minutes. Works for renters and homeowners — owner-only categories (mortgage
  docs, deed, HOA bylaws) auto-skip when home_type is "rent".
---

# home-organize-documents

**Trigger phrases:**
- "organize home documents"
- "build home document index"
- "find my lease" / "find my insurance policy"
- "what home docs am I missing"

**Cadence:** Quarterly or on-demand.

## What It Does

Builds a searchable home-document index by scanning the vault and (if Gmail connector
is available) Gmail attachments for the standard home-document categories. The goal:
any document the user might need (lease, insurance card, appliance warranty, HOA
covenants) retrievable in under two minutes.

**Categories indexed:**
- **Universal:** renter's or homeowner's insurance policy, utility account info
  (electric, gas, water, internet), appliance manuals + warranties, contractor
  invoices, home inventory photos.
- **Renter-only:** lease, lease addenda, move-in inspection report, security-deposit
  receipt.
- **Owner-only:** deed, title insurance, mortgage docs, property-tax statements, HOA
  bylaws + meeting minutes, home-improvement permits.

**Output:**
- `vault/home/00_current/document-index.md` — table per category: filename, location
  (vault path or Gmail thread), date acquired, expiration if applicable.
- Missing-category list flagged to `open-loops.md`.

## Steps

1. Read `home_type` from config; build active category list (skip owner-only if rent).
2. Scan `vault/home/00_current/` for files matching each category by filename
   convention or content keyword.
3. If Gmail connector installed: search Gmail for category keywords (e.g., "lease",
   "policy declaration", "warranty registration") and capture thread IDs.
4. Build index table per category.
5. Flag missing categories to open-loops with a "find or request" action.

## Configuration

`vault/home/config.md`:
- `home_type` ("own" or "rent") — gates owner-only categories.
- `gmail_attachment_search` (default true if Gmail connector available)

## Vault Paths

- Reads: `vault/home/00_current/`, Gmail (via connector)
- Writes: `vault/home/00_current/document-index.md`, `vault/home/open-loops.md`
