---
name: aireadylife-explore-flow-check-travel-docs
type: flow
trigger: called-by-op
description: >
  Verifies all travel documents are valid for upcoming trips, including the 6-month passport
  validity rule and vaccination requirements for wishlist destinations.
---

# aireadylife-explore-check-travel-docs

**Trigger:** Called by `aireadylife-explore-document-check`
**Produces:** Document validity report with per-document expiration status and renewal flags

## What it does

This flow reads the full document inventory from the vault and validates each document against both
current and upcoming trip requirements. It applies the 6-month rule (passport must be valid 6+ months
past the return date of each trip) and checks Global Entry and TSA PreCheck membership windows. For
wishlist destinations, it also checks whether any vaccinations are required or recommended and flags
any gaps. Every failing check produces a structured flag with the document type, expiration date,
renewal lead time, and action steps.

## Steps

1. Read document inventory from `vault/explore/01_documents/`
2. Check each document's expiration date against the next trip's return date (passport 6-month rule)
3. Flag passport, Global Entry, and TSA PreCheck expiring within 12 months with renewal lead times
4. Flag vaccinations required or recommended for wishlist destinations in `vault/explore/02_wishlist/`

## Apps

None

## Vault Output

`vault/explore/01_documents/`
