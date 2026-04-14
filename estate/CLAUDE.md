# AI Ready Life: Estate Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/AIReadyLife/vault/estate/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/AIReadyLife/vault/estate/` does not exist or is empty:

1. Purchase the **AI Ready Life: Estate Vault** at [frudev.gumroad.com/l/aireadylife-estate](https://frudev.gumroad.com/l/aireadylife-estate)
2. Unzip the download
3. Move the `estate/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/estate/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

The vault includes the full folder structure, a config template, a Quick Start guide, and a prompt reference for every skill in this plugin.

## Vault Structure

```
~/Documents/AIReadyLife/vault/estate/
├── 00_current/
├── 01_cashflow/
├── 02_maintenance/
├── 03_briefs/
├── 04_archive/
└── config.md
└── open-loops.md
```

- `00_current/` — Active portfolio state and current property status
- `01_cashflow/` — Monthly income and expense records by property
- `02_maintenance/` — Open and completed maintenance requests, vendor contacts
- `03_briefs/` — Monthly portfolio review briefs
- `04_archive/` — Prior years by year

## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/AIReadyLife/vault/estate/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding

## Coverage

This plugin manages your rentals, cash flow, maintenance, and tenants.
