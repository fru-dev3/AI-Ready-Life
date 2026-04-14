# AI Ready Life: Vision Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/AIReadyLife/vault/vision/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/AIReadyLife/vault/vision/` does not exist or is empty:

1. Purchase the **AI Ready Life: Vision Vault** at [frudev.gumroad.com/l/aireadylife-vision](https://frudev.gumroad.com/l/aireadylife-vision)
2. Unzip the download
3. Move the `vision/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/vision/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

The vault includes the full folder structure, a config template, a Quick Start guide, and a prompt reference for every skill in this plugin.

## Vault Structure

```
~/Documents/AIReadyLife/vault/vision/
├── 00_current/
├── 01_goals/
├── 02_scorecard/
├── 03_briefs/
├── 04_planning/
├── 05_archive/
└── config.md
└── open-loops.md
```

- `00_current/` — Active vision document and current OKRs
- `01_goals/` — Quarterly OKR history by year/quarter
- `02_scorecard/` — Monthly 13-domain life scorecard history
- `03_briefs/` — Monthly vision review briefs
- `04_planning/` — Quarterly planning session notes and outcomes
- `05_archive/` — Prior year vision docs and annual reviews

## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/AIReadyLife/vault/vision/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding

## Coverage

This plugin manages your goals, scorecard, quarterly plans, and milestones.
