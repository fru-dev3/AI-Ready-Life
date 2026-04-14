# AI Ready Life: Content Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/AIReadyLife/vault/content/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/AIReadyLife/vault/content/` does not exist or is empty:

1. Purchase the **AI Ready Life: Content Vault** at [frudev.gumroad.com/l/aireadylife-content](https://frudev.gumroad.com/l/aireadylife-content)
2. Unzip the download
3. Move the `content/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/content/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

The vault includes the full folder structure, a config template, a Quick Start guide, and a prompt reference for every skill in this plugin.

## Vault Structure

```
~/Documents/AIReadyLife/vault/content/
├── 00_current/
├── 01_analytics/
├── 02_revenue/
├── 03_briefs/
├── 04_archive/
└── config.md
└── open-loops.md
```

- `00_current/` — Active content state and current publishing schedule
- `01_analytics/` — YouTube and platform analytics by month
- `02_revenue/` — Revenue records by platform and month
- `03_briefs/` — Monthly content review briefs
- `04_archive/` — Prior years by year

## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/AIReadyLife/vault/content/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding

## Coverage

This plugin manages your YouTube, newsletter, revenue, and publishing pipeline.
