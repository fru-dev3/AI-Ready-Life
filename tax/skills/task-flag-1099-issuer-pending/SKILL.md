---
type: task
trigger: user-or-flow
description: >
  Maintains a registry of every entity expected to issue a 1099 to the user (banks,
  brokerages, freelance clients, affiliate platforms, gig apps, payment processors,
  ride-share, etc.). After Feb 15, flags any expected issuer that hasn't sent a 1099
  yet. Common cause of incomplete returns and amended-return rework. Each entry
  records issuer name, expected 1099 type, threshold ($10 for INT/DIV; $600 for
  NEC/MISC; varies for K), tax year, and received status.
---

# task-flag-1099-issuer-pending

**Trigger:**
- User input: "add 1099 issuer", "expecting a 1099 from", "track 1099 from [payer]"
- Called by: `op-document-sync`, `flow-document-completeness`, `op-cpa-packet`

## What It Does

Holds the canonical list of every entity the user expects to receive a 1099 from this tax year. Without this, missing 1099s are usually noticed at filing — too late to chase before Apr 15 and a leading cause of amended returns.

**Registry entry fields:**
- Issuer name (and DBA if different)
- 1099 type expected: `1099-NEC` (≥$600 freelance), `1099-MISC` (rents, royalties, prizes ≥$600), `1099-INT` (≥$10 interest), `1099-DIV` (≥$10 dividends), `1099-B` (any brokerage sale), `1099-R` (any retirement distribution), `1099-K` (payment processors / marketplaces / ride-share), `1099-G` (state refunds, unemployment), `1099-C` (cancellation of debt), `1099-S` (real estate sale)
- Approximate amount expected (helps verify when received)
- Tax year
- Source / contact: portal URL or AP contact for follow-up
- Status: `EXPECTED`, `RECEIVED`, `BELOW_THRESHOLD` (received notice or confirmed under threshold), `WAIVED` (issuer confirmed not sending — verify why)
- Received date (when status flips to RECEIVED)

**Auto-population sources.** When called by ops, attempts to seed the registry from:
- Prior-year vault (`vault/tax/01_prior/YYYY-1/`) — issuers from last year are likely this year
- Wealth plugin's account list (banks → 1099-INT, brokerages → 1099-B/DIV, retirement accounts → 1099-R)
- Self-employment / freelance client list from config

**Flagging logic:**
- **Before Feb 15:** all `EXPECTED` items show as PENDING (issuer deadline Jan 31, mail-time grace)
- **Feb 16 – Mar 15:** `EXPECTED` items still missing → MEDIUM flag, action: "Check issuer portal or contact AP"
- **After Mar 15:** still missing → HIGH flag, action: "Contact issuer for status; if filing imminent, consider extension or file with reasonable estimate"
- **Below-threshold paths:** if user knows interest from a bank was <$10, mark `BELOW_THRESHOLD` (no 1099 will issue; report on Schedule B anyway)

## Steps

1. Read input: issuer name, type, amount estimate, source
2. Read or create `vault/tax/00_current/YYYY/1099-registry.md`
3. Append or update entry
4. Compare today's date to issuer deadline; assign PENDING / MEDIUM / HIGH per rules above
5. Write any HIGH or MEDIUM flag to `open-loops.md` via `task-update-open-loops`
6. On RECEIVED status update, auto-resolve the open-loop entry

## Configuration

`vault/tax/config.md`:
- `freelance_clients` (list, used to seed 1099-NEC expectations)
- `financial_institutions` (list, used to seed 1099-INT/DIV/B)
- `retirement_accounts` (list, used to seed 1099-R)

## Vault Paths

- Writes: `~/Documents/aireadylife/vault/tax/00_current/YYYY/1099-registry.md`, `~/Documents/aireadylife/vault/tax/open-loops.md`
