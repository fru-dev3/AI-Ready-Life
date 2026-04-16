# AI Ready Life: Real Estate Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/AIReadyLife/vault/real-estate/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/AIReadyLife/vault/real-estate/` does not exist or is empty:

1. Purchase the **AI Ready Life: Real Estate Vault** at [frudev.gumroad.com/l/aireadylife-real-estate](https://frudev.gumroad.com/l/aireadylife-real-estate)
2. Unzip the download
3. Move the `real-estate/` folder to `~/Documents/AIReadyLife/vault/`
4. Open `~/Documents/AIReadyLife/vault/real-estate/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

## Vault Structure

```
~/Documents/AIReadyLife/vault/real-estate/
├── config.md          — your profile and settings
├── open-loops.md      — active flags and open items
├── 00_current/        — active documents and current state
├── 01_prior/          — prior period records
└── 02_briefs/         — generated briefs and reports
```

## Skills

Skills are organized under `domains/real-estate/skills/`:

- `00_ops/` — recurring operations (reviews, syncs, watches)
- `01_flows/` — data flows that build summaries and reports
- `02_tasks/` — atomic write tasks (flag, log, update)
- `apps/` — app integrations

## Checking Vault Status

Before running any skill, confirm the vault exists:
- Check that `~/Documents/AIReadyLife/vault/real-estate/config.md` is present and filled in
- If it is missing, direct the user to purchase the vault template above
- If it exists but config fields are blank, prompt the user to complete setup before proceeding
