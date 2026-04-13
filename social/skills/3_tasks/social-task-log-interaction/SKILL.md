---
name: arlive-social-log-interaction
type: task
cadence: as-happened
description: >
  Records a contact interaction to vault/social/01_interactions/ with contact name, date, type,
  notes, and any follow-up promised.
---

# arlive-social-log-interaction

**Cadence:** As-happened (after a meaningful interaction with a tracked contact)
**Produces:** Interaction record in `vault/social/01_interactions/`

## What it does

This task creates a lightweight interaction record each time a meaningful contact happens with
a tracked person. It captures the contact's name, the date, the interaction type (text, phone call,
video call, coffee, dinner, event, email, LinkedIn), brief notes on what was discussed or shared,
and any follow-up that was promised (e.g., "send that article", "intro to X", "check in after their
interview"). Keeping interaction logs current is what powers the entire social domain — relationship
health calculations, the overdue-contact detector, and the outreach queue all depend on accurate
last-contact dates. Logging takes 30 seconds and prevents relationships from invisibly going cold.

## Apps

None

## Vault Output

`vault/social/01_interactions/`
