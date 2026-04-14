# AI Ready Life: Home Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/AIReadyLife/vault/home/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/AIReadyLife/vault/home/` does not exist or is empty:

1. Purchase the **AI Ready Life: Home Vault** at [frudev.gumroad.com/l/aireadylife-home](https://frudev.gumroad.com/l/aireadylife-home)
2. Unzip the download
3. Move the `home/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/home/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

The vault includes the full folder structure, a config template, a Quick Start guide, and a prompt reference for every skill in this plugin.

## Vault Structure

```
~/Documents/AIReadyLife/vault/home/
├── 00_current/
├── 01_maintenance/
├── 02_expenses/
├── 03_briefs/
├── 04_archive/
└── config.md
└── open-loops.md
```

- `00_current/` — Active home state, open maintenance list, and current expenses
- `01_maintenance/` — Open and completed maintenance tasks, vendor contacts
- `02_expenses/` — Monthly home expense records by category
- `03_briefs/` — Monthly home review briefs
- `04_archive/` — Prior years by year

## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/AIReadyLife/vault/home/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding

## Coverage

This plugin manages your maintenance, expenses, seasonal tasks, and contractors.
