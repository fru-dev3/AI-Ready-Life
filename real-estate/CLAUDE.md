# AI Ready Life: Real Estate Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/AIReadyLife/vault/real-estate/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/AIReadyLife/vault/real-estate/` does not exist or is empty:

1. Purchase the **AI Ready Life: Real Estate Vault** at [frudev.gumroad.com/l/aireadylife-real-estate](https://frudev.gumroad.com/l/aireadylife-real-estate)
2. Unzip the download
3. Move the `real-estate/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/real-estate/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

The vault includes the full folder structure, a config template, a Quick Start guide, and a prompt reference for every skill in this plugin.

## Vault Structure

```
~/Documents/AIReadyLife/vault/real-estate/
├── 00_current/
├── 01_market/
├── 02_analysis/
├── 03_briefs/
├── 04_archive/
└── config.md
└── open-loops.md
```

- `00_current/` — Active market snapshots and current strategy
- `01_market/` — Market reports by city and date
- `02_analysis/` — Buy vs. rent worksheets and property evaluation models
- `03_briefs/` — Monthly real estate review briefs
- `04_archive/` — Prior year reports by market

## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/AIReadyLife/vault/real-estate/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding

## Coverage

This plugin manages your market data, buy vs. rent analysis, and listings.
