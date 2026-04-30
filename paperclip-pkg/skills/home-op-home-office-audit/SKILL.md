---
type: op
trigger: user-facing
cadence: semi-annual
description: >
  Reviews the home office for chronic friction: lighting, cable management, hardware
  reliability, ergonomics, network reliability, acoustic environment. Produces a
  prioritized issue list and feeds each item to task-flag-maintenance-item so it
  enters the standard maintenance queue. Universal — works whether the user owns or
  rents and whether they work from home full-time, hybrid, or occasionally.
---

# home-office-audit

**Trigger phrases:**
- "home office audit"
- "review my office"
- "home office check"
- "office friction review"

**Cadence:** Semi-annual or on-demand.

## What It Does

Treats the home office as infrastructure: any chronic friction (a flickering bulb,
wobbly chair, unreliable webcam, cable spaghetti, drafts) compounds into lost focus
and worse output. The audit walks a fixed checklist, captures the user's score per
item, and converts each <3/5 item into a maintenance item with a target completion
date.

**Audit dimensions:**
- **Lighting** — natural light, key light for video calls, screen glare.
- **Ergonomics** — chair, desk height, monitor height, keyboard / mouse, footrest.
- **Hardware reliability** — laptop / desktop, monitor, webcam, microphone,
  headphones; any device >5 years old or failing intermittently.
- **Cable management** — visible clutter, trip hazards, dust accumulation.
- **Network** — wired vs. Wi-Fi, last speed test, any drop / latency complaints.
- **Acoustic** — background noise, echo, neighbor noise, HVAC noise.
- **Climate** — temperature stability, drafts, humidity.
- **Storage** — desk surface clear, papers filed, supplies stocked.

## Output

- `vault/home/02_briefs/YYYY-MM-DD-office-audit.md` — score per dimension (1–5),
  notes, items flagged.
- One maintenance item per <3 score, written via `task-flag-maintenance-item`.

## Steps

1. Walk the audit checklist with the user; capture score + note per dimension.
2. For each dimension scored <3: call `task-flag-maintenance-item` with appropriate
   urgency (≤2 = urgent, =2 = routine).
3. Write the audit brief to `02_briefs/`.
4. Surface top three friction items in the response.

## Configuration

`vault/home/config.md`:
- `home_office_present` (default true) — skips entire op if false.
- `wfh_pattern` ("full" / "hybrid" / "occasional") — adjusts urgency thresholds.

## Vault Paths

- Reads: `vault/home/config.md`
- Writes: `vault/home/02_briefs/YYYY-MM-DD-office-audit.md`,
  `vault/home/00_current/{issue}.md` (via task), `vault/home/open-loops.md` (via task)
