# AI Ready Life: Social Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/AIReadyLife/vault/social/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/AIReadyLife/vault/social/` does not exist or is empty:

1. Purchase the **AI Ready Life: Social Vault** at [frudev.gumroad.com/l/aireadylife-social](https://frudev.gumroad.com/l/aireadylife-social)
2. Unzip the download
3. Move the `social/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/social/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

The vault includes the full folder structure, a config template, a Quick Start guide, and a prompt reference for every skill in this plugin.

## Vault Structure

```
~/Documents/AIReadyLife/vault/social/
├── 00_current/
├── 01_contacts/
├── 02_birthdays/
├── 03_briefs/
├── 04_archive/
└── config.md
└── open-loops.md
```

- `00_current/` — Active contact list and current relationship health
- `01_contacts/` — Contact profiles by tier with birthday and notes
- `02_birthdays/` — Birthday and milestone calendar by month
- `03_briefs/` — Weekly social review briefs
- `04_archive/` — Outreach log history by year

## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/AIReadyLife/vault/social/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding

## Coverage

This plugin manages your contacts, birthdays, relationship health, and outreach.
