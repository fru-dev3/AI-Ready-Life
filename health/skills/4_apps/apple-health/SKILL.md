---
name: apple-health
type: app
description: >
  Exports iPhone health data (steps, weight, workouts, HR) via iOS Shortcuts to
  iCloud Drive for Mac sync. Used by health-agent for wearable data consolidation.
  Configure iCloud sync path in vault/health/config.md.
---

# Apple Health

**Auth:** iOS Shortcut (no API key — device-local export)
**URL:** iPhone → Shortcuts app → "Export Health Data" → iCloud Drive
**Configuration:** Set your sync path in `vault/health/config.md`

## Data Available

- Steps (daily total)
- Active energy burned (kcal)
- Body weight (if logged in Health app)
- Resting heart rate
- Workouts: type, duration, calories, distance
- Stand hours, exercise minutes, move ring progress

## Configuration

Add to `vault/health/config.md`:
```
apple_health_export_path: ~/Library/Mobile Documents/com~apple~CloudDocs/HealthExports/
```

## Setup

1. On iPhone: open Shortcuts → create/run "Export Health Data" shortcut
2. Shortcut saves export XML or CSV to the configured iCloud path
3. File syncs to Mac via iCloud Drive automatically

## Used By

- `arlive-health-sync-wearable-data` — merge Apple Health metrics with Oura data

## Vault Output

`vault/health/wearable/`
