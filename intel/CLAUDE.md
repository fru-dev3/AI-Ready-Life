# AI Ready Life: Intelligence Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/AIReadyLife/vault/intel/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/AIReadyLife/vault/intel/` does not exist or is empty:

1. Purchase the **AI Ready Life: Intelligence Vault** at [frudev.gumroad.com/l/aireadylife-intel](https://frudev.gumroad.com/l/aireadylife-intel)
2. Unzip the download
3. Move the `intel/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/intel/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

The vault includes the full folder structure, a config template, a Quick Start guide, and a prompt reference for every skill in this plugin.

## Vault Structure

```
~/Documents/AIReadyLife/vault/intel/
├── 00_current/
├── 01_briefs/
├── 02_threads/
├── 03_archive/
└── config.md
└── open-loops.md
```

- `00_current/` — Active config and today's brief
- `01_briefs/` — Daily brief archive organized by year/month
- `02_threads/` — Multi-day story threads being tracked
- `03_archive/` — Prior months by year

## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/AIReadyLife/vault/intel/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding

## Coverage

This plugin manages your news briefings, threads, and curated sources.
