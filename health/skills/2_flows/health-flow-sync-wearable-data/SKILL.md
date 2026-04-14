---
name: arlive-health-flow-sync-wearable-data
type: flow
trigger: called-by-op
description: >
  Syncs wearable device exports from Oura Ring and Apple Health into the vault,
  appending new data and confirming date range coverage.
---

# arlive-health-sync-wearable-data

**Trigger:** Called by `arlive-health-monthly-sync`
**Produces:** Updated wearable data records in vault/health/00_wearable/ with new entries appended

## What it does

Checks a configured sync folder (typically a Downloads or iCloud directory) for new wearable export files from Oura Ring (JSON export) or Apple Health (XML/CSV export). Each new file is parsed to extract daily records for the metrics tracked by the system: sleep score, total sleep, HRV, resting heart rate, body weight, steps, and active energy. New records are appended to the corresponding files in vault/health/00_wearable/ without overwriting existing data. After appending, the flow confirms the date range now covered and reports any gaps greater than 3 days that may indicate a missed sync or device issue.

## Steps

1. Check configured sync folder for new Oura or Apple Health export files
2. Parse JSON or CSV data from each export file
3. Extract daily records for tracked metrics (sleep, HRV, resting HR, weight, steps, energy)
4. Append new records to vault/health/00_wearable/ without overwriting existing data
5. Confirm date ranges captured and report any gaps greater than 3 days

## Apps

Oura Ring (export), Apple Health (export)

## Vault Output

`vault/health/00_wearable/`
