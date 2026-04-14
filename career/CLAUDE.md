# AI Ready Life: Career Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/AIReadyLife/vault/career/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/AIReadyLife/vault/career/` does not exist or is empty:

1. Purchase the **AI Ready Life: Career Vault** at [frudev.gumroad.com/l/aireadylife-career](https://frudev.gumroad.com/l/aireadylife-career)
2. Unzip the download
3. Move the `career/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/career/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

The vault includes the full folder structure, a config template, a Quick Start guide, and a prompt reference for every skill in this plugin.

## Vault Structure

```
~/Documents/AIReadyLife/vault/career/
├── 00_current/
├── 01_compensation/
├── 02_market/
├── 03_pipeline/
├── 04_briefs/
├── 05_archive/
└── config.md
└── open-loops.md
```

- `00_current/` — Current comp, open loops, config
- `01_compensation/` — Pay stubs, equity statements, offer letters, comp history
- `02_market/` — Market surveys, benchmark data, target role requirements
- `03_pipeline/` — Active applications, interview notes, offer comparisons
- `04_briefs/` — Monthly career review briefs
- `05_archive/` — Prior employers and closed searches

## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/AIReadyLife/vault/career/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding

## Coverage

This plugin manages your compensation, job market, pipeline, and skills gaps.
