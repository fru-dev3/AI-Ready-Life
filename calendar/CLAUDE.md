# AI Ready Life: Calendar Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/AIReadyLife/vault/calendar/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/AIReadyLife/vault/calendar/` does not exist or is empty:

1. Purchase the **AI Ready Life: Calendar Vault** at [frudev.gumroad.com/l/aireadylife-calendar](https://frudev.gumroad.com/l/aireadylife-calendar)
2. Unzip the download
3. Move the `calendar/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/calendar/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

The vault includes the full folder structure, a config template, a Quick Start guide, and a prompt reference for every skill in this plugin.

## Vault Structure

```
~/Documents/AIReadyLife/vault/calendar/
├── 01_events/
├── 02_deadlines/
├── 03_focus-time/
├── 04_reviews/
└── config.md
└── open-loops.md
```

- `01_events/` — Key event archive by month
- `02_deadlines/` — Cross-domain deadline registry
- `03_focus-time/` — Deep work audit history
- `04_reviews/` — Weekly and quarterly review notes

## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/AIReadyLife/vault/calendar/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding

## Coverage

This plugin manages your events, deadlines, focus time, and scheduling.
