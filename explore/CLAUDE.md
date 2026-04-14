# AI Ready Life: Travel Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/AIReadyLife/vault/explore/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/AIReadyLife/vault/explore/` does not exist or is empty:

1. Purchase the **AI Ready Life: Travel Vault** at [frudev.gumroad.com/l/aireadylife-explore](https://frudev.gumroad.com/l/aireadylife-explore)
2. Unzip the download
3. Move the `explore/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/explore/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

The vault includes the full folder structure, a config template, a Quick Start guide, and a prompt reference for every skill in this plugin.

## Vault Structure

```
~/Documents/AIReadyLife/vault/explore/
├── 00_current/
├── 01_trips/
├── 02_wishlist/
├── 03_briefs/
├── 04_archive/
└── config.md
└── open-loops.md
```

- `00_current/` — Active travel state and upcoming trip details
- `01_trips/` — Booked and past trips with itineraries and receipts
- `02_wishlist/` — Destination wishlist with budget estimates
- `03_briefs/` — Monthly explore review briefs
- `04_archive/` — Past trips by year

## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/AIReadyLife/vault/explore/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding

## Coverage

This plugin manages your trips, travel docs, wishlist, and itineraries.
