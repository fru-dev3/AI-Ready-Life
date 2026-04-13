---
name: gdrive
type: app
description: >
  Reads and writes files in configured Google Drive folders via the Drive API.
  Used by ben-agent to write daily briefs and read domain state files from shared
  storage. Configure OAuth credentials in vault/ben/config.md.
---

# Google Drive

**Auth:** OAuth2 via Google Drive API (`GDRIVE_CREDENTIALS`)
**URL:** https://drive.google.com
**Configuration:** Set your credentials and folder IDs in `vault/ben/config.md`

## Data Available

- File listing in configured folders (name, modified date, type)
- File content (text, markdown, PDF, Google Doc)
- Write and update files in designated output folders
- Create new documents or markdown files

## Configuration

Add to `vault/ben/config.md`:
```
gdrive_credentials: vault/ben/keys/gdrive-oauth.json
gdrive_briefs_folder_id: YOUR_FOLDER_ID
gdrive_state_folder_id: YOUR_STATE_FOLDER_ID
```

## Key API

```
GET https://www.googleapis.com/drive/v3/files?q='{folderId}'+in+parents
POST https://www.googleapis.com/upload/drive/v3/files
Scopes: https://www.googleapis.com/auth/drive.file
```

## Used By

- `arlive-ben-build-daily-brief` — write completed daily brief to Drive output folder

## Vault Output

`vault/ben/briefs/`
