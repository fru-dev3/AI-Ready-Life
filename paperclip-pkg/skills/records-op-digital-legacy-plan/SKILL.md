---
type: op
cadence: annual
description: >
  Annual digital-legacy review. Compiles the document survivors need: account inventory,
  password-manager unlock instructions, will and POA references, key-contact directory,
  email-account succession (Apple Legacy Contact, Google Inactive Account Manager, etc.),
  and a survivor instruction packet. Universal in importance, situational in priority.
  Triggers: "digital legacy", "estate plan", "what happens if I die", "legacy contact".
---

# records-digital-legacy-plan

**Cadence:** Annual (or after any major life event — marriage, child, divorce, death in family) and on-demand.
**Produces:** `~/Documents/aireadylife/vault/records/02_briefs/YYYY-digital-legacy-plan.md` plus a printable / shareable survivor packet.

## What It Does

This op assembles the practical packet a spouse, partner, executor, or designated family member needs to access, manage, and (where appropriate) close the user's digital life. It does not produce legal advice or replace a will — it produces the operational supplement that lawyers, executors, and surviving family members actually use after death or incapacitation.

Components:

- **Cover letter** — who this packet is for, where the legal originals live (will, POA, healthcare directive), the user's wishes in plain language.
- **Account inventory** — read from `00_current/account-inventory.md`. Critical accounts highlighted with the desired action (transfer / memorialize / delete / leave-as-is).
- **Password-manager unlock plan** — where the master password / recovery kit is stored, who holds it, instructions for using the password manager's emergency-access feature (1Password Recovery Codes, Bitwarden Emergency Access, etc.). The packet records the *location* of the unlock material — never the master password itself.
- **Email-account succession** — Apple Legacy Contact, Google Inactive Account Manager, Facebook legacy contact, and equivalent provider settings. Verifies each is configured.
- **Cloud / file storage** — locations of irreplaceable photos, videos, and documents; instructions for download / handoff.
- **Subscription cleanup checklist** — derived from `subscriptions.md`: what to cancel, what to transfer.
- **Crypto / digital assets** — wallet locations and access plan if applicable; otherwise omitted.
- **Key contacts** — read from `00_current/key-contacts.md`. Highlighted: attorney, accountant, executor, healthcare proxy, primary insurance agent.
- **Open-loops snapshot** — current `open-loops.md` so survivors see active items.

The op verifies that each provider's legacy / inactive-account setting is configured. Missing settings are flagged and the user is given the direct portal link to enable each one.

## Triggers

- "Digital legacy plan"
- "What happens to my accounts if I die"
- "Estate digital review"
- "Set up legacy contact"
- "Survivor packet"

## Steps

1. Refresh `task-build-account-inventory` so the inventory is current.
2. Refresh `task-update-key-contacts` so contacts are current.
3. Verify legacy-contact settings on Apple, Google, Facebook, Microsoft, password manager. List missing.
4. Compile the survivor packet section by section.
5. Write `02_briefs/YYYY-digital-legacy-plan.md`.
6. Optional: produce a printable PDF / paper copy for the fireproof safe.
7. Hand any "legacy contact not set" flag to `task-update-open-loops`.

## Configuration

`~/Documents/aireadylife/vault/records/config.md`:
- `legacy_designated_contacts` — survivor list with role (executor, healthcare proxy, financial POA)
- `legacy_password_manager_unlock_location` — text description, never a credential
- `legacy_packet_format` (markdown / pdf / both)

## Vault Paths

- Reads: `00_current/account-inventory.md`, `00_current/key-contacts.md`, `00_current/INDEX.md`, `open-loops.md`
- Writes: `~/Documents/aireadylife/vault/records/02_briefs/YYYY-digital-legacy-plan.md`
