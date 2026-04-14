# AI Ready Life: Learning Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/AIReadyLife/vault/learning/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/AIReadyLife/vault/learning/` does not exist or is empty:

1. Purchase the **AI Ready Life: Learning Vault** at [frudev.gumroad.com/l/aireadylife-learning](https://frudev.gumroad.com/l/aireadylife-learning)
2. Unzip the download
3. Move the `learning/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/learning/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

The vault includes the full folder structure, a config template, a Quick Start guide, and a prompt reference for every skill in this plugin.

## Vault Structure

```
~/Documents/AIReadyLife/vault/learning/
├── 00_current/
├── 01_courses/
├── 02_books/
├── 03_briefs/
├── 04_archive/
└── config.md
└── open-loops.md
```

- `00_current/` — Active learning state and current goals
- `01_courses/` — Course notes organized by platform and course
- `02_books/` — Reading notes and highlights by book
- `03_briefs/` — Weekly learning review briefs
- `04_archive/` — Completed courses and books by year

## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/AIReadyLife/vault/learning/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding

## Coverage

This plugin manages your courses, books, certifications, and learning goals.
