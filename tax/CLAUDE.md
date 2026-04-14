# AI Ready Life: Tax Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/AIReadyLife/vault/tax/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/AIReadyLife/vault/tax/` does not exist or is empty:

1. Purchase the **AI Ready Life: Tax Vault** at [frudev.gumroad.com/l/aireadylife-tax](https://frudev.gumroad.com/l/aireadylife-tax)
2. Unzip the download
3. Move the `tax/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/tax/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

The vault includes the full folder structure, a config template, a Quick Start guide, and a prompt reference for every skill in this plugin.

## Vault Structure

```
~/Documents/AIReadyLife/vault/tax/
├── 00_current/
├── 01_federal/
├── 02_state/
├── 03_entities/
├── 04_briefs/
├── 05_archive/
└── config.md
└── open-loops.md
```

- `00_current/` — Current tax year: documents, estimates, open loops
- `01_federal/` — Federal returns, W-2s, 1099s, K-1s by year
- `02_state/` — State returns and payments by state/year
- `03_entities/` — Entity filings: LLC/S-corp returns, registered agent, annual reports
- `04_briefs/` — Monthly tax review briefs
- `05_archive/` — Prior years (fully filed)

## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/AIReadyLife/vault/tax/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding

## Coverage

This plugin manages your deadlines, estimates, deductions, entity compliance, and filing.
