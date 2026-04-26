<!-- Codex / non-Claude agents: this file mirrors CLAUDE.md so any AGENTS.md-aware agent (Codex CLI, etc.) reads the same instructions. Both files stay in sync. -->

# AI Ready Life: Health Plugin

## Vault Location

| OS | Vault path |
|----|------------|
| **Mac** | `~/Documents/aireadylife/vault/health/` |
| **Windows** | `%USERPROFILE%\Documents\aireadylife\vault\health\` |

Determine the user's OS from context (file paths they share, or ask if unclear). Use the correct path for their OS. Never use relative paths.

## First Time Setup

If `~/Documents/aireadylife/vault/health/` does not exist or is empty:

1. Purchase the **AI Ready Life: Health Vault** at [frudev.gumroad.com/l/aireadylife-health](https://frudev.gumroad.com/l/aireadylife-health)
2. Unzip the download
3. Move the `health/` folder to `~/Documents/aireadylife/vault/`
4. Open `~/Documents/aireadylife/vault/health/config.md` and fill in your details
5. Return here and run any skill — it will find your vault automatically

## Vault Structure

```
~/Documents/aireadylife/vault/health/
├── config.md          — your profile and settings
├── open-loops.md      — active flags and open items
├── 00_current/        — active documents and current state
├── 01_prior/          — prior period records
└── 02_briefs/         — generated briefs and reports
```

## Skills

Skills are located under `health/skills/` — each skill has its own folder containing a `SKILL.md` file.

## Vault Access

**Mac:** If a file read fails with a permission error, Claude Desktop needs filesystem access. Tell the user:
> *Go to **System Settings → Privacy & Security → Full Disk Access**, add **Claude**, then restart Claude Desktop.*

**Windows:** Claude Desktop runs unrestricted — no permission grant needed.

Do not proceed with the skill until access is confirmed (Mac) or reassure the user that no action is needed (Windows).

## First Run

Before running **any skill or flow** in this domain — including flows called by other skills — read `~/Documents/aireadylife/vault/health/config.md` and check whether the key fields have been filled in (non-blank values after the `:`).

**Rules (follow exactly, no improvisation):**

1. **Vault folder is missing entirely** → output only: *"Your health vault isn't installed. Download it at [frudev.gumroad.com/l/aireadylife-health](https://frudev.gumroad.com/l/aireadylife-health), unzip, and place the `health/` folder at `~/Documents/aireadylife/vault/`."* Stop.

2. **Config fields are blank** (empty after `:`) → output the First-Run Message below verbatim. Stop. Do **not** scaffold files, offer alternatives, or ask questions.

3. **Config is filled in** → proceed with the requested skill normally.

### First-Run Message

> **Welcome to AI Ready Life: Health!**
>
> Your vault is installed at:
> - **Mac:** `~/Documents/aireadylife/vault/health/`
> - **Windows:** `%USERPROFILE%\Documents\aireadylife\vault\health\` Before skills can run, your config and documents need to be in place.
>
> **Step 1 — Complete your config**
> Open `~/Documents/aireadylife/vault/health/config.md` and fill in every field. Leave a field blank rather than guessing — the skills will flag anything that's missing.
>
> **Step 2 — Gather your documents and add them to `00_current/`**
> Here's what this domain needs:
>
- **Lab results** — PDF or text export from MyChart, Quest Diagnostics, LabCorp, or your doctor's portal. Save to `00_current/`.
- **Medication list** — for each prescription: name, dosage, frequency, refill due date, prescribing provider. A text file is fine.
- **Preventive care history** — dates of last physical, dental cleaning, eye exam, and any screenings (mammogram, colonoscopy, etc.).
- **Insurance card** — plan name, member ID, group number, individual deductible, OOP max, primary care copay.
- **Provider contacts** — primary care doctor name, phone, and portal URL. Same for any specialists you see regularly.
- **Wearable data (optional)** — Apple Health export, Oura CSV, or Garmin summary if you track sleep, HRV, or activity.
>
> **Step 3 — Run your first skill**
> Once config.md is filled in and at least a few documents are in `00_current/`, try: *"health brief"*
>
> You don't need everything perfect to start — add what you have and the skills will tell you what's still missing.
>
> **Stop here.** Do not scaffold files, do not offer options, do not ask questions. Wait for the user to complete setup and re-run the skill.

## Skill Index

Skills live in `skills/<skill-name>/SKILL.md`. To run a skill, read its `SKILL.md` and follow the instructions inside.

- **`apple-health`** — Exports iPhone Health data — steps, active energy, resting heart rate, body weight, and workouts — via an iOS Shortcut that saves a CSV or XML export to iCloud Drive for automatic Mac sync.
- **`health-flow-build-lab-summary`** — Builds a structured lab result summary with current biomarker values, reference ranges, trend direction vs.
- **`health-flow-build-wellness-summary`** — Compiles a monthly wearable wellness summary covering sleep score, sleep duration, HRV (RMSSD), resting heart rate, readiness score, daily steps, and active energy.
- **`health-flow-check-refill-dates`** — Scans the active medication list in vault/health/00_current/ and computes the projected refill date for each prescription based on fill date and days supply.
- **`health-flow-sync-wearable-data`** — Ingests new wearable device exports from Oura Ring (JSON) or Apple Health (XML/CSV) and appends new daily records to vault/health/00_current/ without overwriting existing data.
- **`health-op-anomaly-watch`** — Weekly wearable anomaly watch.
- **`health-op-lab-review`** — Triggered when new lab results arrive from a patient portal (MyChart/Epic) or are uploaded manually.
- **`health-op-medication-review`** — Monthly medication review.
- **`health-op-monthly-sync`** — Full health data sync on the 1st of each month.
- **`health-op-preventive-care-review`** — Quarterly preventive care check.
- **`health-op-review-brief`** — Monthly health review brief.
- **`health-task-flag-out-of-range-value`** — Writes a structured flag to vault/health/open-loops.md when a lab biomarker falls outside its clinical reference range.
- **`health-task-flag-preventive-care-gap`** — Writes a flag to vault/health/open-loops.md for any overdue or due-soon preventive care screening.
- **`health-task-flag-upcoming-refill`** — Writes a medication refill reminder to vault/health/open-loops.md when a prescription is due within 30 days.
- **`health-task-update-open-loops`** — The single write point for vault/health/open-loops.md.
- **`mychart`** — Accesses patient portal records — lab results (PDF and structured values), visit notes, after-visit summaries, upcoming appointments, current medication list, and immunization records — from a provider's MyChart instance via Playwright with Chrome cookie authentication.
- **`oura-ring`** — Fetches daily sleep, readiness, and activity data from the Oura Ring API v2 using a personal API key.
