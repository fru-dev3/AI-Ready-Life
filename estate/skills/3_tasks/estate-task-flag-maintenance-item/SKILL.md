---
name: arlive-estate-flag-maintenance-item
type: task
description: >
  Writes a maintenance flag to vault/estate/open-loops.md with property address,
  issue description, urgency, vendor status, estimated cost, and target completion
  date.
---

# arlive-estate-flag-maintenance-item

**Produces:** A new maintenance flag entry in `vault/estate/open-loops.md` and a corresponding item in `vault/estate/02_maintenance/`.

## What it does

Called whenever a maintenance issue is identified — either discovered during a monthly review, reported by a tenant, found during a property inspection, or triggered by a seasonal schedule check. Writes a structured maintenance record to two places: a detailed item file in `vault/estate/02_maintenance/` and a summarized flag in `vault/estate/open-loops.md`. The maintenance item file captures: property address, issue description, location within property (unit number, area of home), how it was discovered, urgency classification (routine = scheduled preventive task, urgent = functional issue not yet emergency, emergency = immediate safety risk or habitability threat), vendor contacted (name, date contacted, quote received), estimated cost, and target completion date. The open loop flag is a condensed version with enough context to act on without reading the full item file. Urgency classification drives visibility: emergency items are flagged with `urgency: critical` so they surface at the top of the next maintenance review and in the weekly calendar agenda if not resolved within 48 hours. Routine items are grouped by property in the monthly maintenance review without individual escalation.

## Apps

vault file system

## Vault Output

`vault/estate/open-loops.md`, `vault/estate/02_maintenance/`
