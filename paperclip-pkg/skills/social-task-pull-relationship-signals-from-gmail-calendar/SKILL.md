---
type: task
trigger: user-or-flow
description: >
  Uses Claude Desktop's native Gmail and Calendar connectors to pull last-email
  and last-meeting dates per tracked contact, replacing manual interaction logging
  for the most common channels. Falls back to task-log-interaction for in-person,
  phone, and text-only contacts.
---

# social-pull-relationship-signals-from-gmail-calendar

**Trigger:**
- User input: "refresh signals", "pull relationship signals", "update last contact dates"
- Called by: `op-relationship-review`, `op-family-relationships-review`, `op-local-community-review`, `flow-build-relationship-health-summary`

## What It Does

For every contact in `~/Documents/aireadylife/vault/social/00_current/contacts.md` with a known email address, queries the native Gmail connector for the most recent message in either direction (sent or received), and the native Calendar connector for the most recent past event the contact was on. Records the latest of the two as `last_signal_date` along with the channel (`gmail-sent`, `gmail-received`, `calendar-meeting`).

This replaces the most common failure mode of `task-log-interaction` — forgetting to log emails and meetings. Manual interaction logging then only needs to cover phone, text, and in-person contact, where there's no native connector signal.

The task does **not** open or read message bodies. It only retrieves timestamps and direction so the health calculation has reliable last-contact data without leaking content into the vault.

## Steps

1. Read contacts roster from `vault/social/00_current/contacts.md`; collect email addresses per contact
2. For each contact with an email: call native Gmail connector for most-recent message timestamp + direction (use `from:` and `to:` filters)
3. For each contact: call native Calendar connector for most-recent past event where contact was an attendee
4. Take the latest of the two; record as `last_signal_date` with channel
5. Merge with manually logged interactions in `01_interactions/` — use whichever is more recent
6. Write merged last-contact dates to `vault/social/00_current/last-signals.md`
7. Return summary: how many contacts updated, how many had no signals (cold)

## Configuration

`vault/social/config.md`:
- `gmail_lookback_days` (default 365) — how far back to scan
- `calendar_lookback_days` (default 365)
- `signal_freshness_warn_days` (default 30) — flag contacts whose last signal is older than this

## Vault Paths

- Reads: `~/Documents/aireadylife/vault/social/00_current/contacts.md`, `01_interactions/`
- Writes: `~/Documents/aireadylife/vault/social/00_current/last-signals.md`
