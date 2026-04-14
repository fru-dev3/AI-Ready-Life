---
name: notion
type: app
description: >
  Reads and writes Notion pages and databases via the Notion API. Used by
  vision-agent for quarterly planning documents and annual review drafting.
  Configure integration token and page IDs in vault/vision/config.md.
---

# Notion

**Auth:** Notion integration token (`NOTION_API_KEY`)
**URL:** https://www.notion.so
**API:** https://api.notion.com/v1
**Configuration:** Set your token and page IDs in `vault/vision/config.md`

## Data Available

- Read and write planning documents (quarterly goals, annual themes)
- Create new pages or update existing planning pages
- Query goal-tracking databases with status filters
- Append reflection blocks to existing documents

## Configuration

Add to `vault/vision/config.md`:
```
notion_api_key: secret_YOUR_NOTION_TOKEN
notion_vision_page_id: YOUR_VISION_PAGE_ID
notion_goals_database_id: YOUR_GOALS_DB_ID
```

## Key API

```
POST https://api.notion.com/v1/pages
PATCH https://api.notion.com/v1/pages/{page_id}
GET  https://api.notion.com/v1/databases/{id}/query
Authorization: Bearer $NOTION_API_KEY
Notion-Version: 2022-06-28
```

## Used By

- `aireadylife-vision-quarterly-planning` — read current goals and write updated quarterly plan
- `aireadylife-vision-draft-quarterly-plan` — create new quarterly plan page from template

## Vault Output

`vault/vision/plans/`
