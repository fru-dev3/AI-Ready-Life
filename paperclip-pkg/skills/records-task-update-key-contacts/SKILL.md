---
type: task
trigger: user-or-flow
description: >
  Maintains the user-configurable directory of critical professional contacts — the people
  who get called in an emergency or end-of-quarter scramble. The contact list is fully
  user-defined; common roles include lawyer, accountant, financial advisor, primary doctor,
  dentist, insurance agent, landlord / property manager, mechanic, and IT / handyperson.
---

# records-update-key-contacts

**Cadence:** As-changed and reviewed annually.
**Produces:** `~/Documents/aireadylife/vault/records/00_current/key-contacts.md`

## What It Does

When the basement floods at midnight or the IRS notice arrives the day before vacation, the user needs the right phone number in under 30 seconds. Spreading those numbers across Contacts, Gmail history, and a paper card in a wallet is the failure mode this task fixes.

The directory is **fully user-configurable** — the plugin ships with a suggested role list but does not assume every user has every role filled. Suggested roles (none required):

- Lawyer (estate, real estate, business, immigration — list each separately if relevant)
- Accountant / CPA / tax preparer
- Financial advisor / wealth manager
- Primary care doctor, dentist, optometrist, specialist(s)
- Pediatrician (if applicable)
- Veterinarian (if applicable)
- Insurance agent (separate per line if multiple — auto, home, life, health)
- Landlord or property manager (if renting); HOA contact (if applicable)
- Mechanic
- IT / handyperson / electrician / plumber
- Emergency contacts — designated next-of-kin / power-of-attorney / healthcare proxy

For each contact: name, role, organization, phone (primary + after-hours if known), email, address, last-contact date, notes (case number, account number, preferred contact method).

The list is also referenced by `op-digital-legacy-plan` so survivors know who to call.

## Steps

1. Read existing `00_current/key-contacts.md` (or initialize from suggested roles if absent).
2. Add, update, or remove the contact specified by the user.
3. Validate phone number formatting; flag missing after-hours number for emergency-class roles.
4. Write `00_current/key-contacts.md` sorted by role group (emergency first, then advisors, then services).
5. Update `last_reviewed` date in the file's header on every edit.

## Configuration

`~/Documents/aireadylife/vault/records/config.md`:
- `key_contact_roles` — user's chosen role list (overrides suggested)
- `key_contact_emergency_roles` — subset that must include after-hours number

## Vault Paths

- Writes: `~/Documents/aireadylife/vault/records/00_current/key-contacts.md`
