---
name: arlive-wealth-task-extract-account-balance
type: task
cadence: called-by-op
description: >
  Reads a specific account balance from vault/wealth/00_accounts/ for use by flows.
  Returns current balance, prior balance, and institution name.
---

# arlive-wealth-extract-account-balance

**Cadence:** Called by wealth flows that need a specific account balance
**Produces:** Structured balance record (current balance, prior balance, institution, account type) returned to calling flow

## What it does

A utility task called by wealth flows that need to read a specific account's balance without loading the full accounts directory. Takes an account identifier as input — either an account nickname (e.g., "Fidelity 401k", "Ally Savings") or account type (e.g., "primary checking") — and returns the current balance, the prior-period balance, the institution name, and the account type. Reading is done from vault/wealth/00_accounts/ where each account has a structured balance file updated during the monthly sync. The task enforces a consistent data format so flows don't need to know the internal file structure of the vault, making it easier to add or rename accounts without breaking flow logic.

## Apps

None

## Vault Output

`vault/wealth/00_accounts/`
