---
type: op
trigger: user-facing
cadence: on-demand-per-project
description: >
  OWNER-ONLY. Tracks renovation / upgrade projects: planned vs. actual cost, contractor
  + license + warranty, before / after photos, permits filed, change orders, and
  project status (planning / quoting / in-progress / complete / warranty-active).
  Closes the cost-basis gap that pays off years later when the home is sold (capital
  improvements adjust basis). Auto-skips if home_type is "rent".
---

# home-improvement-project-log

**Owner-only.** If `home_type` in config is "rent", this skill exits with:
"Home-improvement project log applies to homeowners. Skipping — your config shows
you rent."

**Trigger phrases:**
- "log home project"
- "track renovation"
- "home improvement log"
- "project status"

**Cadence:** On-demand per project; `op-monthly-synthesis` rolls active project
status into the brief.

## What It Does

Each project gets one file: scope, budget, vendors, timeline, permits, payments,
photos, and warranty. Two reasons this matters: (1) capital-improvement records
adjust cost basis when the home sells, reducing capital gains tax; (2) warranty
claims need contractor + product + install-date evidence years later.

**Per project record:**
- **Scope** — short description; rooms / systems affected.
- **Status** — planning / quoting / approved / in-progress / complete / warranty-active.
- **Budget** — planned, contracted, actual, variance.
- **Contractor** — name, license #, insurance verified, contact.
- **Permits** — required (Y/N), filed (Y/N), final inspection passed (Y/N).
- **Timeline** — start, expected complete, actual complete.
- **Payments** — schedule + receipts.
- **Change orders** — log per change with cost delta.
- **Warranties** — workmanship warranty (contractor), product warranties
  (manufacturer), expiration dates.
- **Photos** — before / during / after, stored in
  `vault/home/00_current/projects/{project-slug}/`.

**Cost-basis tag:** projects classified as capital improvement (vs. repair) flagged
for inclusion in tax-basis records when home is sold. Cross-domain handoff to tax
plugin if installed.

## Steps

1. Confirm `home_type` is "own"; otherwise exit.
2. Prompt user for project metadata; create project file.
3. As project progresses, update status, payments, change orders.
4. On complete: archive photos, capture warranty expirations to safety-schedule, tag
   for cost-basis if capital improvement.
5. If tax plugin installed, write capital-improvement entry to
   `vault/tax/00_current/home-cost-basis.md`.

## Configuration

`vault/home/config.md`:
- `home_type` (must be "own")
- `project_capital_improvement_default` (true / false — most owners default true)

## Vault Paths

- Reads: `vault/home/config.md`
- Writes: `vault/home/00_current/projects/{project-slug}.md`,
  `vault/home/00_current/projects/{project-slug}/{photos}`,
  `vault/home/00_current/safety-schedule.md` (warranty expirations),
  `vault/tax/00_current/home-cost-basis.md` (cross-domain, optional)
