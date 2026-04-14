# AI Ready Life: Records Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/AIReadyLife/vault/records/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/AIReadyLife/vault/records/` does not exist or is empty:

1. Purchase the **AI Ready Life: Records Vault** at [frudev.gumroad.com/l/aireadylife-records](https://frudev.gumroad.com/l/aireadylife-records)
2. Unzip the download
3. Move the `records/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/records/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

The vault includes the full folder structure, a config template, a Quick Start guide, and a prompt reference for every skill in this plugin.

## Vault Structure

```
~/Documents/AIReadyLife/vault/records/
├── 00_current/
├── 01_ids/
├── 02_legal/
├── 03_briefs/
├── 04_archive/
└── config.md
└── open-loops.md
```

- `00_current/` — Active document inventory and subscription list
- `01_ids/` — ID document scans and expiration tracking
- `02_legal/` — Legal document index with storage locations
- `03_briefs/` — Monthly records review briefs
- `04_archive/` — Expired documents and cancelled subscriptions

## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/AIReadyLife/vault/records/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding

## Coverage

This plugin manages your documents, expiring IDs, and subscriptions.
