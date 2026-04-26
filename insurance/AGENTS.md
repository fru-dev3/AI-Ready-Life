<!-- Codex / non-Claude agents: this file mirrors CLAUDE.md so any AGENTS.md-aware agent (Codex CLI, etc.) reads the same instructions. Both files stay in sync. -->

# AI Ready Life: Insurance Plugin

## Vault Location

| OS | Vault path |
|----|------------|
| **Mac** | `~/Documents/aireadylife/vault/insurance/` |
| **Windows** | `%USERPROFILE%\Documents\aireadylife\vault\insurance\` |

Determine the user's OS from context (file paths they share, or ask if unclear). Use the correct path for their OS. Never use relative paths.

## First Time Setup

If `~/Documents/aireadylife/vault/insurance/` does not exist or is empty:

1. Purchase the **AI Ready Life: Insurance Vault** at [frudev.gumroad.com/l/aireadylife-insurance](https://frudev.gumroad.com/l/aireadylife-insurance)
2. Unzip the download
3. Move the `insurance/` folder to `~/Documents/aireadylife/vault/`
4. Open `~/Documents/aireadylife/vault/insurance/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

## Vault Structure

```
~/Documents/aireadylife/vault/insurance/
├── config.md          — your profile and settings
├── open-loops.md      — active flags and open items
├── 00_current/        — active documents and current state
├── 01_prior/          — prior period records
└── 02_briefs/         — generated briefs and reports
```

## Skills

Skills are located under `insurance/skills/` — each skill has its own folder containing a `SKILL.md` file.

## Vault Access

**Mac:** If a file read fails with a permission error, Claude Desktop needs filesystem access. Tell the user:
> *Go to **System Settings → Privacy & Security → Full Disk Access**, add **Claude**, then restart Claude Desktop.*

**Windows:** Claude Desktop runs unrestricted — no permission grant needed.

Do not proceed with the skill until access is confirmed (Mac) or reassure the user that no action is needed (Windows).

## First Run

Before running **any skill or flow** in this domain — including flows called by other skills — read `~/Documents/aireadylife/vault/insurance/config.md` and check whether the key fields have been filled in (non-blank values after the `:`).

**Rules (follow exactly, no improvisation):**

1. **Vault folder is missing entirely** → output only: *"Your insurance vault isn't installed. Download it at [frudev.gumroad.com/l/aireadylife-insurance](https://frudev.gumroad.com/l/aireadylife-insurance), unzip, and place the `insurance/` folder at `~/Documents/aireadylife/vault/`."* Stop.

2. **Config fields are blank** (empty after `:`) → output the First-Run Message below verbatim. Stop. Do **not** scaffold files, offer alternatives, or ask questions.

3. **Config is filled in** → proceed with the requested skill normally.

### First-Run Message

> **Welcome to AI Ready Life: Insurance!**
>
> Your vault is installed at:
> - **Mac:** `~/Documents/aireadylife/vault/insurance/`
> - **Windows:** `%USERPROFILE%\Documents\aireadylife\vault\insurance\` Before skills can run, your config and documents need to be in place.
>
> **Step 1 — Complete your config**
> Open `~/Documents/aireadylife/vault/insurance/config.md` and fill in every field. Leave a field blank rather than guessing — the skills will flag anything that's missing.
>
> **Step 2 — Gather your documents and add them to `00_current/`**
> Here's what this domain needs:
>
- **Health insurance** — plan name, insurer, policy number, deductible, OOP max, monthly premium, and renewal date.
- **Auto insurance** — insurer, policy number, coverage limits, monthly premium, and renewal date for each vehicle.
- **Home or renters insurance** — insurer, policy number, dwelling coverage amount, monthly premium, and renewal date.
- **Life insurance** — insurer, policy type (term/whole), face value, annual premium, and beneficiaries.
- **Disability insurance** — employer-provided LTD: benefit percentage, monthly cap, waiting period. Any supplemental disability policy.
- **Umbrella policy (if any)** — insurer, coverage limit, annual premium.
>
> **Step 3 — Run your first skill**
> Once config.md is filled in and at least a few documents are in `00_current/`, try: *"coverage audit"*
>
> You don't need everything perfect to start — add what you have and the skills will tell you what's still missing.
>
> **Stop here.** Do not scaffold files, do not offer options, do not ask questions. Wait for the user to complete setup and re-run the skill.

## Skill Index

Skills live in `skills/<skill-name>/SKILL.md`. To run a skill, read its `SKILL.md` and follow the instructions inside.

- **`insurance-flow-analyze-coverage-gaps`** — Compares all coverage limits to current assets, income, and liabilities to identify meaningful gaps.
- **`insurance-flow-build-coverage-summary`** — Compiles a full coverage matrix from all active insurance policies: carrier, policy type, coverage limits (per-occurrence and aggregate), deductible, annual premium, and renewal date.
- **`insurance-flow-check-renewal-dates`** — Reads all policy renewal dates, calculates days until renewal, filters to policies renewing within 60 days, and categorizes each as shop/auto-renew/coverage-review.
- **`insurance-op-claims-review`** — On-demand claims management covering the full claim lifecycle: initial filing steps with documentation checklist, active claim status tracking with adjuster follow-up actions, settlement offer adequacy review, stall detection (claims open 30+ days without status update), and denial appeal guidance.
- **`insurance-op-coverage-audit`** — Annual comprehensive insurance portfolio audit comparing all coverage limits to current assets, income, and liabilities.
- **`insurance-op-renewal-watch`** — Monthly renewal watch scanning all policy renewal dates and flagging anything renewing within 60 days.
- **`insurance-op-review-brief`** — Monthly insurance brief compiling all active policy premiums and renewal dates, policies renewing within 60 days with recommended action, active claims status, total annual premium spend, and top coverage gaps from the most recent audit.
- **`insurance-portal`** — Accesses policy documents, coverage details, premium amounts, renewal dates, and claim status from any personal insurance carrier's online portal via Playwright with Chrome cookie session.
- **`insurance-task-flag-coverage-gap`** — Writes a structured coverage gap flag to vault/insurance/open-loops.md with coverage type, current limit, recommended limit, financial exposure of the gap (in dollars), severity rating (minor/moderate/significant), estimated annual premium to close, and specific recommended action.
- **`insurance-task-flag-renewal-within-60-days`** — Writes a structured renewal alert to vault/insurance/open-loops.md with policy type, carrier, renewal date, current premium, prior year premium (if available for change detection), action category (shop/auto-renew/coverage-review), and specific action steps.
- **`insurance-task-update-open-loops`** — Maintains vault/insurance/open-loops.md as the canonical list of outstanding insurance action items.
- **`policygenius`** — Accesses insurance comparison quotes for term life, disability income, and umbrella liability policies on PolicyGenius.
