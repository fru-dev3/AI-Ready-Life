---
name: gdrive
type: app
description: >
  Reads and writes document scans and records files in configured Google Drive
  folders via the Drive API. Used by records-agent for storing and retrieving
  scanned documents. Configure OAuth credentials in vault/records/config.md.
---

# Google Drive

**Auth:** OAuth2 via Google Drive API (`GDRIVE_CREDENTIALS`)
**URL:** https://drive.google.com
**Configuration:** Set your credentials and folder IDs in `vault/records/config.md`

## Data Available

- File listing in document storage folders (name, modified date, type)
- Upload new document scans (PDF, image)
- Read existing document files
- Organize into subfolders by document type
- Search files by name or metadata

## Configuration

Add to `vault/records/config.md`:
```
gdrive_credentials: vault/records/keys/gdrive-oauth.json
gdrive_records_folder_id: YOUR_RECORDS_FOLDER_ID
gdrive_scans_folder_id: YOUR_SCANS_FOLDER_ID
```

## Key API

```
GET https://www.googleapis.com/drive/v3/files?q='{folderId}'+in+parents
POST https://www.googleapis.com/upload/drive/v3/files
Scopes: https://www.googleapis.com/auth/drive.file
```

## Used By

- `aireadylife-records-log-document` — upload scanned document to the appropriate Drive subfolder

## Vault Output

`vault/records/scans/`
