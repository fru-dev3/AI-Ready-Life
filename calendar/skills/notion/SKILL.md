---
name: notion
type: app
description: >
  Reads and writes Notion pages and databases via the Notion API. Used by
  calendar-agent to sync agenda output and deadline tracking into Notion.
  Configure integration token and page IDs in vault/calendar/config.md.
---

# Notion

**Auth:** Notion integration token (`NOTION_API_KEY`)
**URL:** https://www.notion.so
**API:** https://api.notion.com/v1
**Configuration:** Set your token and page IDs in `vault/calendar/config.md`

## Data Available

- Read and write Notion pages (markdown content)
- Query and update database entries (e.g., task or event databases)
- Create new pages or append to existing ones
- Read filtered database views (e.g., events by date)

## Configuration

Add to `vault/calendar/config.md`:
```
notion_api_key: secret_YOUR_NOTION_TOKEN
notion_calendar_page_id: YOUR_PAGE_ID
notion_tasks_database_id: YOUR_DATABASE_ID
```

## Key API

```
POST https://api.notion.com/v1/pages
GET  https://api.notion.com/v1/databases/{id}/query
Authorization: Bearer $NOTION_API_KEY
Notion-Version: 2022-06-28
```

## Used By

- `aireadylife-calendar-weekly-agenda` — write finalized weekly agenda to Notion
- `aireadylife-calendar-build-agenda` — sync deadline items to Notion task database

## Vault Output

`vault/calendar/agendas/`
