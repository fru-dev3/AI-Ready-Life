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

## Install

Three steps in order: pick the AI tool, add the plugin, drop in your vault.

### 1. Pick your AI tool

Works with both. Pick whichever you already use.

- **Claude Code** ([install](https://docs.anthropic.com/en/docs/claude-code)) — easiest if you're new
- **Codex CLI** ([install](https://github.com/openai/codex)) — needs version 0.125 or later (`brew upgrade --cask codex`)

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
