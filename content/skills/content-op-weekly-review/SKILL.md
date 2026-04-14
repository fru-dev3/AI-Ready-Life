---
name: aireadylife-content-op-weekly-review
type: op
cadence: weekly
description: >
  Weekly content performance review. Reviews last 7 days of video and newsletter performance,
  flags publishing gaps, and surfaces top action items for the week.
  Triggers: "weekly content review", "content this week", "publishing gap", "content check".
---

# aireadylife-content-weekly-review

**Cadence:** Weekly (Monday)
**Produces:** Weekly content snapshot — 7-day performance, publishing gaps, week's top action items

## What it does

Checks last 7 days of content performance: any videos published (vs. schedule target), YouTube views and CTR for the week, newsletter send status, and Gumroad revenue. Flags if no content was published in the past 7 days (schedule health at risk). Surfaces the top 3 action items for the current week (filming, scripting, or publishing).

## Configuration

Uses publishing cadence targets from `vault/content/config.md`. In demo mode, reads from `vault-demo/content/state.md`.

## Calls

- **Flows:** `aireadylife-content-check-publishing-schedule`, `aireadylife-content-pull-weekly-analytics`

## Vault Output

`vault/content/00_current/weekly-snapshot.md`
