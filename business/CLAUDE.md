# AI Ready Life: Business Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/AIReadyLife/vault/business/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/AIReadyLife/vault/business/` does not exist or is empty:

1. Purchase the **AI Ready Life: Business Vault** at [frudev.gumroad.com/l/aireadylife-business](https://frudev.gumroad.com/l/aireadylife-business)
2. Unzip the download
3. Move the `business/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/business/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

The vault includes the full folder structure, a config template, a Quick Start guide, and a prompt reference for every skill in this plugin.

## Vault Structure

```
~/Documents/AIReadyLife/vault/business/
├── 01_revenue/
├── 02_expenses/
├── 03_compliance/
├── 04_payroll/
├── 05_contracts/
└── config.md
└── open-loops.md
```

- `01_revenue/` — Invoices, payment records, revenue by stream
- `02_expenses/` — Receipts and categorized expense reports
- `03_compliance/` — Annual reports, registered agent, EIN docs, operating agreements
- `04_payroll/` — Owner distributions, contractor payments, 1099 preparation
- `05_contracts/` — Active contracts, SOWs, NDAs

## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/AIReadyLife/vault/business/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding

## Coverage

This plugin manages your P&L, invoicing, compliance, and entity management.
