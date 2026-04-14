---
name: arlive-content-task-flag-seo-gap
type: task
description: >
  Writes a flag to vault/content/open-loops.md when a content piece drops in ranking
  or a high-value keyword has no content coverage. Includes keyword, current position,
  opportunity score, and recommended action.
---

# arlive-content-flag-seo-gap

**Produces:** A new SEO gap flag entry in `vault/content/open-loops.md`.

## What it does

Called by `arlive-content-seo-review` whenever the SEO analysis identifies either a ranking drop or a keyword coverage gap that meets the flagging threshold. For ranking drops: writes a flag when a content piece falls more than 3 positions MoM, including the page URL, current position, prior position, the keywords affected, and a recommended action (update content, improve internal linking, fix technical issue, or refresh publication date). For keyword gaps: writes a flag when a high-value keyword (estimated monthly search volume above threshold) has no existing content targeting it, including the keyword, search volume estimate, competition level, and recommendation (create new post, expand existing post, or repurpose existing content). Each flag includes an opportunity score (1-10) based on search volume and position improvement potential to help prioritize when multiple gaps exist. Prevents duplicate flags by checking if the same keyword or page is already in open loops before writing. This ensures the SEO backlog stays prioritized and actionable rather than accumulating a long undifferentiated list.

## Apps

vault file system

## Vault Output

`vault/content/open-loops.md`
