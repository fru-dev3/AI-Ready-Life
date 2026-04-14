---
name: arlive-content-task-log-revenue
type: task
cadence: as-received
description: >
  Records a revenue event to vault/content/ with: platform, amount, date, type
  (AdSense, sponsorship, product sale, subscription). Builds the historical record
  used by monthly revenue reviews.
---

# arlive-content-log-revenue

**Cadence:** As-received (called after each revenue event or monthly batch from platform data)
**Produces:** A structured revenue log entry appended to the appropriate subfolder in `vault/content/`.

## What it does

Records individual revenue events to the vault so `arlive-content-build-revenue-summary` has clean, structured data to aggregate from. Each log entry captures: the platform (YouTube AdSense, newsletter platform, Gumroad, other), the revenue amount, the date earned or paid, the revenue type (AdSense CPM, direct sponsorship, product sale, subscription renewal), and optional notes (campaign name, product name, sponsor). AdSense entries are typically logged in monthly batches when the payment arrives. Sponsorship and product sale entries should be logged at the time of the transaction to maintain an accurate running total. Writes to the platform-specific subfolder: YouTube earnings to `vault/content/00_youtube/`, newsletter revenue to `vault/content/01_newsletter/`, product revenue to `vault/content/02_gumroad/`. File naming follows `YYYY-MM-{platform}-revenue.md` for monthly batch entries or `YYYY-MM-DD-{platform}-{type}.md` for individual transactions. The accumulated log is the single source of truth for all content revenue analysis.

## Apps

vault file system

## Vault Output

`vault/content/00_youtube/`, `vault/content/01_newsletter/`, `vault/content/02_gumroad/`
