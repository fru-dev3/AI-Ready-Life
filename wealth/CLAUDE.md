# AI Ready Life: Wealth Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/AIReadyLife/vault/wealth/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/AIReadyLife/vault/wealth/` does not exist or is empty:

1. Purchase the **AI Ready Life: Wealth Vault** at [frudev.gumroad.com/l/aireadylife-wealth](https://frudev.gumroad.com/l/aireadylife-wealth)
2. Unzip the download
3. Move the `wealth/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/wealth/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

The vault includes the full folder structure, a config template, a Quick Start guide, and a prompt reference for every skill in this plugin.

## Vault Structure

```
~/Documents/AIReadyLife/vault/wealth/
├── 00_current/
├── 01_statements/
├── 02_investments/
├── 03_estate/
├── 04_briefs/
├── 05_archive/
└── config.md
└── open-loops.md
```

- `00_current/` — Current state: net worth, open loops, config
- `01_statements/` — Monthly statements by institution/year
- `02_investments/` — Investment account history and performance
- `03_estate/` — Estate planning docs: trust, will, beneficiaries
- `04_briefs/` — Monthly wealth synthesis and review briefs
- `05_archive/` — Prior years by year

## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/AIReadyLife/vault/wealth/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding

## Coverage

This plugin manages your net worth, investments, cash flow, and estate planning.
