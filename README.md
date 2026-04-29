# AI Ready Life

**AI Ready Life is a set of personal AI agents — one per area of your life — that read your real documents and run on your machine.**

Adult life has roughly a dozen moving parts: your health, your money, your taxes, your career, your calendar, your insurance, your goals, your home, the trips you take, what you're learning, the documents you have to keep track of, and the people you care about. Most people manage these in twelve different apps, on fifty receipts, in a hundred unread emails, and in their head.

AI Ready Life replaces that scatter with twelve focused agents. Each one is a self-contained plugin you install into Claude Code or Codex CLI. Each one reads its own folder on your disk — the *vault* — and answers questions, surfaces what's slipping, and produces briefs on demand.

You don't manage the agents. You manage your life. The agents do the bookkeeping.

| Plugin | What it does |
|---|---|
| [`health`](https://frudev.gumroad.com/l/aireadylife-health) | Labs, medications, preventive care, wearables |
| [`wealth`](https://frudev.gumroad.com/l/aireadylife-wealth) | Net worth, investments, debt, cash flow |
| [`tax`](https://frudev.gumroad.com/l/aireadylife-tax) | Deadlines, estimates, deductions, year-end planning, CPA packet |
| [`career`](https://frudev.gumroad.com/l/aireadylife-career) | Compensation, market data, job search, skills |
| [`calendar`](https://frudev.gumroad.com/l/aireadylife-calendar) | Deadlines, focus time, agenda |
| [`insurance`](https://frudev.gumroad.com/l/aireadylife-insurance) | Policies, claims, renewals, coverage gaps |
| [`vision`](https://frudev.gumroad.com/l/aireadylife-vision) | Goals, OKRs, quarterly planning, scorecard |
| [`explore`](https://frudev.gumroad.com/l/aireadylife-explore) | Travel, trips, documents, wishlist |
| [`home`](https://frudev.gumroad.com/l/aireadylife-home) | Maintenance, expenses, seasonal tasks |
| [`learning`](https://frudev.gumroad.com/l/aireadylife-learning) | Courses, books, goals, progress |
| [`records`](https://frudev.gumroad.com/l/aireadylife-records) | Identity documents, legal, subscriptions |
| [`social`](https://frudev.gumroad.com/l/aireadylife-social) | Contacts, relationships, birthdays, outreach |

More domains (benefits, brand, business, content, real estate, intel) are in development and will be added as they're tested.

Built by [fru.dev](https://fru.dev) · Site: [aireadyu.dev](https://aireadyu.dev) · See [ABOUT.md](ABOUT.md) for the full philosophy.

---

## How it feels in practice

Once installed, you talk to each domain like you'd talk to a specialist who already knows your situation:

```
> Give me a health brief
> What's my net worth this month?
> Am I on track with my taxes?
> Review my career pipeline
> What conflicts are on my calendar next week?
> Is my umbrella coverage still right after we closed on the house?
```

The agent doesn't make anything up. It opens the right vault folder, reads what's actually there (your statements, your appointments, your documents), runs its review routines, writes a brief, and flags anything missing or off in `open-loops.md`. If your May 401(k) statement isn't in the vault, it tells you that — it doesn't guess the balance.

That's the entire loop. Vault in, brief out, gaps logged.

---

## The twelve agents in detail

Each agent ships with somewhere between 20 and 30 skills covering the full lifecycle of its domain. Below is what each one actually does day-to-day. Numbers in parentheses are the current skill count per plugin.

### [`health`](https://frudev.gumroad.com/l/aireadylife-health) — your medical operations center (30 skills)

Tracks lab results, medications, allergies, vaccinations, providers, and family medical history. Reads pay-stub HSA contributions and EOBs to reconcile what your insurance actually paid. Pulls daily metrics from Apple Health and Oura. Prepares a brief before any doctor's appointment summarizing what's changed since last visit and what you wanted to ask. Flags refills coming due, missed preventive care (colonoscopy, mammogram, annual physical) by age, and >20-point trend changes in resting heart rate or sleep. Produces an emergency medical info card you can print and keep in your wallet. Logs symptoms over time so you can see whether that thing has been going on for two weeks or two months.

### [`wealth`](https://frudev.gumroad.com/l/aireadylife-wealth) — your CFO (29 skills)

Builds a categorized net-worth statement every month with per-account month-over-month deltas. Tracks income and expense by category against budget. Calculates emergency-fund runway from your liquid balances and trailing burn. Benchmarks each investment account against an appropriate index (S&P 500, total bond, target-date) and flags underperformers. Detects allocation drift from your target and suggests rebalancing trades. Flags single positions over 10% of the portfolio (5% for employer stock). Projects retirement readiness deterministically and offers three remedies if you're behind. Scans for cash drag (low-yield savings), mortgage refinance opportunities, and credit-card balance-transfer arbitrage with quantified annual savings. Runs an annual estate-plan freshness check (will, beneficiaries, healthcare directive, POAs).

### [`tax`](https://frudev.gumroad.com/l/aireadylife-tax) — your year-round tax desk (27 skills)

Tracks every federal and state filing deadline, with safe-harbor quarterly estimates calculated from prior-year liability. Logs deductible expenses and charitable giving as they happen instead of in a frantic March. Watches 1099 issuers for missing forms. Flags retirement-contribution limits as you approach them, and home-office deductions if you qualify. Prepares a year-end packet for your CPA — every W-2, 1099, 1098, K-1, summary statement, and supporting document indexed and ready. Optional advanced flows handle equity-comp tax events (RSU vest, ESPP, NSO/ISO exercise), tax-loss harvesting scans, multi-state residency tracking, and rental-property summaries.

### [`career`](https://frudev.gumroad.com/l/aireadylife-career) — your career operator (30 skills)

Captures wins as they happen so you have ammunition at performance-review time. Parses pay stubs to track compensation and exports the data to wealth. Watches the market for relevant openings, salary bands, and emerging skills in your function. Logs every recruiter conversation with the role, comp range, and next step. Builds an interview-prep brief tailored to a specific company. Prepares a negotiation packet with comparables and a walk-away number. Maintains a current reference list. Tracks license and certification renewals so you don't lose your stripes to a missed deadline. Optional promotion-campaign skill tracks the case-building over months.

### [`calendar`](https://frudev.gumroad.com/l/aireadylife-calendar) — your time architect (25 skills)

Scans for conflicts (overlapping meetings, double-booked focus blocks). Audits recurring meetings quarterly — what's still earning its place on the calendar, what isn't. Adds prep time before high-stakes meetings and travel buffers around flights. Auto-recovers a block after long travel. Imports birthdays from social so they actually show up. Tracks PTO and OOO. Reviews where your time actually went each quarter against where you said it would go (vision agent feeds the targets). Suggests recurring blocks to protect (deep-work, exercise, family) and flags when something is eating them.

### [`insurance`](https://frudev.gumroad.com/l/aireadylife-insurance) — your coverage analyst (23 skills)

Indexes every policy you own — auto, home/renters, health, dental, vision, life, disability, umbrella. Flags renewals 60 days out with apples-to-apples re-quote prompts. Watches deductible progress through the year so you know whether to schedule that procedure now or wait. Triggers a coverage review on every life event (marriage, baby, home purchase, job change). Walks you through open enrollment with a decision matrix. Audits beneficiaries against current life status. Optional advanced flows handle Medicare planning, long-term care evaluation, and umbrella-policy sizing.

### [`vision`](https://frudev.gumroad.com/l/aireadylife-vision) — your strategic planner (20 skills)

Holds your life vision, values, and 10-year picture in one place — the things you actually want, written down. Sets quarterly goals and OKRs from the vision and reviews them at quarter-end. Runs a decision-alignment check when you're considering something big ("does this job offer move me toward the picture or away?"). Builds an annual year-in-review pulling from every other domain. Tracks identity-level milestones (becoming a parent, leaving a career, moving cities) without losing the throughline.

### [`home`](https://frudev.gumroad.com/l/aireadylife-home) — your house manager (26 skills)

Builds a recurring maintenance calendar (HVAC filters, gutters, water heater flush, smoke detectors). Logs a home inventory for insurance purposes. Tracks utility usage to catch anomalies. Plans meals and groceries against your actual schedule. Audits the home-office setup. Runs an annual emergency-prep review (go-bag, water, batteries, evac plan). For renters, watches lease renewal. For owners, tracks mortgage paydown, property tax, HOA dues, and home-improvement projects with cost basis. Has a move-planning op for the move you're not even sure you're doing yet.

### [`explore`](https://frudev.gumroad.com/l/aireadylife-explore) — your travel desk (24 skills)

Logs every outing and trip you take so the rhythm of your life shows up. Maintains a wishlist (places, experiences, restaurants) so the next free weekend isn't spent scrolling. Tracks your travel budget and loyalty status across airlines, hotels, and rental cars. Builds a packing checklist tuned to the trip. Checks entry requirements (visa, vaccination, passport-validity-six-months) for international trips and flags expiring documents. Coordinates plans with co-travelers. Reflects on each trip after — what worked, what didn't — so the next one is better.

### [`learning`](https://frudev.gumroad.com/l/aireadylife-learning) — your knowledge desk (21 skills)

Sets a monthly theme so your reading and courses ladder to something. Tracks books, courses, podcasts, and articles you actually finished — not the ones in the wishlist. Logs applied output: what you actually built or shipped from what you learned (the only metric that matters). Watches your learning budget against an annual cap. Captures notes and links them to the domain they help (a tax book strengthens the tax agent; a leadership book feeds career). Optional language-learning progress tracker and mentor/mentee log.

### [`records`](https://frudev.gumroad.com/l/aireadylife-records) — your document vault (22 skills)

Indexes every important document you own — passport, driver's license, social security card, birth certificate, marriage license, property deeds, vehicle titles, professional licenses. Tracks every subscription you pay for, what it costs annually, and whether you actually use it. Maintains an account inventory (every login that matters). Builds a renewal calendar so the passport doesn't expire two weeks before the trip. Ingests new documents from Gmail attachments and Google Drive into the right folder automatically.

### [`social`](https://frudev.gumroad.com/l/aireadylife-social) — your relationship manager (21 skills)

Sorts your people by closeness — close circle, family, broader network, local community — and watches the cadence on each. Flags unanswered messages from your close circle. Detects reciprocity gaps (you've initiated the last six conversations with someone). Reminds you of birthdays and special occasions and helps you plan the gift. Logs new people you meet and introductions you've made. Sets a weekly outreach goal and tracks against it. Pulls signals from Gmail and Calendar to keep the picture honest without being creepy.

---

## Install

Three steps in order: pick the AI tool, add the plugin, drop in your vault.

### 1. Pick your AI tool

Works with both. Pick whichever you already use.

- **Claude Code** ([install](https://docs.anthropic.com/en/docs/claude-code)) — easiest if you're new
- **Codex CLI** ([install](https://github.com/openai/codex)) — needs version 0.125 or later (`brew upgrade --cask codex`)
- **Paperclip** ([install](https://paperclip.ing)) — turns each domain into a 24/7 agent on your machine. See the Paperclip section below.

### 2. Add the plugin

#### Claude Code

```bash
/plugin marketplace add fru-dev3/AI-Ready-Life
/plugin install health@ai-ready-life
```

Repeat the second command for each domain you want (`wealth`, `tax`, etc.). Or install everything at once with `/plugin install ai-ready-life`.

#### Codex CLI

```bash
codex plugin marketplace add fru-dev3/AI-Ready-Life
codex                # opens an interactive session
/plugins             # browse the marketplace, pick a domain, hit Install
```

In both tools, slash commands appear automatically: `/health:op-preventive-care-review`, `/wealth:op-monthly-sync`, `/tax:op-deadline-watch`, and so on. You usually won't type those — you'll just say "give me a health brief" and the right one runs.

### 3. Drop in your vault

Each plugin reads from a vault folder on your machine. Vault templates are sold separately on Gumroad — they include a blank `config.md`, the folder structure, and a quickstart guide.

After purchase, unzip and place the folder at:

| OS | Path |
|---|---|
| Mac | `~/Documents/aireadylife/vault/{domain}/` |
| Windows | `%USERPROFILE%\Documents\aireadylife\vault\{domain}\` |

Then open `config.md` and fill in your details. That's the only setup.

---

## Install in Paperclip (1-click)

Paperclip turns each domain plugin into a persistent agent that runs on your machine, reads from your vault, and produces briefs on a schedule (or on demand). The whole AI Ready Life marketplace installs as a single Paperclip company in one HTTP call.

**Prerequisites**

- Paperclip is installed and running locally: `npx paperclipai dashboard`
- The Paperclip API is reachable at `http://127.0.0.1:3100`
- You have a gateway auth token at `~/.openclaw/openclaw.json` (created by the Paperclip install)

**Preview before installing** (optional, recommended for the first run):

```bash
TOKEN=$(jq -r .gateway.auth.token ~/.openclaw/openclaw.json)

curl -X POST http://127.0.0.1:3100/api/companies/imports/preview \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "source": {"type":"github","url":"https://github.com/fru-dev3/AI-Ready-Life"},
    "target": {"mode":"new_company","newCompanyName":"AI Ready Life"}
  }' | jq '{agents: (.manifest.agents|length), skills: (.manifest.skills|length), warnings}'
```

You should see `{"agents": 12, "skills": 298, "warnings": []}`.

**Install** (creates the company):

```bash
curl -X POST http://127.0.0.1:3100/api/companies/imports/apply \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "source": {"type":"github","url":"https://github.com/fru-dev3/AI-Ready-Life"},
    "target": {"mode":"new_company","newCompanyName":"AI Ready Life"}
  }'
```

Open the Paperclip dashboard. You'll see a new **AI Ready Life** company with twelve director agents (Health, Wealth, Tax, Career, Calendar, Insurance, Vision, Explore, Home, Learning, Records, Social) and 298 skills attached. Each agent's `instructionsFilePath` points at its `<domain>/agents/<domain>-agent.md`, so the agent inherits the same domain knowledge as the Claude Code / Codex CLI versions.

**Defaults** — heartbeat is **off** by default. Agents wake on demand only. You can flip individual agents to scheduled runs from the Paperclip dashboard if you want monthly briefs to fire automatically.

**Update to a newer version** — re-run the same `imports/apply` call against your existing company:

```bash
"target": {"mode":"existing_company","companyId":"<your-company-id>"},
"collisionStrategy": "rename"
```

**Add into your existing personal Paperclip company** instead of creating a new one — same as above with the company ID of your choice.

---

## How it works under the hood

Every plugin has two pieces:

**The vault** — your data, on your disk.

```
~/Documents/aireadylife/vault/
├── health/
│   ├── config.md       ← your profile and settings
│   ├── open-loops.md   ← active flags and open items
│   ├── 00_current/     ← active documents
│   ├── 01_prior/       ← historical records
│   └── 02_briefs/      ← generated reports
├── wealth/
├── tax/
└── ...
```

**The plugin** — agents and skills, installed in your AI tool.

When you ask "give me a health brief," the health plugin reads `vault/health/`, runs its review skill, and writes a brief into `02_briefs/`. Same shape for every domain. The same convention — `config.md`, `00_current/`, `01_prior/`, `02_briefs/`, `open-loops.md` — repeats in every plugin, so once you learn one you've learned them all.

You own the vault. You can read, edit, back up, and version-control it like any other folder. Move it between machines, sync it through iCloud, store it on an encrypted drive — whatever you'd do with your own files. The plugin just reads what's there.

---

## Privacy

- All vault data lives in `~/Documents/aireadylife/` on your machine.
- Plugins don't phone home and don't include analytics.
- Your AI tool (Claude Code or Codex) processes the data — same privacy posture as anything else you put in their context.
- No accounts, logins, or licenses tied to the plugin itself.

---

## Disclaimer

AI Ready Life is **organizational software**. It helps you keep track of your own information and produces briefs from it. **It is not professional advice.**

Specifically:

- The **health** plugin is not medical advice, diagnosis, or treatment. Talk to your doctor before changing medications, treatment plans, vaccinations, or anything else medical.
- The **tax** plugin is not tax advice. Talk to a CPA or enrolled agent before filing or making decisions with tax consequences.
- The **wealth** and **insurance** plugins are not financial, investment, or insurance advice. Talk to a fiduciary advisor or licensed broker.
- The **records**, **estate-related** flows in **wealth**, and similar features are not legal advice. Talk to an attorney for anything binding.

The agents read what you put in the vault and produce briefs based on the rules in their skills. They can be wrong. They will be wrong eventually. **Always verify anything important against a primary source — your statement, your provider, the IRS, your attorney — before acting on it.**

By using AI Ready Life you accept that you are the responsible party for any decision you make from its output.

---

## Troubleshooting

**Slash commands don't appear after install.** Restart Claude Code or Codex. New skills register on session start.

**Plugin can't find my vault.** Check that the folder exists at the path in the table above and that `config.md` is filled in. Path is case-sensitive on Linux.

**Mac: "operation not permitted" when reading the vault.** Open System Settings → Privacy & Security → Full Disk Access and add Claude (or your terminal app for Codex). Restart the app.

**Codex says the plugin marketplace command doesn't exist.** Update Codex: `brew upgrade --cask codex`. Plugin support landed in 0.125.

**I want to update.** `/plugin marketplace upgrade ai-ready-life` in Claude, or `codex plugin marketplace upgrade ai-ready-life` in Codex.

---

## Links

- Site: [aireadyu.dev](https://aireadyu.dev)
- Built by: [fru.dev](https://fru.dev)
- YouTube: [@frudev](https://youtube.com/@frudev)
