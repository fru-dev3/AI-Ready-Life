---
name: notion
type: app
description: >
  Reads and writes Notion pages and databases via the Notion API. Used by chief-agent to
  publish daily briefs and weekly previews to a Notion page for cross-device reading and
  sharing. Optional — all chief data lives locally in vault/chief/ first; Notion is a
  display and accessibility layer. Configure integration token and page IDs in vault/chief/config.md.
---

# Notion — Chief Plugin

**Auth:** Notion integration token (`NOTION_API_KEY`)
**URL:** https://www.notion.so
**API:** https://api.notion.com/v1
**Configuration:** Set token and page IDs in `vault/chief/config.md`

## What It Does

Provides the chief-agent with read and write access to Notion so that completed daily briefs
and weekly previews can be published to a Notion page for reading on any device. The brief is
written locally first, then synced to Notion as a formatted page. Notion is a display layer —
the vault is the source of truth. The chief-agent never reads from Notion as its primary data
source for any skill.

## Data Available

- Write daily brief content as a new Notion page (with heading, table, and checklist blocks)
- Write weekly preview content to a Notion page
- Append to an existing briefs archive database (one row per brief with date and content)
- Read prior brief pages from Notion (fallback if local vault is unavailable — rarely needed)
- Update an existing page if re-running a brief for the same date

## Configuration

Add to `vault/chief/config.md`:
```
notion_api_key: secret_YOUR_NOTION_TOKEN
notion_briefs_page_id: YOUR_BRIEFS_PARENT_PAGE_ID
notion_briefs_database_id: YOUR_BRIEFS_DATABASE_ID
```

**Integration setup:** Create a Notion integration at notion.so/my-integrations → copy the
integration token to `notion_api_key`. Share the briefs parent page (and any database) with the
integration: open the page in Notion → ... menu → Add Connections → select your integration.
Without this connection step, API calls will return 404 even with a valid token.

## Key API

```
POST https://api.notion.com/v1/pages
PATCH https://api.notion.com/v1/pages/{page_id}
GET  https://api.notion.com/v1/databases/{id}/query
POST https://api.notion.com/v1/blocks/{block_id}/children
Authorization: Bearer $NOTION_API_KEY
Notion-Version: 2022-06-28
Content-Type: application/json
```

## Brief Page Structure

When writing a daily brief to Notion, use the following block structure:
1. **Heading 1**: `Daily Brief — {Day}, {Month} {Date}`
2. **Callout block**: Top 3 action items (use 🔴 for urgency — or plain text if emoji disabled)
3. **Heading 2**: `Domain Alerts`
4. **Table block**: Domain | Alert | Urgency | Due Date
5. **Heading 2**: `Calendar Today`
6. **Bulleted list**: Events and deadlines for the day
7. **Heading 2**: `Open Loops`
8. **To-do blocks**: Active open-loop items (checked = resolved)

For weekly preview, use the same pattern with a "Week of {Monday date}" heading.

## Deduplication

Before creating a new page, query the briefs database for an existing entry with the same date:
```
POST https://api.notion.com/v1/databases/{id}/query
Body: {"filter": {"property": "Date", "date": {"equals": "YYYY-MM-DD"}}}
```
If a match is found, PATCH the existing page rather than creating a duplicate.

## Used By

- `chief-op-daily-brief` — publish completed daily brief to Notion briefs page after local write
- `chief-op-weekly-preview` — publish completed weekly preview to Notion briefs page

## Notes

- Local vault write always happens first. If Notion write fails, log the error to
  `vault/chief/00_current/notion-sync-errors.md` and continue — do not block brief delivery.
- Notion is optional. If `notion_briefs_page_id` is not configured, skip Notion sync silently.
- Notion rate limits: 3 requests/second per integration. For briefs with many blocks, batch
  block creation into groups of 100 (API limit per request).

## Vault Output

- Local (primary): `~/Documents/aireadylife/vault/chief/02_briefs/` — always written first
- Notion (secondary): briefs page — written after local write succeeds
