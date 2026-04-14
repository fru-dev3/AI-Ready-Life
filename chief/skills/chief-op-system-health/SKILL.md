---
name: aireadylife-chief-op-system-health
type: op
cadence: weekly
description: >
  Weekly system health check. Verifies all installed plugin vaults are readable,
  agents are configured, and no domain has gone stale.
  Triggers: "system health", "check all agents", "life OS health".
---

# aireadylife-chief-system-health

**Cadence:** Weekly (Sunday)
**Produces:** System health report — installed plugins, vault status, stale domains

## What it does

Verifies all installed plugin vaults are readable and up to date. Flags any domain where state.md hasn't been updated in 30+ days. Lists agent configuration status.

## Vault Output

`vault/chief/03_system/health-YYYY-MM-DD.md`
