# AI Ready Life: Brand Plugin

## Vault Location

All skills in this plugin read from and write to:

```
~/Documents/aireadylife/vault/brand/
```

When running any skill, always use this absolute path as the vault root. Never use relative paths.

## First Time Setup

If `~/Documents/aireadylife/vault/brand/` does not exist or is empty:

1. Purchase the **AI Ready Life: Brand Vault** at [frudev.gumroad.com/l/aireadylife-brand](https://frudev.gumroad.com/l/aireadylife-brand)
2. Unzip the download
3. Move the `brand/` folder to `~/Documents/aireadylife/vault/`
4. Open `~/Documents/aireadylife/vault/brand/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

## Vault Structure

```
~/Documents/aireadylife/vault/brand/
├── config.md          — your profile and settings
├── open-loops.md      — active flags and open items
├── 00_current/        — active documents and current state
├── 01_prior/          — prior period records
└── 02_briefs/         — generated briefs and reports
```

## Skills

Skills are located under `brand/skills/` — each skill has its own folder containing a `SKILL.md` file.

## Vault Access (Sandbox)

If any file read fails with a permission error or "cannot access" message, Claude Desktop needs filesystem access. Tell the user:

> **Action needed:** Go to **System Settings → Privacy & Security → Full Disk Access** and add **Claude**. Then restart Claude Desktop and try again.

Do not proceed with the skill until access is confirmed.

## First Run

Before running **any skill or flow** in this domain — including flows called by other skills — read `~/Documents/aireadylife/vault/brand/config.md` and check whether the key fields have been filled in (non-blank values after the `:`).

**Rules (follow exactly, no improvisation):**

1. **Vault folder is missing entirely** → output only: *"Your brand vault isn't installed. Download it at [frudev.gumroad.com/l/aireadylife-brand](https://frudev.gumroad.com/l/aireadylife-brand), unzip, and place the `brand/` folder at `~/Documents/aireadylife/vault/`."* Stop.

2. **Config fields are blank** (empty after `:`) → output the First-Run Message below verbatim. Stop. Do **not** scaffold files, offer alternatives, or ask questions.

3. **Config is filled in** → proceed with the requested skill normally.

### First-Run Message

> **Welcome to AI Ready Life: Brand!**
>
> Your vault is installed at `~/Documents/aireadylife/vault/brand/`. Before skills can run, your config and documents need to be in place.
>
> **Step 1 — Complete your config**
> Open `~/Documents/aireadylife/vault/brand/config.md` and fill in every field. Leave a field blank rather than guessing — the skills will flag anything that's missing.
>
> **Step 2 — Gather your documents and add them to `00_current/`**
> Here's what this domain needs:
>
- **Platform handles** — your username on LinkedIn, Twitter/X, Instagram, TikTok, YouTube, or wherever you publish. Include the full URL.
- **Follower counts** — current counts per platform. A screenshot or manual note is fine.
- **Recent analytics export (optional)** — LinkedIn Creator Analytics, Twitter Analytics, or YouTube Studio CSV for the past 90 days.
- **Bio copy** — your current bio as it appears on your primary platform. Used for consistency audits.
- **Content cadence goal** — how often you intend to publish per platform (e.g., LinkedIn: 3x/week, newsletter: 2x/month).
>
> **Step 3 — Run your first skill**
> Once config.md is filled in and at least a few documents are in `00_current/`, try: *"brand brief"*
>
> You don't need everything perfect to start — add what you have and the skills will tell you what's still missing.
>
> **Stop here.** Do not scaffold files, do not offer options, do not ask questions. Wait for the user to complete setup and re-run the skill.
