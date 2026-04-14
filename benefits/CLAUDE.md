# AI Ready Life: Benefits Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/AIReadyLife/vault/benefits/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/AIReadyLife/vault/benefits/` does not exist or is empty:

1. Purchase the **AI Ready Life: Benefits Vault** at [frudev.gumroad.com/l/aireadylife-benefits](https://frudev.gumroad.com/l/aireadylife-benefits)
2. Unzip the download
3. Move the `benefits/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/benefits/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

The vault includes the full folder structure, a config template, a Quick Start guide, and a prompt reference for every skill in this plugin.

## Vault Structure

```
~/Documents/AIReadyLife/vault/benefits/
├── 01_retirement/
├── 02_hsa/
├── 03_coverage/
├── 04_enrollment/
├── 05_documents/
└── config.md
└── open-loops.md
```

- `01_retirement/` — 401k statements and employer match records
- `02_hsa/` — HSA statements, investment elections, and receipts
- `03_coverage/` — Insurance cards, SBCs, EOBs, and coverage docs
- `04_enrollment/` — Annual enrollment choices and beneficiary forms
- `05_documents/` — All benefit documents organized by year

## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/AIReadyLife/vault/benefits/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding

## Coverage

This plugin manages your 401k, HSA, open enrollment, equity, and ESPP.
