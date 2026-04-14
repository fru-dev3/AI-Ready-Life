# AI Ready Life: Health Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/AIReadyLife/vault/health/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/AIReadyLife/vault/health/` does not exist or is empty:

1. Purchase the **AI Ready Life: Health Vault** at [frudev.gumroad.com/l/aireadylife-health](https://frudev.gumroad.com/l/aireadylife-health)
2. Unzip the download
3. Move the `health/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/health/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

The vault includes the full folder structure, a config template, a Quick Start guide, and a prompt reference for every skill in this plugin.

## Vault Structure

```
~/Documents/AIReadyLife/vault/health/
├── 00_current/
├── 01_labs/
├── 02_visits/
├── 03_briefs/
├── 04_archive/
└── config.md
└── open-loops.md
```

- `00_current/` — Active health documents and current state
- `01_labs/` — Lab results organized by year/month
- `02_visits/` — Visit notes and medical records
- `03_briefs/` — Monthly health review briefs
- `04_archive/` — Prior years by year

## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/AIReadyLife/vault/health/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding

## Coverage

This plugin manages your labs, wellness, medications, appointments, and insurance.
