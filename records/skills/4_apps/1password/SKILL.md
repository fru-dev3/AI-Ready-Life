---
name: 1password
type: app
description: >
  Accesses the 1Password vault via the local CLI (`op`) using a service account
  token. Used by records-agent for document metadata auditing and expiry tracking
  via secure notes. Configure service account token in vault/records/config.md.
---

# 1Password

**Auth:** Local CLI (`op`) with service account token
**URL:** https://1password.com
**Configuration:** Set your service account token in `vault/records/config.md`

## Data Available

- Vault item list (title, category, created, updated dates)
- Secure notes content (document metadata, expiry dates)
- Login item names (audit only — no passwords read)
- Document attachments (if stored in vault)
- Tag-based item filtering
- Item field values (for structured secure notes)

## Configuration

Add to `vault/records/config.md`:
```
op_service_account_token: ops_YOUR_SERVICE_ACCOUNT_TOKEN
op_vault_name: Personal
```

## Key CLI Commands

```bash
op item list --vault "Personal" --format json
op item get "Document Name" --fields label=expiry_date
op document list --vault "Personal"
```

## Notes

- Service account token: 1password.com/teams → Service Accounts
- Token should have read-only access to the relevant vault
- Never expose the token in plaintext; store in `~/.ai/env/.env`

## Used By

- `aireadylife-records-document-audit` — list all document items and flag those nearing expiry
- `aireadylife-records-log-document` — create or update secure note with new document metadata

## Vault Output

`vault/records/audit/`
