---
name: oura-ring
type: app
description: >
  Fetches sleep, readiness, and activity data from the Oura Ring API v2. Used by
  health-agent for wearable data sync, trend analysis, and anomaly detection.
  Configure in vault/health/config.md.
---

# Oura Ring

**Auth:** API key (`OURA_API_KEY`)
**URL:** https://cloud.ouraring.com/v2/docs
**Configuration:** Set your credentials in `vault/health/config.md`

## Data Available

- Sleep score, duration, efficiency, latency
- Sleep stages: REM, deep, light (minutes)
- HRV nightly rmssd
- Readiness score (0-100, daily)
- Activity: steps, active calories, equivalent walking distance
- Heart rate (nightly average and lowest)

## Configuration

Add to `vault/health/config.md`:
```
oura_api_key: YOUR_OURA_API_KEY
```

## Key Endpoints

```
GET https://api.ouraring.com/v2/usercollection/sleep?start_date=YYYY-MM-DD
GET https://api.ouraring.com/v2/usercollection/daily_readiness?start_date=YYYY-MM-DD
GET https://api.ouraring.com/v2/usercollection/daily_activity?start_date=YYYY-MM-DD
Authorization: Bearer $OURA_API_KEY
```

## Used By

- `arlive-health-sync-wearable-data` — pull nightly sleep and readiness scores
- `arlive-health-anomaly-watch` — flag HRV drops or low readiness streaks

## Vault Output

`vault/health/wearable/`
