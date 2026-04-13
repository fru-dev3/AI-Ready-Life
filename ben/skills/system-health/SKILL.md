---
name: arlive-ben-system-health
type: op
cadence: weekly
description: >
  Weekly system health check. Verifies all installed plugin vaults are readable,
  agents are configured, and no domain has gone stale.
  Triggers: "system health", "check all agents", "life OS health".
---

# arlive-ben-system-health

**Cadence:** Weekly (Sunday)
**Produces:** System health report — installed plugins, vault status, stale domains

## What it does

Verifies all installed plugin vaults are readable and up to date. Flags any domain where state.md hasn't been updated in 30+ days. Lists agent configuration status.

## Vault Output

`vault/ben/03_system/health-YYYY-MM-DD.md`
