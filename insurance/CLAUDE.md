# AI Ready Life: Insurance Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/AIReadyLife/vault/insurance/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/AIReadyLife/vault/insurance/` does not exist or is empty:

1. Purchase the **AI Ready Life: Insurance Vault** at [frudev.gumroad.com/l/aireadylife-insurance](https://frudev.gumroad.com/l/aireadylife-insurance)
2. Unzip the download
3. Move the `insurance/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/insurance/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

The vault includes the full folder structure, a config template, a Quick Start guide, and a prompt reference for every skill in this plugin.

## Vault Structure

```
~/Documents/AIReadyLife/vault/insurance/
├── 00_current/
├── 01_policies/
├── 02_claims/
├── 03_briefs/
├── 04_archive/
└── config.md
└── open-loops.md
```

- `00_current/` — Active policy summary, current premiums, and open claims
- `01_policies/` — Policy documents organized by type
- `02_claims/` — Active and resolved claims with documentation
- `03_briefs/` — Monthly insurance review briefs
- `04_archive/` — Prior policy versions by year

## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/AIReadyLife/vault/insurance/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding

## Coverage

This plugin manages your policies, renewals, coverage gaps, and claims.
