# AI Ready Life: Brand Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/AIReadyLife/vault/brand/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/AIReadyLife/vault/brand/` does not exist or is empty:

1. Purchase the **AI Ready Life: Brand Vault** at [frudev.gumroad.com/l/aireadylife-brand](https://frudev.gumroad.com/l/aireadylife-brand)
2. Unzip the download
3. Move the `brand/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/brand/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

The vault includes the full folder structure, a config template, a Quick Start guide, and a prompt reference for every skill in this plugin.

## Vault Structure

```
~/Documents/AIReadyLife/vault/brand/
├── 01_analytics/
├── 02_assets/
├── 03_mentions/
├── 04_profiles/
└── config.md
└── open-loops.md
```

- `01_analytics/` — Platform metrics history by month
- `02_assets/` — Headshots, logos, bio copy, brand guidelines
- `03_mentions/` — Mention logs and sentiment tracking
- `04_profiles/` — Screenshot audits of each platform profile

## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/AIReadyLife/vault/brand/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding

## Coverage

This plugin manages your online presence, mentions, analytics, and profile consistency.
