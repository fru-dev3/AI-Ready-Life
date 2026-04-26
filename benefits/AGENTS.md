<!-- Codex / non-Claude agents: this file mirrors CLAUDE.md so any AGENTS.md-aware agent (Codex CLI, etc.) reads the same instructions. Both files stay in sync. -->

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

## Skill Index

Skills live in `skills/<skill-name>/SKILL.md`. To run a skill, read its `SKILL.md` and follow the instructions inside.

- **`adp`** — Accesses pay stubs, W-2 documents, YTD earnings breakdowns, 401k contribution deductions, and benefit deduction details from ADP Workforce Now or MyADP via Playwright with Chrome cookie session.
- **`benefits-flow-analyze-401k-allocation`** — Analyzes 401k fund allocation against target, checks employer match capture, calculates allocation drift per fund (flagging drift > 5 percentage points), runs a retirement balance projection at assumed 7% average annual return, and returns structured results to the calling op.
- **`benefits-flow-build-coverage-summary`** — Compiles a structured coverage table for all active employer benefits — medical plan with deductible and OOP limits + YTD spend, dental, vision, 401k match rate and YTD, HSA contribution pace, life insurance face value, and disability income replacement rate.
- **`benefits-flow-check-hsa-balance`** — Reads HSA account data to produce a complete balance snapshot: cash vs.
- **`benefits-op-401k-review`** — Monthly 401k review covering employer match capture rate, YTD contribution progress vs.
- **`benefits-op-coverage-review`** — Quarterly benefits coverage audit verifying active elections match what was chosen at enrollment and checking coverage limits against current assets, liabilities, and income.
- **`benefits-op-enrollment-review`** — Annual open enrollment planner comparing medical, dental, vision, FSA/HSA plan options by modeling total annual cost under three utilization scenarios (healthy year, moderate, worst-case hitting OOP max).
- **`benefits-op-hsa-review`** — Monthly HSA review tracking YTD contributions vs.
- **`benefits-op-review-brief`** — Monthly benefits brief compiling 401k match capture status, YTD vs.
- **`benefits-task-extract-coverage-limit`** — Reads a specific coverage limit value — deductible, OOP max, HSA IRS limit, life insurance face value, disability benefit amount, dental annual max — from vault/benefits/00_current/ plan documents.
- **`benefits-task-flag-enrollment-window`** — Writes an urgent enrollment deadline alert to vault/benefits/open-loops.md when the open enrollment window is active or approaching.
- **`benefits-task-update-open-loops`** — Maintains vault/benefits/open-loops.md as the canonical list of outstanding benefits action items.
- **`hsa-portal`** — Accesses HSA account balance (cash and invested), YTD employee and employer contributions vs.
- **`workday`** — Accesses employer benefits elections, 401k contribution rate, HSA payroll election, open enrollment options, life event changes, and pay stubs from Workday HCM via Playwright with Chrome cookie session.
