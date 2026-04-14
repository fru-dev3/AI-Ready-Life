---
name: aireadylife-health-op-monthly-sync
type: op
cadence: monthly
description: >
  Full health data sync on the 1st of each month. Pulls wearable data,
  downloads portal records, organizes vault. Then triggers Health Review Brief.
  Triggers: "health monthly sync", "sync health data", "refresh health vault".
---

# aireadylife-health-monthly-sync

**Cadence:** Monthly (1st of month)
**Produces:** Health vault refreshed with wearable data, portal records, and organized documents

## What it does

Full health data sync: exports Oura Ring sleep/HRV/activity data (or Apple Health), downloads visit notes and lab results from your patient portal (MyChart, Epic, or equivalent), organizes all docs in vault by domain. Ends by triggering Health Review Brief.

## Configuration

Set your wearable type and patient portal URL in `vault/health/config.md`. Supports: Oura Ring, Apple Health, Fitbit, Garmin, Whoop. Supports any MyChart-based portal.

## Calls

- **Flows:** `aireadylife-health-sync-wearable-data`, `aireadylife-health-download-portal-records`, `aireadylife-health-organize-docs`
- **Then triggers:** `aireadylife-health-wellness-review`, `aireadylife-health-review-brief`

## Apps

`oura-ring` or `apple-health`, `mychart` (or equivalent portal), `gdrive` (optional)

## Vault Output

`vault/health/` (all subdomains refreshed)
