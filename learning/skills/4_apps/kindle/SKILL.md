---
name: kindle
type: app
description: >
  Accesses Kindle library and reading progress via Goodreads sync or Amazon
  Content page. Used by learning-agent for reading progress tracking and
  book summary generation. Configure in vault/learning/config.md.
---

# Kindle

**Auth:** Manual export (Amazon → Manage Content) or Goodreads OAuth sync
**URL:** https://www.amazon.com/hz/mycd/digital-console/contentlist/booksAll
**Configuration:** Set your sync method and paths in `vault/learning/config.md`

## Data Available

- Books in Kindle library (title, author, date purchased)
- Reading progress (% complete, last read date) — via Goodreads sync
- Highlights and notes (exported from kindle.amazon.com/your_highlights)
- Read vs unread status
- Wishlist and samples

## Configuration

Add to `vault/learning/config.md`:
```
kindle_highlights_export_path: vault/learning/highlights/
goodreads_rss_url: https://www.goodreads.com/review/list_rss/YOUR_USER_ID?shelf=currently-reading
```

## Export Methods

1. **Highlights:** kindle.amazon.com/your_highlights → export to `vault/learning/highlights/`
2. **Goodreads RSS:** if books synced to Goodreads, read "currently-reading" shelf RSS
3. **Manual:** Amazon → Manage Content → list all Kindle books

## Used By

- `arlive-learning-build-reading-summary` — compile current reading list with progress and recent highlights

## Vault Output

`vault/learning/reading/`
