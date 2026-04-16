---
name: gdrive
type: app
description: >
  Reads and writes files in configured Google Drive folders via the Drive API. Used by
  chief-agent to archive daily briefs and weekly previews to Drive for cross-device access,
  and to read domain state files from shared folders. Optional — all chief data lives locally
  in vault/chief/ first; Drive is a backup and accessibility layer. Configure OAuth credentials
  in vault/chief/config.md.
---

# Google Drive — Chief Plugin

**Auth:** OAuth2 via Google Drive API (`GDRIVE_CREDENTIALS`)
**URL:** https://drive.google.com
**Configuration:** Set credentials and folder IDs in `vault/chief/config.md`

## What It Does

Provides the chief-agent with read and write access to Google Drive folders so that completed daily
briefs and weekly previews can be archived to Drive for cross-device review (phone, tablet, shared
access). All chief data is written locally to `vault/chief/` first — Drive is a secondary archive
layer only. The chief-agent never reads from Drive as its primary data source; Drive is output only.

## Data Available

- Write daily brief files to the configured briefs Drive folder (markdown format)
- Write weekly preview files to the briefs Drive folder
- List existing brief files in Drive (name, modified date) to avoid duplicate writes
- Read prior briefs from Drive if local vault is unavailable (fallback only)
- Write system health reports to the system Drive folder

## Configuration

Add to `vault/chief/config.md`:
```
gdrive_credentials: ~/Documents/AIReadyLife/vault/chief/00_current/gdrive-oauth.json
gdrive_briefs_folder_id: YOUR_BRIEFS_FOLDER_ID
gdrive_system_folder_id: YOUR_SYSTEM_FOLDER_ID
```

To get folder IDs: open the folder in Google Drive → the ID is in the URL after `/folders/`.

**OAuth2 setup:** Create a project in Google Cloud Console → enable Drive API → create OAuth2
credentials → download JSON to `vault/chief/00_current/gdrive-oauth.json`. Scope needed:
`https://www.googleapis.com/auth/drive.file` (write-only to files created by this app — minimal
permission scope).

## Key API

```
GET  https://www.googleapis.com/drive/v3/files
     ?q='{folderId}'+in+parents&fields=files(id,name,modifiedTime)
POST https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart
PATCH https://www.googleapis.com/drive/v3/files/{fileId}
Authorization: Bearer {oauth_token}
Scopes: https://www.googleapis.com/auth/drive.file
```

## File Naming Convention

Brief files written to Drive use the same naming pattern as local vault files:
- Daily brief: `chief-brief-YYYY-MM-DD.md`
- Weekly preview: `chief-weekly-YYYY-MM-DD.md` (Monday date)
- System health report: `chief-system-health-YYYY-MM-DD.md`

Before writing, check if a file with the same name already exists in the Drive folder. If it does,
patch (update) the existing file rather than creating a duplicate.

## Used By

- `chief-op-daily-brief` — archive completed daily brief to Drive briefs folder after local write
- `chief-op-weekly-preview` — archive completed weekly preview to Drive briefs folder
- `chief-op-system-health` — write system health report to Drive system folder

## Notes

- Local vault write always happens first. If Drive write fails, log the error to
  `vault/chief/00_current/drive-sync-errors.md` and continue — do not block brief delivery on
  a Drive failure.
- Drive is optional. If `gdrive_briefs_folder_id` is not configured, skip Drive archiving silently.
- Do not use Drive as the input source for any chief skill. All reads come from the local vault.
  Drive is output-only for this plugin.

## Vault Output

- Local (primary): `~/Documents/AIReadyLife/vault/chief/02_briefs/` — always written first
- Drive (secondary): configured briefs folder — written after local write succeeds
