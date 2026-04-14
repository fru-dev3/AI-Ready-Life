---
name: arlive-ben-task-flag-urgent-item
type: task
cadence: as-received
description: >
  Writes a cross-domain urgent flag to vault/ben/01_alerts/ when an item from any domain is 🔴
  priority. Includes domain, item description, due date, and recommended action.
---

# arlive-ben-flag-urgent-item

**Trigger:** Called at the end of every ben op when any 🔴 priority items are found across domains
**Produces:** Dated urgent alert record in vault/ben/01_alerts/ for each 🔴 item requiring cross-domain tracking

## What it does

Receives a 🔴 priority item from any domain — passed by the calling op after collecting domain
alerts — and writes a structured alert record to vault/ben/01_alerts/ with a date-stamped filename.
Each alert record contains: the source domain (e.g. benefits, business, health), the full item
description, the due date or deadline if one exists, the recommended action (copied from the
source domain's open-loops.md), the date the alert was written, and a resolution status field
(open / resolved). The vault/ben/01_alerts/ folder serves as a cross-domain urgent item tracker —
a persistent record of every 🔴 item ben has surfaced, allowing the user to review what was
flagged over time even after the source domain's open-loops.md has been cleared. Checks for an
existing unresolved alert for the same domain-item combination before writing to avoid duplicating
alerts across multiple daily brief runs. When an item is resolved in the source domain's
open-loops.md, marks the corresponding alert in vault/ben/01_alerts/ as resolved on the next
brief cycle.

## Configuration

No special configuration required. Alerts are written to vault/ben/01_alerts/ with filenames
in the format YYYY-MM-DD-{domain}-{slug}.md for easy date-sorted browsing.

## Apps

None

## Vault Output

`vault/ben/01_alerts/`
