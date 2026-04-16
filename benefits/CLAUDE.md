# AI Ready Life: Benefits Plugin

## Vault Location

| OS | Vault path |
|----|------------|
| **Mac** | `~/Documents/aireadylife/vault/benefits/` |
| **Windows** | `%USERPROFILE%\Documents\aireadylife\vault\benefits\` |

Determine the user's OS from context (file paths they share, or ask if unclear). Use the correct path for their OS. Never use relative paths.

## First Time Setup

If `~/Documents/aireadylife/vault/benefits/` does not exist or is empty:

1. Purchase the **AI Ready Life: Benefits Vault** at [frudev.gumroad.com/l/aireadylife-benefits](https://frudev.gumroad.com/l/aireadylife-benefits)
2. Unzip the download
3. Move the `benefits/` folder to `~/Documents/aireadylife/vault/`
4. Open `~/Documents/aireadylife/vault/benefits/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

## Vault Structure

```
~/Documents/aireadylife/vault/benefits/
├── config.md          — your profile and settings
├── open-loops.md      — active flags and open items
├── 00_current/        — active documents and current state
├── 01_prior/          — prior period records
└── 02_briefs/         — generated briefs and reports
```

## Skills

Skills are located under `benefits/skills/` — each skill has its own folder containing a `SKILL.md` file.

## Vault Access

**Mac:** If a file read fails with a permission error, Claude Desktop needs filesystem access. Tell the user:
> *Go to **System Settings → Privacy & Security → Full Disk Access**, add **Claude**, then restart Claude Desktop.*

**Windows:** Claude Desktop runs unrestricted — no permission grant needed.

Do not proceed with the skill until access is confirmed (Mac) or reassure the user that no action is needed (Windows).

## First Run

Before running **any skill or flow** in this domain — including flows called by other skills — read `~/Documents/aireadylife/vault/benefits/config.md` and check whether the key fields have been filled in (non-blank values after the `:`).

**Rules (follow exactly, no improvisation):**

1. **Vault folder is missing entirely** → output only: *"Your benefits vault isn't installed. Download it at [frudev.gumroad.com/l/aireadylife-benefits](https://frudev.gumroad.com/l/aireadylife-benefits), unzip, and place the `benefits/` folder at `~/Documents/aireadylife/vault/`."* Stop.

2. **Config fields are blank** (empty after `:`) → output the First-Run Message below verbatim. Stop. Do **not** scaffold files, offer alternatives, or ask questions.

3. **Config is filled in** → proceed with the requested skill normally.

### First-Run Message

> **Welcome to AI Ready Life: Benefits!**
>
> Your vault is installed at:
> - **Mac:** `~/Documents/aireadylife/vault/benefits/`
> - **Windows:** `%USERPROFILE%\Documents\aireadylife\vault\benefits\` Before skills can run, your config and documents need to be in place.
>
> **Step 1 — Complete your config**
> Open `~/Documents/aireadylife/vault/benefits/config.md` and fill in every field. Leave a field blank rather than guessing — the skills will flag anything that's missing.
>
> **Step 2 — Gather your documents and add them to `00_current/`**
> Here's what this domain needs:
>
- **Benefits confirmation** — the enrollment summary or confirmation PDF from Workday, ADP, or your HR portal. Lists every elected benefit with coverage amounts.
- **401k statement** — most recent, showing contribution rate, employer match rate, and current balance.
- **HSA account statement** — current balance, YTD contributions, and investment balance if applicable.
- **Pay stub** — most recent, to verify benefit deductions (medical, dental, vision, life, 401k) are being withheld.
- **Benefits guide or SBC** — the Summary of Benefits and Coverage document for your medical plan, showing deductible, OOP max, and copay structure.
>
> **Step 3 — Run your first skill**
> Once config.md is filled in and at least a few documents are in `00_current/`, try: *"benefits brief"*
>
> You don't need everything perfect to start — add what you have and the skills will tell you what's still missing.
>
> **Stop here.** Do not scaffold files, do not offer options, do not ask questions. Wait for the user to complete setup and re-run the skill.
