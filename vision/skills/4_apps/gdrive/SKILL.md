---
name: gdrive
type: app
description: >
  Reads and writes files in configured Google Drive folders via the Drive API.
  Used by vision-agent for scorecard output and annual review document storage.
  Configure OAuth credentials in vault/vision/config.md.
---

# Google Drive

**Auth:** OAuth2 via Google Drive API (`GDRIVE_CREDENTIALS`)
**URL:** https://drive.google.com
**Configuration:** Set your credentials and folder IDs in `vault/vision/config.md`

## Data Available

- List files in vision/planning folders
- Read prior year review documents (PDF, Google Doc, markdown)
- Write scorecard and annual review output files
- Create new documents or markdown files in designated folders

## Configuration

Add to `vault/vision/config.md`:
```
gdrive_credentials: vault/vision/keys/gdrive-oauth.json
gdrive_vision_folder_id: YOUR_FOLDER_ID
gdrive_scorecards_folder_id: YOUR_SCORECARDS_FOLDER_ID
```

## Key API

```
GET https://www.googleapis.com/drive/v3/files?q='{folderId}'+in+parents
POST https://www.googleapis.com/upload/drive/v3/files
Scopes: https://www.googleapis.com/auth/drive.file
```

## Used By

- `aireadylife-vision-build-scorecard` — write annual scorecard to Drive folder
- `aireadylife-vision-annual-review` — read prior year documents and write new review

## Vault Output

`vault/vision/scorecards/`
