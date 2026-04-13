---
name: notion
type: app
description: >
  Reads and writes Notion pages and databases via the Notion API. Used by
  ben-agent for brief output and daily note management. Configure integration
  token and page IDs in vault/ben/config.md.
---

# Notion

**Auth:** Notion integration token (`NOTION_API_KEY`)
**URL:** https://www.notion.so
**API:** https://api.notion.com/v1
**Configuration:** Set your token and page IDs in `vault/ben/config.md`

## Data Available

- Read and write Notion pages (markdown content)
- Query and update database entries
- Create new pages or database rows
- Append blocks to existing pages
- Read database properties and filtered views

## Configuration

Add to `vault/ben/config.md`:
```
notion_api_key: secret_YOUR_NOTION_TOKEN
notion_briefs_page_id: YOUR_PAGE_ID
notion_database_id: YOUR_DATABASE_ID
```

## Key API

```
POST https://api.notion.com/v1/pages
GET  https://api.notion.com/v1/databases/{id}/query
Authorization: Bearer $NOTION_API_KEY
Notion-Version: 2022-06-28
```

## Used By

- `arlive-ben-daily-brief` — write formatted daily brief to Notion page

## Vault Output

`vault/ben/briefs/`
