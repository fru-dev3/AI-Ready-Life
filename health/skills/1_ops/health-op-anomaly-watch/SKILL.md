---
name: arlive-health-anomaly-watch
type: op
cadence: weekly
description: >
  Weekly wearable anomaly watch; scans Oura Ring and Apple Health metrics for
  statistical spikes more than 2 standard deviations from the 90-day baseline.
  Triggers: "weekly health check", "check my wearable data", "anomaly scan".
---

# arlive-health-anomaly-watch

**Cadence:** Weekly (every Monday morning)
**Produces:** Anomaly flags in vault/health/open-loops.md, updated wearable data in vault/health/00_wearable/

## What it does

Runs weekly to surface meaningful deviations in wearable health metrics before they become problems. It calls `arlive-health-sync-wearable-data` first to ensure the latest Oura Ring and Apple Health exports are in the vault, then calculates a rolling 90-day baseline for four key signals: HRV, sleep score, resting heart rate, and body weight. Any metric that deviates more than 2 standard deviations from its baseline is treated as a potential anomaly and logged via `arlive-health-update-open-loops`. The output surfaces patterns like a sudden HRV drop (overtraining or illness onset) or unexplained resting HR elevation that a weekly glance at the app might miss.

## Calls

- **Flows:** `arlive-health-sync-wearable-data`
- **Tasks:** `arlive-health-update-open-loops`

## Apps

Oura Ring (export), Apple Health (export)

## Vault Output

`vault/health/00_wearable/`
