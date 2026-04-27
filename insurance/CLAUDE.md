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

**Apps (data connectors — fallback when no native MCP connector available):**
- `app-insurance-portal.portal` — Policy documents, coverage details, premiums, renewal dates, and claim status from any personal insurance carrier's online portal via Playwright with Chrome cookie session.
- `app-policygenius` — Comparison quotes for term life, disability income, and umbrella liability policies on PolicyGenius. (Auto and home shopping is direct-to-carrier — see `op-shop-property-and-auto`.)

**Operations (user-facing routines):**
- `op-coverage-audit` — Annual comprehensive insurance portfolio audit comparing all coverage limits to current assets, income, and liabilities. Inlines the former `flow-analyze-coverage-gaps` scoring.
- `op-renewal-watch` — Monthly renewal watch scanning all policy renewal dates and flagging anything renewing within 60 days. Inlines the former `flow-check-renewal-dates` categorization.
- `op-claims-review` — On-demand claims management across the full claim lifecycle.
- `op-review-brief` — Monthly insurance brief: active premiums, upcoming renewals, active claims, total spend, top coverage gaps.
- `op-document-claims-process` — Generates a one-page claims runbook per active policy category (carrier line, portal URL, doc checklist, filing deadline).
- `op-shop-property-and-auto` — Triggered by shop-categorized renewals: builds an apples-to-apples quote sheet and walks through 3-4 carriers for auto/home/landlord (PolicyGenius covers life/disability/umbrella only).
- `op-property-coverage-sync` — Annual replacement-cost vs dwelling-coverage check with 80% coinsurance flag. Auto-skipped for renters (`scope: renter` in config).
- `op-life-event-coverage-trigger` — Watches for marriage, divorce, baby, home purchase, mortgage payoff, job change, retirement, death and surfaces per-policy adjustments.
- `op-open-enrollment-readiness` — Annual employer-benefits enrollment math: prior-year utilization × plan options × HSA/FSA targeting.
- `op-medicare-planning` *(advanced/optional)* — Part A/B/C/D, Medigap vs Advantage, IRMAA, enrollment-window timing for users 55+.
- `op-long-term-care-evaluation` *(advanced/optional)* — LTC insurance vs hybrid product vs self-funding, every 2-3 years for users 50+.

**Flows (multi-step internals called by ops):**
- `flow-build-coverage-summary` — Coverage matrix from all active policies (carrier, type, limits, deductible, premium, renewal date).
- `flow-sync-policy-docs` — Iterates carriers, calls `app-insurance-portal.portal` to download declarations PDFs, then calls `task-extract-policy-terms`. Manual upload is a first-class path.
- `flow-deductible-progress-snapshot` — YTD progress against health deductible + OOP max + auto deductible. Drives "schedule before or after EOY" decisions.

**Tasks (atomic operations called by flows / ops):**
- `task-extract-policy-terms` — Reads a policy PDF and produces a normalized record (deductible, OOP max, limits, exclusions, claims contact). Carrier-jargon-to-canonical mapping.
- `task-flag-coverage-gap` — Writes a structured coverage-gap flag to open-loops with severity, exposure, premium-to-close.
- `task-update-open-loops` — Single write point for `open-loops.md`. Manages RENEWAL, COVERAGE-GAP, MISSING-POLICY, CLAIM-ACTION, CLAIM-STALLED, PREMIUM-INCREASE, COVERAGE-DATA-STALE, BENEFICIARY-STALE, LIFE-EVENT-COVERAGE flag types. Absorbs the former `task-flag-renewal-within-60-days` as a RENEWAL flag-type handler.
- `task-review-beneficiaries` — Annual sweep across life policies, retirement accounts, brokerage TOD, bank POD, 529. Surfaces ex-spouse-named, deceased-named, missing-contingent.
- `task-sync-to-cross-agents` — After audit/sync, propagates current insurance facts into health, home, real-estate, wealth, and career vaults (only those installed).
- `task-track-claim-status` — Per-claim ledger: status, deadlines, document requests, follow-ups; flags claims stalled >30 days.
- `task-evaluate-umbrella-coverage` *(advanced/optional)* — Net-worth + exposure-factor sizing of umbrella; underlying-limit gap detection.
