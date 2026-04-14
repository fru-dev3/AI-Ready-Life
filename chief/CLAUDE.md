# AI Ready Life: Chief Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/AIReadyLife/vault/chief/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/AIReadyLife/vault/chief/` does not exist or is empty:

1. Purchase the **AI Ready Life: Chief Vault** at [frudev.gumroad.com/l/aireadylife-chief](https://frudev.gumroad.com/l/aireadylife-chief)
2. Unzip the download
3. Move the `chief/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/chief/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

The vault includes the full folder structure, a config template, a Quick Start guide, and a prompt reference for every skill in this plugin.

## Vault Structure

```
~/Documents/AIReadyLife/vault/chief/
├── 01_briefs/
├── 02_open-loops/
├── 03_system/
└── config.md
└── open-loops.md
```

- `01_briefs/` — Daily AM/PM briefs archive
- `02_open-loops/` — Cross-domain open items tracker
- `03_system/` — Agent health reports, vault completeness

## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/AIReadyLife/vault/chief/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding

## Coverage

This plugin manages your daily briefs, open loops, and cross-domain orchestration.
